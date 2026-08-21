# Contexto do Backend (API)

Este documento serve como guia para agentes de IA que trabalham na parte do backend deste projeto. O backend é uma API construída em Node.js.

## Estrutura de Diretórios (`/api/src/`)

Para manter a organização e o padrão do projeto, os agentes de IA devem respeitar a seguinte arquitetura:

*   **`db/`**: Responsável pela conexão e configurações do banco de dados (ex: queries, schemas, conexões).
*   **`domains/`**: Contém a lógica de negócio principal dividida por domínios (entidades). Aqui devem ficar os controllers, models e services específicos de cada domínio.
*   **`infra/`**: Código relacionado a infraestrutura e integrações externas (ex: serviços de email, storage, etc.).
*   **`middlewares/`**: Middlewares do Express ou roteador utilizado, usados para interceptar requisições (ex: autenticação, validação, tratamento de erros).
*   **`router/`**: Configuração das rotas da API, conectando os endpoints aos respectivos controllers nos domínios.
*   **`utils/`**: Funções utilitárias e helpers genéricos que são reutilizados em várias partes da aplicação (ex: formatação de datas, geradores de hash).

## Regras para Agentes de IA

1.  **Não crie diretórios fora deste padrão:** Se precisar adicionar uma nova funcionalidade, avalie em qual diretório existente ela se encaixa melhor.
2.  **Lógica de Negócio:** Toda lógica de negócio deve estar contida dentro de `/domains`. Evite colocar lógica complexa em roteadores ou middlewares.
3.  **Atenção:** Siga sempre as práticas de código limpo e mantenha a consistência com os arquivos já existentes no projeto.
