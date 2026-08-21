# Arquitetura e Padrões do Backend

Este documento serve como um guia profundo sobre os padrões arquiteturais internos da API (Node.js) para garantir que agentes de IA e desenvolvedores mantenham a consistência do código.

## Abordagem Orientada a Domínios (Domain-Driven)

O backend adota uma estrutura modular baseada nos domínios do negócio. Todos os domínios residem dentro de `/api/src/domains/` (ex: `fotografos`, `fotos`, `galerias`, `selecoes`).

Ao criar ou modificar uma funcionalidade, você deve identificar a qual domínio ela pertence. Dentro da pasta de um domínio específico, seguimos o seguinte padrão de separação de responsabilidades (Arquitetura em Camadas):

1.  **`[entidade].routes.js` (Rotas):** 
    *   **Responsabilidade:** Definir os endpoints HTTP e quais middlewares/controllers serão executados.
    *   **Regra:** Não deve conter lógica de negócio. Apenas mapeia um método (GET, POST, etc.) e um caminho (path) para o controller correspondente.
2.  **`[entidade].validation.js` (Validação):**
    *   **Responsabilidade:** Validar os dados de entrada (payload/body/params/query) antes que cheguem ao controller.
    *   **Regra:** Garante que dados mal formatados sejam rejeitados logo no início da requisição.
3.  **`[entidade].controller.js` (Controlador):**
    *   **Responsabilidade:** Receber a requisição (`req`), extrair os dados validados, chamar o Service apropriado e retornar a resposta (`res`) adequada ao cliente.
    *   **Regra:** Deve ser "magro". Não deve ter regras de negócio complexas nem queries de banco de dados diretas. Ele é apenas um orquestrador entre a requisição HTTP e o Service.
4.  **`[entidade].service.js` (Serviço):**
    *   **Responsabilidade:** O coração do sistema. Contém toda a **lógica de negócio**.
    *   **Regra:** Recebe parâmetros limpos (não deve conhecer objetos `req` ou `res` do Express). Aqui ficam os cálculos, validações de negócio, e as chamadas ao banco de dados ou infraestrutura externa.

## Banco de Dados

*   **Stack:** O projeto utiliza **PostgreSQL** hospedado no **Supabase**.
*   **Driver:** É utilizado o pacote nativo `pg` (node-postgres) para realizar as conexões e queries, via _connection pool_.
*   **Migrações:** As queries SQL brutas para estrutura do banco estão localizadas fora do `src` (geralmente em `/db/migrations/`). O script `/api/src/db/migrate.js` é utilizado para executar as mudanças de estrutura no banco via `DATABASE_URL`.

## Regras para Agentes de IA

1.  **Nunca pule camadas:** Uma rota não deve chamar um service diretamente; um controller não deve fazer queries no banco. O fluxo deve ser: `Rota -> Middleware/Validação -> Controller -> Service -> Banco de Dados`.
2.  **Agnosticismo HTTP no Service:** Os arquivos `.service.js` NUNCA devem receber os objetos `req` ou `res`. Eles devem receber apenas os valores primitivos ou objetos necessários para executar sua lógica e retornar o resultado (ou disparar um erro).
3.  **Queries de Banco:** Todas as interações com o banco de dados devem ocorrer na camada de Service (ou em repositórios, caso o padrão venha a ser adotado dentro do service). Evite espalhar SQL pelos Controllers.
