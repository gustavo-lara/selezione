import { Router } from 'express';
import fotografoRoutes from '../domains/fotografos/fotografo.routes.js';
import galeriaRoutes from '../domains/galerias/galeria.routes.js';
import fotoRoutes from '../domains/fotos/foto.routes.js';
import selecaoRoutes from '../domains/selecoes/selecao.routes.js';

const router = Router();

router.use('/auth', fotografoRoutes);
router.use('/galerias', galeriaRoutes);
router.use('/', fotoRoutes);
router.use('/', selecaoRoutes);

export default router;
