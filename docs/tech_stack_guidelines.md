# Diretrizes de Stack e Bibliotecas (Tech Stack)

Este documento lista as bibliotecas oficiais adotadas no projeto e os padrões de uso para evitar que agentes de IA instalem pacotes redundantes ou escrevam código desnecessário.

## Frontend (React + Vite)

### 1. Cliente HTTP (Axios)
**NÃO** utilize a API nativa `fetch` ou crie instâncias soltas do `axios`.
O projeto já possui uma instância pré-configurada do Axios que injeta automaticamente o token de autenticação (JWT) nas requisições.
*   **Como usar:** Sempre importe o client da pasta de services:
    ```javascript
    import { http } from '../services/http';
    
    // Exemplo
    const response = await http.get('/api/endpoint');
    ```

### 2. Ícones
O projeto utiliza exclusivamente a biblioteca **`lucide-react`**.
*   **Regra:** Não instale ou utilize `react-icons`, `heroicons`, `font-awesome` ou SVGs soltos sem necessidade. Importe diretamente do Lucide.

### 3. Animações
O projeto utiliza **`framer-motion`** para animações complexas, transições de tela e micro-interações.
*   **Regra:** Não utilize bibliotecas de animação concorrentes (como `react-spring` ou `gsap`). Sempre que precisar de animações além do CSS padrão (`animations.css`), utilize o componente `<motion.div>` do framer-motion.

### 4. Roteamento (React Router)
O projeto utiliza **`react-router-dom`** para controle de rotas no cliente.
*   **Regra:** Não utilize abordagens manuais com estados (`view`, `hash` da URL) para simular troca de telas. Utilize os componentes oficiais e hooks como `useNavigate` e `useParams`. O App está devidamente protegido com componentes guardiões (como `ProtectedRoute`).

### 5. Gerenciamento de Estado Global (Context API)
O estado global (como a sessão do usuário logado) é gerenciado usando a **Context API** do React nativa.
*   **Regra:** Não utilize Redux, Zustand ou MobX. Para checar autenticação, importe o hook `useAuth()` do `AuthContext`.

## Backend (Node.js + Express)

### 1. Validação de Dados (Zod)
A validação de payloads (body, query, params) **não** deve ser feita com if/else manuais. O projeto utiliza o **`zod`** como esquema oficial de validação.
*   **Regra:** Toda validação de entrada de dados deve ser escrita dentro do arquivo `[entidade].validation.js` correspondente, exportando um schema do Zod (ex: `z.object({...})`).

### 2. Criptografia de Senhas (Bcrypt)
O projeto utiliza o **`bcryptjs`** para gerar hash de senhas de usuários e fotógrafos.
*   **Regra:** Jamais salve senhas em texto puro no banco de dados e sempre utilize o `bcryptjs` no arquivo de `service` antes de persistir a entidade.
