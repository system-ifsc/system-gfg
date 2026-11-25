(() => {
  const form = document.getElementById('formularioChat');
  if (!form) return;
  const input = document.getElementById('mensagemChat');
  const log = document.getElementById('mensagensChat');
  const status = document.getElementById('retornoChat');
  const connection = document.getElementById('estadoConexao');
  const typing = document.getElementById('digitandoChat');
  const reset = document.getElementById('novaConversa');
  const send = form.querySelector('button');
  let messages = [];
  let busy = false;

  function append(role, text) {
    const article = document.createElement('article');
    article.className = `mensagem mensagem-${role === 'user' ? 'usuario' : 'assistente'}`;
    const content = document.createElement('div');
    content.className = 'conteudo-mensagem';
    const name = document.createElement('span');
    name.className = 'nome-mensagem';
    name.textContent = role === 'user' ? 'Você' : 'System GFG AI';
    const bubble = document.createElement('div');
    bubble.className = 'balao-mensagem';
    bubble.textContent = text;
    const time = document.createElement('time');
    time.dateTime = new Date().toISOString();
    time.textContent = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    content.append(name, bubble, time);
    article.append(content);
    log.append(article);
    log.scrollTop = log.scrollHeight;
    return article;
  }
  function welcome() {
    append('assistant', 'Olá! Sou a System GFG AI. Posso explicar as modalidades, ajudar você a se preparar para a primeira aula e conversar sobre suas dúvidas. O que você gostaria de saber?');
  }
  async function checkConnection() {
    try {
      if (location.protocol === 'file:') throw new Error();
      const response = await fetch('/api/health', { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error();
      const data = await response.json();
      connection.textContent = data.configured ? 'Assistente disponível para conexão' : 'IA aguardando configuração';
      if (!data.configured) {
        status.textContent = 'O responsável deve configurar GEMINI_API_KEY no servidor para ativar as respostas.';
        status.hidden = false;
      }
    } catch {
      connection.textContent = 'Servidor indisponível';
      status.textContent = 'Abra o projeto pelo servidor Node (npm start), em http://localhost:3000. Abrir o HTML diretamente não conecta a IA.';
      status.hidden = false;
    }
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text || busy) return;
    if (text.length > 2000) return;
    busy = true;
    send.disabled = true;
    reset.disabled = true;
    input.disabled = true;
    status.hidden = true;
    typing.hidden = false;
    form.setAttribute('aria-busy', 'true');
    const userNode = append('user', text);
    input.value = '';
    const pending = [...messages.slice(-18).map(message => ({ ...message, content: message.content.slice(0, 6000) })), { role: 'user', content: text }];
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: pending }), signal: AbortSignal.timeout(50000) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Não foi possível enviar a pergunta.');
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('A IA não retornou uma resposta. Tente novamente.');
      append('assistant', data.answer);
      messages = [...pending, { role: 'assistant', content: data.answer }];
      connection.textContent = 'IA conectada';
    } catch (error) {
      connection.textContent = 'Não foi possível obter uma resposta';
      userNode.remove();
      input.value = text;
      status.textContent = error.name === 'TimeoutError' ? 'A resposta demorou demais. Sua pergunta foi mantida para tentar novamente.' : error instanceof TypeError || error instanceof SyntaxError ? 'Não foi possível conectar à IA. Verifique se o servidor está ativo e tente novamente.' : error.message;
      status.hidden = false;
    } finally {
      busy = false;
      send.disabled = false;
      reset.disabled = false;
      input.disabled = false;
      typing.hidden = true;
      form.removeAttribute('aria-busy');
      input.focus();
    }
  });
  document.querySelectorAll('[data-pergunta]').forEach(button => button.addEventListener('click', () => {
    if (busy) return;
    input.value = button.dataset.pergunta;
    form.requestSubmit();
  }));
  reset.addEventListener('click', () => {
    if (busy) return;
    messages = [];
    log.replaceChildren();
    status.hidden = true;
    input.value = '';
    welcome();
    input.focus();
  });
  welcome();
  try {
    const pergunta = sessionStorage.getItem('gfg-pergunta-inicial');
    if (pergunta) {
      input.value = pergunta.slice(0, 2000);
      sessionStorage.removeItem('gfg-pergunta-inicial');
    }
  } catch {
    // O chat funciona também sem armazenamento local.
  }
  checkConnection();
})();
