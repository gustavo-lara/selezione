import { Router } from 'express';
import {
  uploadFotos,
  listPublicFotos,
  listMyGaleriaFotos,
  removeFoto
} from './foto.controller.js';
import { ensureAuthenticated } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';

const router = Router();

// Rota pública para o cliente final listar as fotos de uma galeria pública
router.get('/public/:slug/fotos', listPublicFotos);

// Rotas protegidas (autenticadas para fotógrafos)
router.post('/galerias/:galeriaId/fotos', ensureAuthenticated, upload.array('fotos', 200), uploadFotos);
router.get('/galerias/:galeriaId/fotos', ensureAuthenticated, listMyGaleriaFotos);
router.delete('/fotos/:id', ensureAuthenticated, removeFoto);

export default router;
