(() => {
  const CHAVES_DADOS_ANTIGOS = [
    "gfg-demo-perfis-v1",
    "gfg-demo-session-v1",
    "gfg-demo-bookings-v1",
    "gfg-theme",
  ];

  const HORARIOS = {
    "jiu-jitsu": {
      nomeModalidade: "Jiu-Jitsu",
      horarios: [
        { dia: 1, nomeDia: "Segunda-feira", horario: "19:00" },
        { dia: 3, nomeDia: "Quarta-feira", horario: "19:00" },
        { dia: 5, nomeDia: "Sexta-feira", horario: "19:00" },
        { dia: 6, nomeDia: "Sábado", horario: "10:00" },
      ],
    },
    boxe: {
      nomeModalidade: "Boxe",
      horarios: [
        { dia: 2, nomeDia: "Terça-feira", horario: "17:00" },
        { dia: 4, nomeDia: "Quinta-feira", horario: "17:00" },
        { dia: 1, nomeDia: "Segunda-feira", horario: "18:30" },
        { dia: 3, nomeDia: "Quarta-feira", horario: "18:30" },
      ],
    },
    "muay-thai": {
      nomeModalidade: "Muay Thai",
      horarios: [
        { dia: 2, nomeDia: "Terça-feira", horario: "18:15" },
        { dia: 4, nomeDia: "Quinta-feira", horario: "18:15" },
        { dia: 1, nomeDia: "Segunda-feira", horario: "20:00" },
        { dia: 3, nomeDia: "Quarta-feira", horario: "20:00" },
      ],
    },
  };

  let modalidadePendente = "";
  let focoRetorno = null;

  const buscarPorId = (id) => document.getElementById(id);

  const limparDadosAntigos = () => {
    try {
      CHAVES_DADOS_ANTIGOS.forEach((chave) => localStorage.removeItem(chave));
    } catch (erro) {
      exibirAviso(`Não foi possível remover os dados locais antigos: ${erro.message}`, true);
    }
  };

  const exibirAviso = (mensagem, ehErro = false) => {
    let aviso = buscarPorId("avisoAplicativo");
    if (!aviso) {
      aviso = document.createElement("div");
      aviso.id = "avisoAplicativo";
      aviso.className = "aviso-aplicativo-global";
      aviso.setAttribute("role", "status");
      aviso.setAttribute("aria-live", "polite");
      document.body.append(aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.toggle("esta-com-erro", ehErro);
    aviso.hidden = false;
  };

  const definirTema = (tema) => {
    const temaSelecionado = tema === "vermelho" || tema === "red" ? "vermelho" : "cinza";
    document.documentElement.dataset.tema = temaSelecionado;

    const folhaAlternativa = buscarPorId("folhaEstiloTemaVermelho");
    if (folhaAlternativa) folhaAlternativa.disabled = temaSelecionado !== "vermelho";

    document.querySelectorAll("img[data-cinza-src][data-vermelho-src]").forEach((imagem) => {
      imagem.src = temaSelecionado === "vermelho" ? imagem.dataset.vermelhoSrc : imagem.dataset.cinzaSrc;
    });

    document.querySelectorAll(".opcao-tema").forEach((botao) => {
      const ativo = botao.dataset.opcaoTema === temaSelecionado;
      botao.classList.toggle("esta-ativo", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    });
  };

  const configurarSeletorTema = () => {
    definirTema("cinza");

    document.querySelectorAll(".opcao-tema").forEach((botao) => {
      botao.addEventListener("click", () => {
        const selecionado = botao.dataset.opcaoTema;
        if (selecionado !== "vermelho" && selecionado !== "cinza") return;
        definirTema(selecionado);
      });
    });
  };

  const configurarMenuCelular = () => {
    const botao = buscarPorId("botaoMenu");
    const menu = buscarPorId("menuCelular");
    if (!botao || !menu) return;

    const fecharMenu = () => {
      botao.classList.remove("aberto");
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
      botao.setAttribute("aria-label", "Abrir menu");
    };

    botao.addEventListener("click", () => {
      const estaAberto = botao.getAttribute("aria-expanded") !== "true";
      botao.classList.toggle("aberto", estaAberto);
      menu.classList.toggle("aberto", estaAberto);
      botao.setAttribute("aria-expanded", String(estaAberto));
      botao.setAttribute("aria-label", estaAberto ? "Fechar menu" : "Abrir menu");
    });

    menu.querySelectorAll(".ligacao-celular").forEach((link) => link.addEventListener("click", fecharMenu));
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") fecharMenu();
    });
  };

  const montarAplicativo = () => {
    const cartao = document.querySelector("#telaAcesso .cartao-acesso");
    if (!cartao) return;
    const titulo = cartao.querySelector("#tituloAcesso");
    const descricao = cartao.querySelector("#subtituloAcesso");
    const tela = buscarPorId("telaAcesso");
    const abas = cartao.querySelector(".abas-acesso");
    const formularioOriginal = cartao.querySelector(".formulario-acesso");
    const campoNome = cartao.querySelector(".campo-nome");
    const opcoes = cartao.querySelector(".opcoes-acesso");
    const campoEmail = cartao.querySelector('input[type="email"]');
    const campoSenha = cartao.querySelector('input[type="password"]');
    const botaoSenha = cartao.querySelector(".alternar-senha");
    const botaoFechar = cartao.querySelector(".botao-fechar-acesso");
    const conteudo = document.createElement("div");
    conteudo.className = "conteudo-aplicativo";
    conteudo.id = "conteudoAplicativo";
    conteudo.hidden = true;

    const formulario = document.createElement("form");
    formulario.className = formularioOriginal.className;
    formulario.noValidate = true;
    formulario.autocomplete = "off";
    formularioOriginal.replaceWith(formulario);
    formulario.append(...formularioOriginal.childNodes);

    const retorno = document.createElement("p");
    retorno.className = "retorno-aplicativo";
    retorno.id = "retornoAplicativo";
    retorno.setAttribute("role", "status");
    retorno.setAttribute("aria-live", "polite");
    retorno.hidden = true;

    const aviso = cartao.querySelector(".aviso-aplicativo") || document.createElement("p");
    aviso.className = "aviso-aplicativo";
    aviso.textContent = "Demonstração visual. Nenhum dado de acesso ou cadastro é enviado ou salvo.";

    const cabecalho = cartao.querySelector(".cabecalho-acesso");
    if (!aviso.isConnected) cabecalho.after(retorno, abas, formulario, conteudo, aviso);
    else cabecalho.after(retorno, abas, formulario, conteudo);
    cartao.setAttribute("aria-labelledby", titulo.id);

    const campoEmailInput = campoEmail;
    campoEmailInput.removeAttribute("name");
    campoEmailInput.required = false;
    campoEmailInput.autocomplete = "off";

    const campoNomeInput = campoNome.querySelector("input");
    campoNomeInput.removeAttribute("name");
    campoNomeInput.autocomplete = "off";

    campoSenha.removeAttribute("name");
    campoSenha.required = false;
    campoSenha.autocomplete = "off";

    const campoConfirmacao = campoSenha.closest(".campo-acesso").cloneNode(true);
    campoConfirmacao.querySelector("span:first-child").textContent = "Confirmar senha";
    const campoConfirmacaoInput = campoConfirmacao.querySelector("input");
    campoConfirmacaoInput.removeAttribute("id");
    campoConfirmacaoInput.removeAttribute("name");
    campoConfirmacaoInput.autocomplete = "off";
    campoConfirmacaoInput.required = false;
    campoConfirmacaoInput.setAttribute("aria-label", "Confirmar senha");
    campoConfirmacao.querySelector(".alternar-senha")?.remove();
    campoConfirmacao.hidden = true;
    campoSenha.closest(".campo-acesso").after(campoConfirmacao);

    const botaoEnviar = formulario.querySelector(".botao-enviar-acesso");
    botaoEnviar.type = "submit";
    const abaEntrar = abas.querySelector("#abaEntrar");
    const abaCadastro = abas.querySelector("#abaCadastro");
    const definirFeedback = (mensagem, ehErro = false) => {
      retorno.textContent = mensagem;
      retorno.classList.toggle("esta-com-erro", ehErro);
      retorno.hidden = !mensagem;
    };

    const definirTitulo = (cabecalho, subcabecalho) => {
      titulo.textContent = cabecalho;
      descricao.textContent = subcabecalho;
    };

    const renderizarFormularioAcesso = (modo) => {
      const ehCadastro = modo === "cadastrar";
      tela.classList.remove("modo-agendamento");
      formulario.hidden = false;
      abas.hidden = false;
      conteudo.hidden = true;
      aviso.hidden = false;
      campoNome.hidden = !ehCadastro;
      campoNomeInput.required = ehCadastro;
      campoNomeInput.disabled = !ehCadastro;
      campoConfirmacao.hidden = !ehCadastro;
      campoConfirmacaoInput.disabled = !ehCadastro;
      campoConfirmacaoInput.value = "";
      campoSenha.value = "";
      campoSenha.autocomplete = "off";
      opcoes.hidden = ehCadastro;
      botaoEnviar.textContent = ehCadastro ? "CRIAR CONTA" : "ENTRAR";
      abaEntrar.classList.toggle("esta-ativo", !ehCadastro);
      abaEntrar.setAttribute("aria-selected", String(!ehCadastro));
      abaCadastro.classList.toggle("esta-ativo", ehCadastro);
      abaCadastro.setAttribute("aria-selected", String(ehCadastro));
      definirTitulo(ehCadastro ? "Criar conta" : "Bem-vindo de volta", ehCadastro
        ? "Preencha os campos para visualizar o cadastro."
        : "Preencha os campos para visualizar o acesso.");
      definirFeedback("");
    };

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      campoEmailInput.value = "";
      campoNomeInput.value = "";
      campoSenha.value = "";
      campoConfirmacaoInput.value = "";
      renderizarAgendamento();
    });

    abaEntrar.addEventListener("click", () => renderizarFormularioAcesso("entrar"));
    abaCadastro.addEventListener("click", () => renderizarFormularioAcesso("cadastrar"));
    botaoSenha.addEventListener("click", () => {
      const mostrandoSenha = campoSenha.type === "text";
      campoSenha.type = mostrandoSenha ? "password" : "text";
      botaoSenha.textContent = mostrandoSenha ? "Mostrar" : "Ocultar";
      botaoSenha.setAttribute("aria-pressed", String(!mostrandoSenha));
    });
    cartao.querySelector(".recuperar-senha").addEventListener("click", () => {
      definirFeedback("Esta tela é apenas visual. A recuperação de senha não está disponível.");
    });
    botaoFechar.addEventListener("click", (evento) => {
      evento.preventDefault();
      fechar();
    });

    const renderizarAgendamento = () => {
      abas.hidden = true;
      formulario.hidden = true;
      conteudo.hidden = false;
      aviso.hidden = true;
      tela.classList.add("modo-agendamento");
      definirTitulo("Agendar aula", "Escolha uma modalidade, uma data e um horário disponível.");
      definirFeedback("");
      conteudo.innerHTML = `
        <div class="pagina-agendamento">
          <header class="barra-agendamento">
            <a class="marca-agendamento" href="#" data-acao="fechar" aria-label="Voltar ao site System GFG">
              <img class="simbolo-marca-agendamento" src="imagens/logo.png" data-cinza-src="imagens/logo.png" data-vermelho-src="imagens/gfg%20vermelho.png" alt="">
              <span class="texto-marca-agendamento">System <strong>GFG</strong></span>
            </a>
            <nav class="navegacao-agendamento" aria-label="Navegação principal">
              <span class="navegacao-agendamento-ativa" aria-current="page">Agendamentos</span>
            </nav>
            <div class="acoes-agendamento">
              <div class="seletor-tema seletor-tema-agendamento" aria-label="Escolha de cor">
                <button class="opcao-tema opcao-tema-vermelho" type="button" data-opcao-tema="vermelho" aria-label="Usar tema vermelho" aria-pressed="false"><span aria-hidden="true"></span>Vermelho</button>
                <button class="opcao-tema opcao-tema-cinza" type="button" data-opcao-tema="cinza" aria-label="Usar tema cinza" aria-pressed="false"><span aria-hidden="true"></span>Cinza</button>
              </div>
              <button class="botao-area-aluno" type="button" data-acao="aulas" aria-label="Ver minhas aulas">Minhas aulas <span aria-hidden="true">&rarr;</span></button>
            </div>
          </header>
          <section class="conteudo-agendamento">
            <section class="apresentacao-agendamento" aria-labelledby="tituloApresentacaoAgendamento">
              <p class="sobretitulo-agendamento"><span></span>SUA PRÓXIMA EVOLUÇÃO COMEÇA AQUI</p>
              <h1 id="tituloApresentacaoAgendamento">ENTRE NO <em>COMBATE.</em></h1>
              <p class="descricao-agendamento">Escolha sua modalidade, encontre o melhor horário e reserve seu treino em poucos passos.</p>
              <figure class="imagem-agendamento">
                <img src="imagens/Muay%20Thai.jpg" alt="Treino de Muay Thai">
                <figcaption>TREINE FORTE. EVOLUA SEMPRE.</figcaption>
              </figure>
            </section>
            <section class="painel-reserva" aria-labelledby="tituloReserva">
              <header class="cabecalho-reserva">
                <div><p>AGENDAMENTO RÁPIDO</p><h2 id="tituloReserva">RESERVE SEU TREINO</h2></div>
                <span class="aviso-minutos"><span aria-hidden="true">◷</span> Leva menos de 1 minuto</span>
              </header>
              <form class="formulario-reserva" id="formularioAgendamento">
                <input name="modalidade" type="hidden">
                <input name="data" type="hidden">
                <input name="horario" type="hidden">
                <section class="etapa-reserva" aria-labelledby="tituloModalidadeReserva">
                  <h3 id="tituloModalidadeReserva"><span>01</span> ESCOLHA A MODALIDADE</h3>
                  <div class="opcoes-modalidade" role="group" aria-label="Modalidades disponíveis">
                    <button class="opcao-modalidade" type="button" data-modalidade="muay-thai" aria-pressed="false">
                      <span class="sigla-modalidade" aria-hidden="true">MT</span><strong>MUAY THAI</strong><small>◷ &nbsp;60 min</small>
                    </button>
                    <button class="opcao-modalidade" type="button" data-modalidade="jiu-jitsu" aria-pressed="false">
                      <span class="sigla-modalidade" aria-hidden="true">JJ</span><strong>JIU-JITSU</strong><small>◷ &nbsp;75 min</small>
                    </button>
                    <button class="opcao-modalidade" type="button" data-modalidade="boxe" aria-pressed="false">
                      <span class="sigla-modalidade" aria-hidden="true">BX</span><strong>BOXE</strong><small>◷ &nbsp;60 min</small>
                    </button>
                  </div>
                </section>
                <section class="etapa-reserva" aria-labelledby="tituloDiaReserva">
                  <div class="titulo-etapa-reserva"><h3 id="tituloDiaReserva"><span>02</span> SELECIONE O DIA</h3><small>PRÓXIMOS 7 DIAS</small></div>
                  <div class="opcoes-dia" id="opcoesDia" role="group" aria-label="Dias disponíveis"></div>
                </section>
                <section class="etapa-reserva etapa-horario-reserva" aria-labelledby="tituloHorarioReserva">
                  <div class="titulo-etapa-reserva"><h3 id="tituloHorarioReserva"><span>03</span> ESCOLHA O HORÁRIO</h3><small id="rotuloHorario">SELECIONE UM DIA</small></div>
                  <div class="opcoes-horario" id="opcoesHorario" role="group" aria-label="Horários disponíveis">
                    <p class="selecione-dia-reserva">Os horários aparecem depois de selecionar uma data.</p>
                  </div>
                </section>
                <p class="nota-agendamento">Horários demonstrativos. Nenhuma reserva é enviada ou salva.</p>
                <button class="botao-confirmar-agendamento" type="submit" disabled>
                  <span>CONFIRMAR AGENDAMENTO <small id="resumoAgendamento">Escolha o dia e o horário</small></span><span aria-hidden="true">&rarr;</span>
                </button>
              </form>
            </section>
          </section>
          <footer class="destaques-agendamento" aria-label="Diferenciais do centro">
            <div><strong>01</strong><span><b>AULA EXPERIMENTAL</b><small>Seu primeiro treino é por nossa conta</small></span></div>
            <div><strong>02</strong><span><b>EQUIPE ESPECIALIZADA</b><small>Professores e atletas experientes</small></span></div>
            <div><strong>03</strong><span><b>ESTRUTURA COMPLETA</b><small>Tatame, ringue e área funcional</small></span></div>
          </footer>
        </div>
      `;

      definirTema(document.documentElement.dataset.tema);
      conteudo.querySelectorAll(".opcao-tema").forEach((botao) => {
        botao.addEventListener("click", () => {
          const tema = botao.dataset.opcaoTema;
          if (tema !== "vermelho" && tema !== "cinza") return;
          definirTema(tema);
        });
      });

      const formularioAgendamento = buscarPorId("formularioAgendamento");
      const seletorModalidade = formularioAgendamento.elements.namedItem("modalidade");
      const campoData = formularioAgendamento.elements.data;
      const campoHorario = formularioAgendamento.elements.horario;
      const opcoesDia = buscarPorId("opcoesDia");
      const opcoesHorario = buscarPorId("opcoesHorario");
      const rotuloHorario = buscarPorId("rotuloHorario");
      const resumoAgendamento = buscarPorId("resumoAgendamento");
      const botaoConfirmar = formularioAgendamento.querySelector(".botao-confirmar-agendamento");
      const imagemAgendamento = conteudo.querySelector(".imagem-agendamento img");
      const imagensModalidade = {
        "muay-thai": { src: "imagens/Muay%20Thai.jpg", alt: "Treino de Muay Thai" },
        "jiu-jitsu": { src: "imagens/Jiu-Jitsu.jpg", alt: "Treino de Jiu-Jitsu" },
        boxe: { src: "imagens/Boxe.jpg", alt: "Treino de Boxe" },
      };
      seletorModalidade.value = HORARIOS[modalidadePendente] ? modalidadePendente : "muay-thai";
      imagemAgendamento.src = imagensModalidade[seletorModalidade.value].src;
      imagemAgendamento.alt = imagensModalidade[seletorModalidade.value].alt;

      const obterHorariosDisponiveis = (data) => {
        const dataSelecionada = new Date(`${data}T12:00:00`);
        return HORARIOS[seletorModalidade.value].horarios.filter((slot) => {
          if (slot.dia !== dataSelecionada.getDay()) return false;
          return data !== paraValorCampoData(new Date())
            || new Date(`${data}T${slot.horario}:00`) > new Date();
        });
      };

      const selecionarPrimeiroHorario = () => {
        campoData.value = "";
        campoHorario.value = "";
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        for (let deslocamento = 0; deslocamento <= 6; deslocamento += 1) {
          const data = new Date(hoje);
          data.setDate(hoje.getDate() + deslocamento);
          const valorData = paraValorCampoData(data);
          const primeiroHorario = obterHorariosDisponiveis(valorData)[0];
          if (!primeiroHorario) continue;
          campoData.value = valorData;
          campoHorario.value = primeiroHorario.horario;
          return;
        }
      };

      const atualizarResumo = () => {
        const modalidade = HORARIOS[seletorModalidade.value];
        const horario = campoHorario.value;
        const completo = Boolean(modalidade && campoData.value && horario);
        botaoConfirmar.disabled = !completo;
        resumoAgendamento.textContent = completo
          ? `${modalidade.nomeModalidade} · ${horario}`
          : "Escolha o dia e o horário";
      };

      const renderizarHorarios = () => {
        opcoesHorario.replaceChildren();
        const horarios = campoData.value ? obterHorariosDisponiveis(campoData.value) : [];
        rotuloHorario.textContent = "TODOS OS NÍVEIS";

        if (horarios.length === 0) {
          const vazio = document.createElement("p");
          vazio.className = "selecione-dia-reserva";
          vazio.textContent = campoData.value
            ? "Não há horários disponíveis para esta data."
            : "Os horários aparecem depois de selecionar uma data.";
          opcoesHorario.append(vazio);
          atualizarResumo();
          return;
        }

        horarios.forEach((slot) => {
          const botao = document.createElement("button");
          botao.type = "button";
          botao.className = "opcao-horario";
          botao.dataset.horario = slot.horario;
          botao.setAttribute("aria-pressed", String(campoHorario.value === slot.horario));
          botao.textContent = slot.horario;
          opcoesHorario.append(botao);
        });
        atualizarResumo();
      };

      const renderizarDias = () => {
        opcoesDia.replaceChildren();
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        for (let deslocamento = 0; deslocamento <= 6; deslocamento += 1) {
          const data = new Date(hoje);
          data.setDate(hoje.getDate() + deslocamento);
          const valorData = paraValorCampoData(data);
          const diaDisponivel = obterHorariosDisponiveis(valorData).length > 0;
          const diaLabel = new Intl.DateTimeFormat("pt-BR", { weekday: "short" })
            .format(data).replace(".", "").toUpperCase();
          const botao = document.createElement("button");
          botao.type = "button";
          botao.className = "opcao-dia";
          botao.dataset.data = valorData;
          botao.disabled = !diaDisponivel;
          botao.setAttribute("aria-pressed", String(campoData.value === valorData));
          botao.innerHTML = `<span>${deslocamento === 0 ? "HOJE" : diaLabel}</span><strong>${String(data.getDate()).padStart(2, "0")}</strong>`;
          opcoesDia.append(botao);
        }
      };

      conteudo.querySelectorAll("[data-modalidade]").forEach((botao) => {
        const selecionado = botao.dataset.modalidade === seletorModalidade.value;
        botao.classList.toggle("esta-selecionada", selecionado);
        botao.setAttribute("aria-pressed", String(selecionado));
        botao.addEventListener("click", () => {
          seletorModalidade.value = botao.dataset.modalidade;
          const imagemSelecionada = imagensModalidade[seletorModalidade.value];
          imagemAgendamento.src = imagemSelecionada.src;
          imagemAgendamento.alt = imagemSelecionada.alt;
          conteudo.querySelectorAll("[data-modalidade]").forEach((opcao) => {
            const ativo = opcao === botao;
            opcao.classList.toggle("esta-selecionada", ativo);
            opcao.setAttribute("aria-pressed", String(ativo));
          });
          selecionarPrimeiroHorario();
          renderizarDias();
          renderizarHorarios();
        });
      });

      opcoesDia.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-data]");
        if (!botao || botao.disabled) return;
        campoData.value = botao.dataset.data;
        campoHorario.value = "";
        opcoesDia.querySelectorAll("[data-data]").forEach((opcao) => {
          opcao.setAttribute("aria-pressed", String(opcao === botao));
        });
        renderizarHorarios();
      });

      opcoesHorario.addEventListener("click", (evento) => {
        const botao = evento.target.closest("[data-horario]");
        if (!botao) return;
        campoHorario.value = botao.dataset.horario;
        opcoesHorario.querySelectorAll("[data-horario]").forEach((opcao) => {
          opcao.setAttribute("aria-pressed", String(opcao === botao));
        });
        atualizarResumo();
      });

      selecionarPrimeiroHorario();
      renderizarDias();
      renderizarHorarios();

      formularioAgendamento.addEventListener("submit", (evento) => {
        evento.preventDefault();
        renderizarMinhasAulas();
      });
    };

    const renderizarMinhasAulas = () => {
      abas.hidden = true;
      formulario.hidden = true;
      conteudo.hidden = false;
      aviso.hidden = true;
      tela.classList.add("modo-agendamento");
      definirTitulo("Minhas aulas", "Acompanhe suas aulas.");
      definirFeedback("");

      conteudo.innerHTML = `
        <div class="pagina-agendamento">
          <header class="barra-agendamento">
            <a class="marca-agendamento" href="#" data-acao="fechar" aria-label="Voltar ao site System GFG">
              <img class="simbolo-marca-agendamento" src="imagens/logo.png" data-cinza-src="imagens/logo.png" data-vermelho-src="imagens/gfg%20vermelho.png" alt="">
              <span class="texto-marca-agendamento">System <strong>GFG</strong></span>
            </a>
            <nav class="navegacao-agendamento" aria-label="Navegação principal">
              <span class="navegacao-agendamento-ativa" aria-current="page">Minhas aulas</span>
            </nav>
            <div class="acoes-agendamento">
              <div class="seletor-tema seletor-tema-agendamento" aria-label="Escolha de cor">
                <button class="opcao-tema opcao-tema-vermelho" type="button" data-opcao-tema="vermelho" aria-label="Usar tema vermelho" aria-pressed="false"><span aria-hidden="true"></span>Vermelho</button>
                <button class="opcao-tema opcao-tema-cinza" type="button" data-opcao-tema="cinza" aria-label="Usar tema cinza" aria-pressed="false"><span aria-hidden="true"></span>Cinza</button>
              </div>
            </div>
          </header>
          <main class="painel-minhas-aulas">
            <header class="cabecalho-minhas-aulas">
              <div>
                <p class="sobretitulo-agendamento"><span></span>ÁREA DO ALUNO</p>
                <h1>MINHAS <em>AULAS</em></h1>
                <p class="descricao-minhas-aulas">Seus próximos treinos, reunidos em um só lugar.</p>
              </div>
              <button class="botao-principal botao-nova-aula" type="button" data-acao="agendar">AGENDAR AULA <span aria-hidden="true">&rarr;</span></button>
            </header>
            <section class="resumo-minhas-aulas" aria-label="Resumo das aulas">
              <article><span>AULAS AGENDADAS</span><strong>0</strong></article>
              <article><span>PRÓXIMA AULA</span><strong>—</strong></article>
              <article><span>MODALIDADES</span><strong>0</strong></article>
            </section>
            <section class="lista-minhas-aulas" aria-labelledby="tituloListaAulas">
              <div class="titulo-lista-aulas"><div><p>AGENDA</p><h2 id="tituloListaAulas">Suas aulas</h2></div><span>0 aulas</span></div>
              <div class="estado-vazio-aulas">
                <span class="icone-vazio-aulas" aria-hidden="true">◷</span>
                <h3>Nenhuma aula agendada</h3>
                <p>Esta área é apenas demonstrativa. O agendamento de aulas não está disponível.</p>
              </div>
            </section>
            <p class="aviso-area-demonstrativa">Os horários e as telas são ilustrativos. Nenhuma aula pode ser agendada por este site.</p>
          </main>
        </div>
      `;

      definirTema(document.documentElement.dataset.tema);
      conteudo.querySelectorAll(".opcao-tema").forEach((botao) => {
        botao.addEventListener("click", () => {
          const tema = botao.dataset.opcaoTema;
          if (tema !== "vermelho" && tema !== "cinza") return;
          definirTema(tema);
        });
      });
    };

    const abrir = (gatilho, modalidade = "") => {
      focoRetorno = gatilho || document.activeElement;
      modalidadePendente = HORARIOS[modalidade] ? modalidade : "";
      tela.classList.add("esta-visivel");
      tela.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      renderizarFormularioAcesso("entrar");
      cartao.querySelector(".botao-fechar-acesso").focus();
    };

    const fechar = () => {
      tela.classList.remove("esta-visivel");
      tela.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      campoEmail.value = "";
      campoNome.querySelector("input").value = "";
      campoSenha.value = "";
      campoConfirmacaoInput.value = "";
      if (focoRetorno instanceof HTMLElement) focoRetorno.focus();
    };

    const executarAcao = (acao) => {
      if (acao === "fechar") fechar();
      if (acao === "entrar" || acao === "cadastrar") renderizarFormularioAcesso(acao);
      if (acao === "agendar") {
        modalidadePendente = "";
        renderizarAgendamento();
      }
      if (acao === "aulas") renderizarFormularioAcesso("entrar");
      if (acao === "painel") renderizarFormularioAcesso("entrar");
    };

    cartao.addEventListener("click", (evento) => {
      const elementoAcao = evento.target.closest("[data-acao]");
      if (elementoAcao) executarAcao(elementoAcao.dataset.acao);
    });
    tela.addEventListener("click", (evento) => {
      if (evento.target === tela) fechar();
    });
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape" && tela.classList.contains("esta-visivel")) fechar();
    });

    document.querySelectorAll(".abrir-acesso").forEach((gatilho) => {
      gatilho.addEventListener("click", (evento) => {
        evento.preventDefault();
        abrir(gatilho);
      });
    });
    document.addEventListener("click", (evento) => {
      const gatilho = evento.target.closest(".abrir-agendamento");
      if (gatilho) abrir(gatilho, gatilho.dataset.modalidade);
    });

    return { abrir };
  };

  const renderizarHorarios = () => {
    document.querySelectorAll(".painel-apresentacao").forEach((painel) => {
      const agenda = HORARIOS[painel.id];
      const bloco = painel.querySelector(".bloco-horarios");
      if (!agenda || !bloco) return;

      const nota = document.createElement("p");
      nota.className = "aviso-horarios-aplicativo";
      nota.textContent = "Horários de referência. Consulte a equipe do centro para confirmar a disponibilidade.";
      const lista = document.createElement("ul");
      lista.className = "lista-horarios";
      agenda.horarios.forEach((slot) => {
        const item = document.createElement("li");
        const dia = document.createElement("span");
        dia.textContent = slot.nomeDia;
        const horario = document.createElement("strong");
        horario.textContent = slot.horario;
        item.append(dia, horario);
        lista.append(item);
      });
      bloco.replaceChildren(bloco.querySelector("h3"), nota, lista);

      const botao = document.createElement("button");
      botao.className = "botao-principal abrir-agendamento";
      botao.type = "button";
      botao.dataset.modalidade = painel.id;
      botao.textContent = "AGENDAR AULA DEMONSTRATIVA";
      painel.querySelector(".informacoes-apresentacao").append(botao);
    });
  };

  const configurarFormularioContato = () => {
    const formulario = buscarPorId("formularioContato");
    const retorno = buscarPorId("retornoContato");
    if (!formulario || !retorno) return;

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      retorno.textContent = "Este formulário é apenas demonstrativo. Sua mensagem não foi enviada nem salva.";
      retorno.classList.remove("esta-com-erro");
      retorno.hidden = false;
    });
  };

  const paraValorCampoData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  const inicializar = () => {
    limparDadosAntigos();
    configurarSeletorTema();
    configurarMenuCelular();
    configurarFormularioContato();
    renderizarHorarios();
    montarAplicativo();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar, { once: true });
  } else {
    inicializar();
  }
})();
