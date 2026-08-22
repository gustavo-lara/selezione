import jwt from 'jsonwebtoken';
import { getGaleriaBySlug, getGaleriaById } from '../domains/galerias/galeria.service.js';
import { query } from '../infra/db/pool.js';

/**
 * Middleware que verifica se a galeria acessada é pública ou protegida.
 * Se protegida, exige um token JWT válido de cliente para essa galeria.
 */
export const checkGalleryAccess = async (req, res, next) => {
  try {
    const { slug, fotoId } = req.params;
    let galeria = null;

    if (slug) {
      galeria = await getGaleriaBySlug(slug);
    } else if (fotoId) {
      // Busca a galeria correspondente à foto
      const fotoResult = await query('SELECT galeria_id FROM fotos WHERE id = $1', [fotoId]);
      if (fotoResult.rows.length > 0) {
        // fotografoId não é necessário aqui pois estamos lendo dados base para auth de cliente
        const galeriaId = fotoResult.rows[0].galeria_id;
        const gResult = await query('SELECT id, senha_hash FROM galerias WHERE id = $1', [galeriaId]);
        galeria = gResult.rows[0];
      }
    }

    if (!galeria) {
      return res.status(404).json({ error: 'Galeria ou recurso não encontrado' });
    }

    // Se a galeria não possui senha, acesso livre
    if (!galeria.senha_hash) {
      return next();
    }

    // Galeria possui senha: exige token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Acesso negado: galeria protegida por senha' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Sessão inválida ou expirada' });
      }

      if (decoded.role !== 'client' || decoded.galeriaId !== galeria.id) {
        return res.status(403).json({ error: 'Permissão negada para acessar esta galeria' });
      }

      req.clientData = decoded;
      return next();
    });
  } catch (error) {
    console.error('Erro no middleware clientAuth:', error);
    return res.status(500).json({ error: 'Erro interno na validação de acesso' });
  }
};
