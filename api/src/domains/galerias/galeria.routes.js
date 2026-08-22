import { Router } from 'express';
import {
  create,
  listMyGalerias,
  getPublicBySlug,
  update,
  remove,
  updateStatus
} from './galeria.controller.js';
import { ensureAuthenticated } from '../../middlewares/auth.middleware.js';

const router = Router();

// Rota pública para clientes finais acessarem via link público (slug)
router.get('/public/:slug', getPublicBySlug);

// Rotas protegidas (exigem fotógrafo autenticado)
router.post('/', ensureAuthenticated, create);
router.get('/', ensureAuthenticated, listMyGalerias);
router.put('/:id', ensureAuthenticated, update);
router.delete('/:id', ensureAuthenticated, remove);
router.patch('/:id/status', ensureAuthenticated, updateStatus);

export default router;
