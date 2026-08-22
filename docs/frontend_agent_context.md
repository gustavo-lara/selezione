# Contexto do Frontend (Client)

Este documento serve como guia para agentes de IA que trabalham na parte do frontend deste projeto. O frontend utiliza React (criado com Vite).

## Estrutura de Diretórios (`/client/src/`)

Para manter a organização e o padrão do projeto, os agentes de IA devem respeitar a seguinte arquitetura:

*   **`assets/`**: Arquivos estáticos como imagens, ícones e fontes que são importados pelo código.
*   **`components/`**: Componentes reutilizáveis e utilitários globais, como guardas de rotas (`ProtectedRoute`, etc).
*   **`contexts/`**: Contextos do React para gerenciamento de estado global (ex: `AuthContext.jsx`).
*   **`features/`**: Contém componentes, rotas e lógicas específicas agrupadas por funcionalidade (feature-based architecture). Componentes que pertencem exclusivamente a uma feature devem ficar aqui. É recomendado que features complexas (como o Dashboard) tenham sua própria subpasta `pages/` para organizar suas rotas internas.
*   **`pages/`**: Componentes que representam páginas genéricas ou de erro da aplicação (ex: `NotFoundPage`). Páginas atreladas a uma feature específica devem residir dentro de `/features/[nome-da-feature]/`.
*   **`services/`**: Responsável por toda a comunicação externa, principalmente chamadas à API (requests HTTP) e integrações com o backend.
*   **`styles/`**: Arquivos de estilização globais, variáveis de CSS e configurações de design.
*   **Arquivos na raiz do `src` (ex: `App.jsx`, `main.jsx`, `index.css`)**: Ponto de entrada da aplicação, definições de rotas (`react-router-dom`) e estilos base.

## Regras para Agentes de IA

1.  **Arquitetura por Features:** Prefira colocar componentes específicos dentro de suas respectivas pastas em `/features` em vez de criar uma pasta genérica de componentes.
2.  **Separação de Preocupações:** Componentes visuais (`features` e `pages`) não devem fazer chamadas diretas à API. Utilize funções definidas na pasta `/services` para buscar ou enviar dados.
3.  **Estilização:** Siga o padrão de estilização já estabelecido no projeto.
4.  **Atenção:** Não altere configurações sensíveis (`vite.config.js`, dependências principais) sem necessidade explícita.
