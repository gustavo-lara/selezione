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

*   **Uso Seguro de Disco (`diskStorage`):** Como agora suportamos vídeos grandes e fotos 4K ilimitadas, o `multer` está configurado exclusivamente com `diskStorage()`. Arquivos são salvos momentaneamente no diretório temporário do sistema operacional (`os.tmpdir()`).
*   **Regra de Armazenamento:** Agentes de IA **devem obrigatoriamente** usar o pacote `fs` (preferencialmente `fs.promises`) apenas para ler o arquivo salvo pelo multer e, **crucialmente**, excluí-lo logo em seguida (`fs.unlinkSync` ou `await unlink`) para evitar o acúmulo de lixo no servidor. Nunca se deve guardar arquivos estáticos permanentes no disco local do backend.
*   **Limites e Filtros Flexíveis:** O middleware aceita imagens (`JPEG`, `PNG`, `WEBP`, `HEIC`) e também vídeos (`MP4`, `WEBM`, `MOV`). Não há limite estrito de tamanho por arquivo (limite de 25MB foi removido), deixando a responsabilidade do bloqueio para as regras de negócio de "Cota da Galeria" nos Controllers.
*   **Concorrência (Lotes):** Envios de arrays extensos para o Storage externo DEVEM ser paralelizados com controle de concorrência (ex: 5 requisições por vez) em vez de todos simultaneamente ou em um `for` síncrono.

Exemplo de uso na rota:
```javascript
import { upload } from '../../middlewares/upload.middleware.js';
// Upload de um único arquivo (req.file)
router.post('/upload-perfil', ensureAuthenticated, upload.single('foto'), Controller.uploadFoto);

// Upload de múltiplos arquivos (req.files)
router.post('/upload-galeria', ensureAuthenticated, upload.array('fotos', 50), Controller.uploadGaleria);
```
