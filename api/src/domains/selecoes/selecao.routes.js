import { Router } from 'express';
import { toggleSelecao, listGaleriaSelecoes } from './selecao.controller.js';
import { ensureAuthenticated } from '../../middlewares/auth.middleware.js';
import { checkGalleryAccess } from '../../middlewares/clientAuth.middleware.js';

const router = Router();

// Rota pública para cliente final marcar/desmarcar a foto (toggle)
router.post('/fotos/:fotoId/selecao', checkGalleryAccess, toggleSelecao);

// Rota protegida para o fotógrafo visualizar apenas as fotos aprovadas da galeria
router.get('/galerias/:galeriaId/selecoes', ensureAuthenticated, listGaleriaSelecoes);

export default router;
