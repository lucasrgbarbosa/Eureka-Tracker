# 📚 Organizador de Estudos - Tracker de Dúvidas

Uma aplicação web focada em ajudar estudantes a registrar, organizar e resolver suas dúvidas durante sessões de estudo intensas.

🌍 **Live Demo (Front-end):** [Inserir link da Vercel aqui]
⚙️ **API (Back-end):** [Inserir link do Render/Glitch aqui]
📄 **Leia o Mini PRD:** [PRD.md](./PRD.md)

## ✨ Funcionalidades

- **Registro Rápido:** Adicione dúvidas categorizadas por matéria e nível de prioridade.
- **Gestão de Status:** Marque dúvidas como "Resolvidas" para movê-las ao histórico, mantendo seu backlog de estudos limpo.
- **Feedback Visual:** Telas de loading amigáveis e tratamento de erros caso a API fique indisponível.
- **Acessibilidade:** Desenvolvido com HTML semântico (`<article>`, `<section>`, `<main>`) e atributos `aria-label` para navegação assistida.

## 🛠️ Tecnologias Utilizadas

- **Front-end:** React 18, TypeScript, Vite.
- **Estilização:** CSS Modules (Garante escopo local e zero conflitos de estilo, mantendo o JSX limpo e legível).
- **Back-end:** Node.js com `json-server` (API REST fake).
- **Hooks Avançados:** `useState`, `useEffect`, `useRef` (para performance em formulários) e `useMemo` (para otimização de filtros em listas grandes).

## 🧠 Justificativas de Design e UX

- **Por que não há Tailwind?** Optou-se pelo uso de *CSS Modules* para demonstrar forte domínio de CSS puro, separação estrita de responsabilidades e manutenção de um HTML puramente semântico.
- **Por que há confirmação antes de deletar?** O código utiliza um `SweetAlert2` na exclusão. Como os dados representam o "esforço de estudo" do usuário, uma exclusão acidental causaria grande frustração. O atrito de um clique a mais é justificado pela segurança dos dados.
- **Isolamento da API:** Todas as chamadas `fetch` foram abstraídas para a pasta `src/services/`, impedindo que os componentes React conheçam detalhes de URLs ou métodos HTTP, facilitando manutenções futuras.

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js instalado na máquina.

### Passos
1. Clone o repositório:
   ```bash
   git clone [https://github.com/lucasrgbarbosa/Eureka-Tracker]
Entre na pasta do projeto:

Bash
cd SEU_REPOSITORIO
Instale as dependências:

Bash
npm install
Rode a aplicação (Inicia o Front-end e o Back-end simultaneamente):

Bash
npm run dev:full
Acesse no navegador: http://localhost:5173

👨‍💻 Autor
Desenvolvido por Lucas Ribeiro como parte do Desafio do Módulo 4.