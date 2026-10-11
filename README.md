# 🥊 Sistema GFG — Centro de Treinamento

<p align="center">
  <strong>Uma plataforma demonstrativa para apresentar modalidades e explorar a experiência de um centro de treinamento.</strong>
</p>

<p align="center">
  🥋 Muay Thai • Jiu-Jitsu • Boxe
</p>

---

## 👥 Integrantes

- **Gabriel Moraes**
- **Felipe**
- **Gabriel Henrique**

## 📚 Informações do Projeto

| Informação | Detalhes |
|---|---|
| Sistema | GFG — Centro de Treinamento |
| Disciplina | Resolução de Problemas |
| Área | Agendamento e gerenciamento esportivo |
| Público-alvo | Alunos, professores e responsáveis por CTs |

---

## 📌 Sobre o Projeto

O **Sistema GFG** é um protótipo front-end para apresentar um centro de treinamento de artes marciais, suas modalidades, horários de referência e recursos demonstrativos para os alunos.

Login e cadastro são demonstrações visuais: ao enviar qualquer um dos formulários, a tela mostra o agendamento sem autenticar ou guardar os dados digitados. A seleção de horários e o formulário de contato também são demonstrativos; nada é enviado ou salvo. Na primeira visita, escolha entre os temas vermelho e cinza; a cor escolhida fica salva neste navegador e não pode ser alterada pelo site.

Os horários exibidos nesta versão são apenas referências e não confirmam disponibilidade de vaga; consulte a equipe do centro.

### 🎯 Objetivo

Tornar a exploração das modalidades e dos recursos demonstrativos **clara, acessível e organizada**.

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

### 👤 Área do aluno

- [ ] Acesso e cadastro de conta.
- [ ] Seleção de cidade e centro de treinamento.
- [x] Apresentação de Muay Thai, Jiu-Jitsu e Boxe.
- [ ] Identificação da faixa etária (criança ou adulto).
- [x] Exibição de horários de referência por dia da semana.
- [ ] Criação, consulta e cancelamento de agendamentos.
- [ ] Confirmação real de disponibilidade com um centro de treinamento.

### 🧑‍🏫 Área do Professor e Administrador

- [ ] Cadastro e gerenciamento de professores.
- [ ] Cadastro e gerenciamento de alunos.
- [ ] Cadastro de modalidades e turmas.
- [ ] Organização de dias e horários das aulas.
- [ ] Visualização dos alunos inscritos em cada turma.
- [ ] Gerenciamento de agendamentos.
- [ ] Controle de horários para evitar conflitos.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Utilização |
|---|---|
| 🌐 HTML | Estrutura das páginas e componentes do sistema. |
| 🎨 CSS | Estilização, disposição dos elementos e adaptação a diferentes telas. |
| ⚡ JavaScript | Interações da interface e demonstrações locais no navegador. |
| 🎨 Figma | Planejamento visual das telas. |

O site não está integrado a um servidor de aplicação, banco de dados, serviço de autenticação ou envio de formulários.

## ▶️ Como testar

1. Abra `index.html` no navegador ou inicie um servidor local simples, por exemplo, com `py -m http.server 8000`.
2. Navegue pelas páginas **Início**, **Modalidades**, **Sobre** e **Contato**.
3. Na primeira visita, escolha a cor do site. Essa preferência permanece em todas as páginas e não há opção para trocá-la depois.
4. Abra as telas de acesso e cadastro. Os perfis são demonstrativos e ficam somente no navegador.
5. Na página **Contato**, experimente o formulário; a mensagem não é enviada nem salva.
6. Na página **Modalidades**, consulte os horários de referência e explore a interface de agendamento. Nenhuma reserva é criada ou salva.

---

## 🚀 Evolução do site

O site do Sistema GFG está sendo desenvolvido em etapas:

### 1️⃣ Planejamento visual

O **Figma** é utilizado para planejar as telas e definir a estrutura visual da plataforma.

O planejamento visual inclui os principais fluxos de navegação, como cadastro, seleção de modalidades e agendamento de aulas.

### 2️⃣ Desenvolvimento da interface

O site está sendo construído com:

- HTML para estruturar as páginas.
- CSS para definir a aparência.
- JavaScript para controlar as interações demonstrativas.

O objetivo é criar uma interface simples, intuitiva e adaptável a telas de diferentes tamanhos.

### 3️⃣ Recursos que aguardam integração

Autenticação segura, envio de mensagens, disponibilidade real de vagas, perfis administrativos e persistência compartilhada dependem de integração com os sistemas do centro. Até lá, os dados locais não devem ser tratados como reservas confirmadas.

---

## 🗂️ Estrutura Geral do Sistema

```text
Sistema GFG
│
├── Início
├── Modalidades e horários de referência
├── Sobre o centro
├── Contato
└── Recursos de demonstração no navegador
```

---

## 💡 Objetivos do site

O Sistema GFG busca oferecer:

- ✅ Apresentar as modalidades e horários de referência.
- ✅ Oferecer navegação e recursos locais para explorar a experiência de agendamento.
- ✅ Escolher uma única vez o tema visual e explorar a interface responsiva.

---

## 🎯 Resultado Esperado

O site apresenta o Centro de Treinamento System GFG e suas modalidades. As operações online dependem de integrações que ainda estão sendo desenvolvidas; confirme diretamente com a equipe qualquer informação sobre disponibilidade de aulas.

---

<p align="center">
  🥊 <strong>Sistema GFG — Treine. Evolua. Supere seus limites.</strong> 🥊
</p>

<p align="center">
  Desenvolvido por Gabriel Moraes, Felipe e Gabriel Henrique.
</p>
