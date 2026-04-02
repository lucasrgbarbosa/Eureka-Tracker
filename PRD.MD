# Mini PRD: Organizador de Estudos - Tracker de Dúvidas

## 1. Problema
* **Qual problema específico você está resolvendo?**
  Durante o aprendizado de disciplinas complexas (como programação), é comum que o estudante acumule pequenas dúvidas ao longo do estudo. Muitas vezes, essas dúvidas são anotadas em cadernos, blocos de notas perdidos ou simplesmente esquecidas. Quando chega o momento de revisar ou pedir ajuda a um professor/mentor, o estudante não lembra mais do contexto da dúvida.
* **Por que esse problema vale a pena ser resolvido?**
  Aprender de forma eficiente exige que as lacunas de conhecimento sejam fechadas. Um local centralizado para registrar, categorizar e marcar dúvidas como resolvidas reduz a carga cognitiva do estudante e cria um histórico de aprendizado.
* **Quem é o usuário que sente esse problema?**
  Estudantes de tecnologia, autodidatas ou alunos de bootcamps que lidam com alto volume de informações técnicas diárias e precisam de um fluxo rápido para registrar bloqueios sem interromper totalmente a sessão de estudo.

## 2. Soluções (Funcionalidades Essenciais)
Se alguma destas funcionalidades for removida, o problema central (perder o controle das dúvidas) volta a ocorrer:
1. **Registro Rápido de Dúvida:** Criar uma nova dúvida com Título, Matéria, Descrição e Prioridade.
2. **Visão Geral do Backlog:** Visualizar todas as dúvidas pendentes separadas por prioridade/matéria.
3. **Resolução de Dúvidas:** Marcar uma dúvida como "Resolvida" (movendo-a para o histórico em vez de apenas apagá-la, para futura consulta).
4. **Remoção de Dúvidas:** Excluir registros criados por engano ou que perderam a relevância.

## 3. Decisões Técnicas
* **Arquitetura de API:** A aplicação consome uma API REST simulada via `json-server`.
* **Entidade Principal:** `Duvida` (id, titulo, materia, descricao, status, prioridade, criadoEm, resolvidoEm).
* **Operações de Rede:**
  * `GET /duvidas`: Para carregar o painel principal (estado de loading e fallback de lista vazia tratados).
  * `POST /duvidas`: Para registrar novas dúvidas. A UI é atualizada otimisticamente após o sucesso da requisição.
  * `PATCH /duvidas/:id`: Para alternar o status entre "pendente" e "resolvida". Escolhido PATCH no lugar de PUT por atualizar apenas campos parciais do recurso.
  * `DELETE /duvidas/:id`: Para remover permanentemente uma dúvida.
* **Otimização (Hooks):** * Uso de `useRef` no formulário de criação para evitar re-renderizações desnecessárias a cada tecla digitada (performance).
  * Uso de `useMemo` para separar as listas de "Pendentes" e "Resolvidas", garantindo que o cálculo do filtro só ocorra quando a lista de dependências sofrer mutação na API.
* **Estilização:** CSS Modules para garantir o escopo local dos estilos sem a sobrecarga visual de classes utilitárias no JSX, mantendo o HTML limpo e semântico.