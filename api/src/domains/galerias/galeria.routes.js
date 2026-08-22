import { Router } from 'express';
import {
  create,
  listMyGalerias,
  getPublicBySlug,
  update,
  remove,
  updateStatus,
  updatePassword,
  authenticateClient
} from './galeria.controller.js';
import { ensureAuthenticated } from '../../middlewares/auth.middleware.js';

const router = Router();

// Rota pública para clientes finais acessarem via link público (slug)
router.get('/public/:slug', getPublicBySlug);
router.post('/public/:slug/auth', authenticateClient);

// Rotas protegidas (exigem fotógrafo autenticado)
router.post('/', ensureAuthenticated, create);
router.get('/', ensureAuthenticated, listMyGalerias);
router.put('/:id', ensureAuthenticated, update);
router.delete('/:id', ensureAuthenticated, remove);
router.patch('/:id/status', ensureAuthenticated, updateStatus);
router.patch('/:id/password', ensureAuthenticated, updatePassword);

export default router;
