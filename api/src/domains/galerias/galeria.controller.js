import { createGaleriaSchema, updateGaleriaSchema } from './galeria.validation.js';
import {
  createGaleria,
  getGaleriasByFotografo,
  getGaleriaBySlug,
  deleteGaleria,
  getGaleriaById,
  getGaleriaUsedSpace,
  updateGaleriaStorage
} from './galeria.service.js';
import { deleteFotosFromStorageByGaleriaId } from '../fotos/foto.service.js';
import { findFotografoById } from '../fotografos/fotografo.service.js';

export const create = async (req, res) => {
  try {
    const validation = createGaleriaSchema.safeParse(req.body);
    if (!validation.success) {
      const errors = validation.error.errors.map(err => err.message);
      return res.status(400).json({ error: 'Dados inválidos', details: errors });
    }

    const { nome, tamanho_alocado_bytes } = validation.data;
    const fotografoId = req.user.id;

    const fotografo = await findFotografoById(fotografoId);
    if (!fotografo) {
      return res.status(404).json({ error: 'Fotógrafo não encontrado' });
    }
    
    if (tamanho_alocado_bytes > fotografo.armazenamento_livre_bytes) {
      return res.status(400).json({ error: 'Espaço global insuficiente para alocar essa cota' });
    }

    const galeria = await createGaleria({ fotografoId, nome, tamanhoAlocadoBytes: tamanho_alocado_bytes });

    return res.status(201).json({
      message: 'Galeria criada com sucesso',
      galeria
    });
  } catch (error) {
    console.error('Erro ao criar galeria:', error);
    return res.status(500).json({ error: 'Erro interno ao criar galeria' });
  }
};

export const listMyGalerias = async (req, res) => {
  try {
    const fotografoId = req.user.id;
    const galerias = await getGaleriasByFotografo(fotografoId);

    return res.status(200).json({ galerias });
  } catch (error) {
    console.error('Erro ao listar galerias do fotógrafo:', error);
    return res.status(500).json({ error: 'Erro interno ao listar galerias' });
  }
};

export const getPublicBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const galeria = await getGaleriaBySlug(slug);

    if (!galeria) {
      return res.status(404).json({ error: 'Galeria não encontrada' });
    }

    return res.status(200).json({ galeria });
  } catch (error) {
    console.error('Erro ao buscar galeria pública:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar galeria' });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const fotografoId = req.user.id;
    
    const validation = updateGaleriaSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: 'Dados inválidos', details: validation.error.errors.map(e => e.message) });
    }

    const { tamanho_alocado_bytes } = validation.data;

    const galeria = await getGaleriaById(id, fotografoId);
    if (!galeria) return res.status(404).json({ error: 'Galeria não encontrada' });

    const usedSpace = await getGaleriaUsedSpace(id);
    if (tamanho_alocado_bytes < usedSpace) {
      return res.status(400).json({ error: `A nova cota não pode ser menor que o espaço já utilizado (${usedSpace} bytes)` });
    }

    const fotografo = await findFotografoById(fotografoId);
    const spaceDifference = tamanho_alocado_bytes - galeria.tamanho_alocado_bytes;
    if (spaceDifference > 0 && spaceDifference > fotografo.armazenamento_livre_bytes) {
      return res.status(400).json({ error: 'Espaço global insuficiente para alocar essa cota' });
    }

    const updatedGaleria = await updateGaleriaStorage(id, fotografoId, tamanho_alocado_bytes);
    
    return res.status(200).json({ message: 'Galeria atualizada', galeria: updatedGaleria });
  } catch (error) {
     console.error('Erro ao atualizar galeria:', error);
     return res.status(500).json({ error: 'Erro interno ao atualizar galeria' });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const fotografoId = req.user.id;

    // Verifica se a galeria existe e pertence ao fotógrafo logado
    const galeria = await getGaleriaById(id, fotografoId);
    if (!galeria) {
      return res.status(404).json({ error: 'Galeria não encontrada ou sem permissão para exclusão' });
    }

    // 1. Deletar as fotos físicas do bucket do Supabase
    await deleteFotosFromStorageByGaleriaId(id);

    // 2. Deletar a galeria do banco (As fotos no banco serão removidas via ON DELETE CASCADE)
    await deleteGaleria(id, fotografoId);

    return res.status(200).json({ message: 'Galeria e todas as suas fotos foram excluídas com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir galeria:', error);
    return res.status(500).json({ error: 'Erro interno ao excluir galeria' });
  }
};
