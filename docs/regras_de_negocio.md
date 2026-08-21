# Regras de Negócio (Business Rules) - Estado Atual

Este documento detalha **profundamente** as regras de negócio e fluxos *já implementados* na plataforma Selezione. Esta varredura abrange banco de dados (esquema), validações (Zod), middlewares e lógica de serviços. 

Este documento é a "fonte da verdade" do comportamento atual e servirá de base para a futura modelagem de um modelo SaaS Freemium.

---

## 1. Atores do Sistema

### 1.1. Fotógrafo (Admin)
É o usuário autenticado da plataforma, criador e dono do conteúdo.
*   **Cadastro:** Para se registrar, o sistema exige um Nome (mínimo 2 caracteres), um E-mail válido e uma Senha forte (mínimo de 6 caracteres).
*   **Segurança:** A senha não é salva no banco, ela é hasheada via `bcryptjs` (com salt 10).
*   **Sessão:** A autenticação é feita via JWT Bearer Token, injetado nos cabeçalhos HTTP.
*   **Gestão de Conta:** O fotógrafo pode atualizar seu nome de perfil na plataforma.

### 1.2. Cliente (Visualizador)
*   Não é uma entidade de usuário cadastrada/autenticada no banco de dados.
*   Acessa e interage com a plataforma de forma anônima, baseado puramente no acesso a um link.

---

## 2. Gestão de Galerias

### 2.1. Criação e Validações
*   Para criar uma galeria, o fotógrafo precisa definir apenas o **nome**, que deve ter rigorosamente entre **3 e 100 caracteres**.
*   O backend converte esse nome num *slug* (ex: "Casamento da Maria" vira "casamento-da-maria"), que se torna o `link_publico` definitivo. Esse link é `UNIQUE` (não podem existir duas galerias com o mesmo slug na plataforma).

### 2.2. Limites e Status Atuais
*   **Galerias por conta:** Infinito. Não existe bloqueio de plano limitando quantas galerias o fotógrafo pode criar.
*   **Data de Expiração:** Inexistente. A galeria fica ativa para sempre até ser excluída.
*   **Status de Fluxo:** Não há um estado de "Finalizada/Fechada". O cliente sempre pode alterar a seleção.

### 2.3. Acesso e Privacidade
*   O acesso do cliente ocorre exclusivamente pela posse do `link_publico`.
*   A API não implementa suporte a senhas para proteger galerias. A privacidade baseia-se unicamente em esconder a URL.

---

## 3. Upload e Gestão de Fotos

### 3.1. Processamento e Limites Técnicos (Middleware)
*   **Tipos Permitidos:** O upload (interceptado por Multer) aceita rigorosamente apenas os formatos: `JPEG`, `JPG`, `PNG`, `WEBP` e `HEIC`. O padrão de salvamento caso a extensão original falhe é `.jpg`.
*   **Tamanho Máximo:** O servidor rejeita qualquer foto individual que ultrapasse **25 MB**.
*   **Limites de Capacidade (Conta/Galeria):** Não há limite no backend sobre quantas fotos uma galeria pode ter, nem de Gigabytes totais armazenados por fotógrafo.

### 3.2. Armazenamento e Exclusão
*   **Fluxo de Salvamento:** As imagens não são salvas no disco local do servidor. O arquivo sobe para a memória RAM (Buffer) e é enviado por REST API diretamente para um bucket no **Supabase Storage**.
*   **Thumbnail vs Alta Resolução:** Atualmente não existe processamento visual/compressão de Thumbnails e Marca D'água. No banco, os metadados `url_storage` (usado para download em alta) e `thumbnail_url` (usado para grid) recebem e apontam para a mesma URL pública do Supabase.
*   **Clean Up (Cascata e Storage):** Se o fotógrafo exclui uma única foto ou deleta a galeria inteira, o backend apaga o registro do banco de dados e executa uma requisição para **excluir permanentemente o arquivo original** de dentro do Bucket do Supabase, evitando custos de armazenamento de arquivos órfãos.

---

## 4. Processo de Seleção (Fluxo do Cliente)

### 4.1. Regras e Limites de Escolha
*   **Ordens de Visualização:** O cliente vê as fotos baseadas na ordem estipulada durante o upload (`f.ordem ASC`) e no carimbo de tempo do sistema.
*   **Limites de Pacote:** O cliente é livre para selecionar de 0 a 100% das fotos. Não há funcionalidade de travar a galeria em "Máximo de 30 fotos selecionáveis".

### 4.2. Ação de Seleção (Toggle)
*   O clique de seleção no frontend bate em um endpoint de `toggle`. 
*   Se a foto não foi selecionada ainda, ele a insere na tabela `selecoes` com `aprovado = true`. 
*   Se já estava selecionada e ele clicar novamente, ela não é deletada do banco, apenas muda o status de `aprovado` para `false`.
*   **Interatividade:** Restrita a este booleano. O cliente não pode favoritar (estrela) ou escrever notas e comentários exigindo retoques nas fotos.

### 4.3. Ausência de Finalização
*   O fluxo carece da etapa "Enviar Seleção" para o Fotógrafo. Não há endpoint que "feche" a galeria e envie um gatilho/notificação para o sistema.
*   Se o cliente terminar a seleção à meia-noite, o fotógrafo só descobrirá se ele ativamente entrar no seu dashboard no dia seguinte.

---

## 5. Visualização e Exportação (Visão do Fotógrafo)

*   **Listagem (Dashboard):** A API `getGaleriasByFotografo` retorna a lista de galerias do fotógrafo com estatísticas integradas (join/count): número exato de fotos totais (`total_fotos`) e o exato número de fotos já marcadas como selecionadas no momento (`total_selecionadas`).
*   **Detalhamento da Galeria:** O fotógrafo consegue consultar a rota `listGaleriaSelecoes` para ver uma listagem contendo apenas as fotos onde `aprovado = true`.
*   **Exportação:** Ainda não há geração de arquivos CSV, nomes de arquivos RAW separados por vírgula para pesquisa no Lightroom, ou geração de arquivos ZIP para baixar em alta resolução. Todo o controle ocorre visualmente.

---

> **Direcionamento Estratégico (SaaS Freemium):** Com essa varredura hiper detalhada, fica claro que a arquitetura atual é 100% focada na **experiência base**. Todas as restrições que farão os usuários pagarem (Ex: Mais de N galerias, processamento de Thumbnails leves + Marca D'água para proteção, Galeria Protegida por Senha, Criação de Pacotes com limites de escolha e Botão de Finalizar Seleção com alertas) ainda precisam ser construídas sobre essa fundação.
