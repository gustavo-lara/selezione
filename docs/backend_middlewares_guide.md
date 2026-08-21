# Guia de Middlewares (Autenticação e Uploads)

Este documento documenta os padrões críticos para lidar com Autenticação e Upload de arquivos no backend (API). Agentes de IA devem seguir estritamente estas regras para não introduzir vulnerabilidades ou comportamentos inesperados.

## 1. Autenticação (`auth.middleware.js`)

A API utiliza **JWT (JSON Web Tokens)** para autenticação via cabeçalho `Authorization: Bearer <token>`.

*   **Protegendo Rotas:** Para proteger um endpoint, importe e utilize o middleware `ensureAuthenticated` no arquivo de rotas (ex: `.routes.js`).
*   **Acesso ao Usuário:** O middleware valida o token e anexa as informações do usuário no objeto de requisição: `req.user` (contendo `id` e `email`).
*   **Regra para Controllers:** O Controller deve extrair o `req.user.id` e passá-lo como argumento para o Service. O Service **não deve** receber o `req.user` inteiro, nem buscar o usuário novamente a menos que precise de mais dados.

Exemplo de uso na rota:
```javascript
import { ensureAuthenticated } from '../../middlewares/auth.middleware.js';
router.post('/nova-selecao', ensureAuthenticated, Controller.create);
```

## 2. Upload de Arquivos (`upload.middleware.js`)

Como o projeto lida com fotografias, o upload é uma parte sensível e exige cuidado com o consumo de memória e armazenamento.

*   **Memória RAM (Buffer):** O `multer` está configurado com `memoryStorage()`. Isso significa que **os arquivos não são salvos no disco local do servidor**. Eles ficam em memória (`req.file.buffer` ou `req.files`) para serem enviados diretamente para um Storage externo (como S3, Supabase Storage, etc).
*   **Regra de Armazenamento:** Agentes de IA **nunca** devem tentar usar o pacote `fs` para ler, escrever ou salvar imagens no sistema de arquivos local (`diskStorage`).
*   **Limites e Filtros:** O middleware aceita apenas imagens (JPEG, PNG, WEBP, HEIC) e possui um limite fixo de tamanho (ex: 25MB por arquivo).

Exemplo de uso na rota:
```javascript
import { upload } from '../../middlewares/upload.middleware.js';
// Upload de um único arquivo (req.file)
router.post('/upload-perfil', ensureAuthenticated, upload.single('foto'), Controller.uploadFoto);

// Upload de múltiplos arquivos (req.files)
router.post('/upload-galeria', ensureAuthenticated, upload.array('fotos', 50), Controller.uploadGaleria);
```
