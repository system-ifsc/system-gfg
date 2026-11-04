(() => {
  const CHAVE_TEMA = "gfg-theme";

  const definirTema = (tema) => {
    const temaSelecionado = tema === "vermelho" || tema === "red" ? "vermelho" : "cinza";
    document.documentElement.dataset.tema = temaSelecionado;

    const folhaAlternativa = document.getElementById("folhaEstiloTemaVermelho");
    if (folhaAlternativa) folhaAlternativa.disabled = temaSelecionado !== "vermelho";

    const metaTema = document.querySelector('meta[name="theme-color"]');
    if (metaTema) metaTema.content = temaSelecionado === "vermelho" ? "#140707" : "#111111";

    document.querySelectorAll("img[data-cinza-src][data-vermelho-src]").forEach((imagem) => {
      imagem.src = temaSelecionado === "vermelho" ? imagem.dataset.vermelhoSrc : imagem.dataset.cinzaSrc;
    });
  };

  const obterTemaSalvo = () => {
    try {
      const tema = localStorage.getItem(CHAVE_TEMA);
      return tema === "vermelho" || tema === "red" || tema === "cinza" ? tema : null;
    } catch {
      return null;
    }
  };

  const configurarEscolhaInicialTema = () => {
    const selecao = document.createElement("section");
    selecao.className = "selecao-inicial-tema";
    selecao.setAttribute("role", "dialog");
    selecao.setAttribute("aria-modal", "true");
    selecao.setAttribute("aria-labelledby", "tituloEscolhaTema");
    selecao.innerHTML = `
      <div class="cartao-escolha-tema">
        <p class="sobretitulo-escolha-tema">PERSONALIZE SUA EXPERIÊNCIA</p>
        <h1 id="tituloEscolhaTema">Qual cor combina com você?</h1>
        <p>Essa escolha definirá as cores do site e não poderá ser alterada depois.</p>
        <div class="opcoes-escolha-tema">
          <button class="botao-escolha-tema tema-vermelho" type="button" data-opcao-tema="vermelho">
            <span aria-hidden="true"></span>
            Vermelho
          </button>
          <button class="botao-escolha-tema tema-cinza" type="button" data-opcao-tema="cinza">
            <span aria-hidden="true"></span>
            Cinza
          </button>
        </div>
      </div>
    `;
    document.body.classList.add("tema-pendente");
    document.body.append(selecao);

    selecao.querySelectorAll("[data-opcao-tema]").forEach((botao) => {
      botao.addEventListener("click", () => {
        const tema = obterTemaSalvo() || botao.dataset.opcaoTema;
        try {
          if (!obterTemaSalvo()) localStorage.setItem(CHAVE_TEMA, tema);
        } catch {
          // Mantém a escolha aplicada durante esta visita.
        }
        definirTema(tema);
        document.body.classList.remove("tema-pendente");
        selecao.remove();
        document.querySelector(".logo")?.focus();
      });
    });

    selecao.addEventListener("keydown", (evento) => {
      if (evento.key !== "Tab") return;
      const botoes = selecao.querySelectorAll(".botao-escolha-tema");
      const primeiro = botoes[0];
      const ultimo = botoes[botoes.length - 1];
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    });

    selecao.querySelector(".botao-escolha-tema").focus();
  };

  const configurarMenuCelular = () => {
    const botao = document.getElementById("botaoMenu");
    const menu = document.getElementById("menuCelular");
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

    menu.querySelectorAll(".ligacao-celular").forEach((link) => {
      link.addEventListener("click", fecharMenu);
    });
    document.addEventListener("keydown", (evento) => {
      if (evento.key === "Escape") fecharMenu();
    });
  };

  const configurarFormularioContato = () => {
    const formulario = document.getElementById("formularioContato");
    const retorno = document.getElementById("retornoContato");
    if (!formulario || !retorno) return;

    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();
      retorno.textContent = "Preenchimento validado. Este site ainda não possui um canal de envio configurado.";
      retorno.classList.remove("esta-com-erro");
      retorno.hidden = false;
    });
  };

  const inicializar = () => {
    const temaSalvo = obterTemaSalvo();
    definirTema(temaSalvo || "cinza");
    if (!temaSalvo) configurarEscolhaInicialTema();
    configurarMenuCelular();
    configurarFormularioContato();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializar, { once: true });
  } else {
    inicializar();
  }
})();
