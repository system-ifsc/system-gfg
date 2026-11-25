# 🥊 Sistema GFG — Centro de Treinamento

<p align="center">
  <strong>Site institucional do Centro de Treinamento System GFG.</strong>
</p>

<p align="center">
  🥋 Muay Thai • Jiu-Jitsu • Boxe
</p>

---

## 👥 Integrantes

- **Gabriel Moraes**
- **Felipe Mesquita**
- **Gabriel Henrique**

## 📚 Informações do Projeto

| Informação | Detalhes |
|---|---|
| Sistema | GFG — Centro de Treinamento |
| Disciplina | Resolução de Problemas |
| Área | Apresentação institucional |
| Público-alvo | Pessoas interessadas em artes marciais e no centro de treinamento |

---

## 📌 Sobre o Projeto

O **Sistema GFG** é um site institucional para apresentar o centro de treinamento e suas modalidades: Muay Thai, Jiu-Jitsu e Boxe. O site não oferece login, cadastro, agendamento, reservas ou ferramentas administrativas. A página Contato direciona ao assistente de IA, sem exigir nome ou e-mail.

Na primeira visita, escolha entre os temas vermelho e cinza. A escolha fica salva neste navegador, conforme o comportamento atual do projeto.

### 🎯 Objetivo

Apresentar a identidade, a proposta e as modalidades do centro de forma **clara, acessível e organizada**.

---

## 🥋 Modalidades Disponíveis

O Centro de Treinamento System GFG oferece diferentes modalidades de artes marciais:

| Modalidade | Descrição |
|---|---|
| 🥊 Muay Thai | Treinamento de técnicas de combate e condicionamento físico. |
| 🥋 Jiu-Jitsu | Prática de técnicas de luta e defesa pessoal. |
| 🥊 Boxe | Treinamento de golpes, movimentação e resistência física. |

As aulas serão organizadas de acordo com a faixa etária:

- 👶 Crianças
- 🧑 Adultos

---

## ⚙️ Funcionalidades Principais

### Conteúdo institucional

- Apresentação do centro de treinamento.
- Informações sobre Muay Thai, Jiu-Jitsu e Boxe.
- Páginas Sobre e Contato.
- Navegação responsiva e seleção entre os temas vermelho e cinza.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Utilização |
|---|---|
| 🌐 HTML | Estrutura das páginas e componentes do sistema. |
| 🎨 CSS | Estilização, disposição dos elementos e adaptação a diferentes telas. |
| ⚡ JavaScript | Interações da interface e demonstrações locais no navegador. |
| 🎨 Figma | Planejamento visual das telas. |

As páginas institucionais usam HTML, CSS e JavaScript. O chat conta com um servidor Node.js para consultar a IA, sem expor a chave no navegador. Não há banco de dados, autenticação ou envio de formulários.

## ▶️ Como executar com IA real

Requer Node.js 22 ou superior. Não há dependências para instalar.

1. Copie `.env.example` para `.env`.
2. No `.env`, preencha `GEMINI_API_KEY` com uma chave Gemini configurada pelo responsável pelo projeto no [Google AI Studio](https://aistudio.google.com/api-keys). Não coloque a chave no HTML, no JavaScript do navegador ou no Git. O Gemini oferece uma [faixa gratuita com limites](https://ai.google.dev/gemini-api/docs/pricing), sujeita à disponibilidade do modelo e da conta. Use um projeto no nível gratuito; o código não ativa faturamento nem muda para um modelo pago.
3. Ajuste `GEMINI_MODEL` se necessário para um modelo habilitado na sua conta (padrão: `gemini-3.5-flash-lite`).
4. Execute `npm start` e abra **http://localhost:3000**.
5. Entre em **Tire suas dúvidas com a IA** e envie uma pergunta. Pergunte algo relacionado em seguida para verificar o contexto.

Abrir o HTML diretamente ou usar apenas um servidor estático não ativa a IA. A rota `GET /api/health` indica se a chave está definida, mas não valida acesso ou saldo.

O chat usa a [API generateContent do Google Gemini](https://ai.google.dev/api/generate-content). O servidor envia as últimas 20 mensagens e a base `knowledge.txt` ao modelo. O histórico fica na memória da página, sem banco de dados nem localStorage. O Google processa as mensagens conforme suas políticas e pode usar conteúdo do nível gratuito para melhorar seus produtos; não envie dados sensíveis. **Nova conversa** limpa o histórico local. Erros preservam a pergunta para nova tentativa.

Atualize `knowledge.txt` com informações oficiais para permitir respostas sobre preços, horários e contatos. Enquanto esses dados não estiverem disponíveis, o assistente deve reconhecer que não os conhece. Não há consulta à internet, atendimento humano, agendamento nem matrícula pelo chat. Respostas podem conter erros.

Execute `npm test` para testar o servidor, incluindo contexto, entradas inválidas, indisponibilidade da API e bloqueio de arquivos privados. Os testes usam uma API simulada; uma conversa real precisa da chave configurada.

Para hospedar, use um serviço com Node.js e variáveis de ambiente, configure `HOST=0.0.0.0` se exigido pelo provedor e publique com HTTPS. O servidor limita cada IP a 12 perguntas por minuto e cada requisição a 100 KB. Para um serviço público com vários usuários, configure também controle de acesso/cotas e limites de gastos; o limite local é por processo e considera o endereço do proxy quando houver um.

---

## 🚀 Evolução do site

O site do Sistema GFG está sendo desenvolvido em etapas:

### 1️⃣ Planejamento visual

O **Figma** é utilizado para planejar as telas e definir a estrutura visual da plataforma.

O planejamento visual contempla a navegação institucional, a apresentação das modalidades e as páginas informativas.

### 2️⃣ Desenvolvimento da interface

O site está sendo construído com:

- HTML para estruturar as páginas.
- CSS para definir a aparência.
- JavaScript para controlar as interações demonstrativas.

O objetivo é manter a identidade visual existente em uma interface institucional simples, intuitiva e adaptável a diferentes telas.

A página Contato direciona ao chat. O servidor não grava as conversas em banco de dados; as mensagens são processadas pelo provedor de IA.

---

## 🗂️ Estrutura Geral do Sistema

```text
Sistema GFG
│
├── Início
├── Modalidades
├── Sobre o centro
├── Contato
└── Assistente IA
```

---

## 💡 Objetivos do site

O Sistema GFG busca oferecer:

- ✅ Apresentar o centro e suas modalidades.
- ✅ Oferecer navegação institucional entre as páginas.
- ✅ Preservar os temas e a interface responsiva do projeto.

---

## 🎯 Resultado Esperado

O site apresenta o Centro de Treinamento System GFG e suas modalidades. O visual original foi preservado; as funções de login, agendamento e gerenciamento foram retiradas do escopo.

---

<p align="center">
  🥊 <strong>Sistema GFG — Treine. Evolua. Supere seus limites.</strong> 🥊
</p>

<p align="center">
  Desenvolvido pelos estudantes Gabriel Moraes, Felipe Mesquita e Gabriel Henrique.
</p>
