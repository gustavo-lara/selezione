import { query } from '../../infra/db/pool.js';
import { generateSlug } from '../../utils/slug.js';

export const createGaleria = async ({ fotografoId, nome, tamanhoAlocadoBytes }) => {
  const linkPublico = generateSlug(nome);

  const result = await query(
    `INSERT INTO galerias (fotografo_id, nome, link_publico, tamanho_alocado_bytes)
     VALUES ($1, $2, $3, $4)
     RETURNING id, fotografo_id, nome, link_publico, tamanho_alocado_bytes, created_at;`,
    [fotografoId, nome, linkPublico, tamanhoAlocadoBytes]
  );

  return result.rows[0];
};

export const getGaleriasByFotografo = async (fotografoId) => {
  const result = await query(
    `SELECT 
       g.id,
       g.nome,
       g.link_publico,
       g.tamanho_alocado_bytes,
       COALESCE(SUM(f.tamanho_arquivo_bytes), 0)::bigint AS tamanho_usado_bytes,
       g.created_at,
       COUNT(DISTINCT f.id)::int AS total_fotos,
       COUNT(DISTINCT s.id)::int AS total_selecionadas
     FROM galerias g
     LEFT JOIN fotos f ON f.galeria_id = g.id
     LEFT JOIN selecoes s ON s.foto_id = f.id AND s.aprovado = true
     WHERE g.fotografo_id = $1
     GROUP BY g.id
     ORDER BY g.created_at DESC;`,
    [fotografoId]
  );

  return result.rows.map(row => ({
    ...row,
    tamanho_alocado_bytes: parseInt(row.tamanho_alocado_bytes, 10),
    tamanho_usado_bytes: parseInt(row.tamanho_usado_bytes, 10)
  }));
};

export const getGaleriaBySlug = async (slug) => {
  const result = await query(
    `SELECT id, nome, link_publico, created_at
     FROM galerias
     WHERE link_publico = $1;`,
    [slug]
  );

  return result.rows[0] || null;
};

export const getGaleriaById = async (id, fotografoId) => {
  const result = await query(
    `SELECT id, fotografo_id, nome, link_publico, tamanho_alocado_bytes, created_at
     FROM galerias
     WHERE id = $1 AND fotografo_id = $2;`,
    [id, fotografoId]
  );

  if (result.rows[0]) {
    result.rows[0].tamanho_alocado_bytes = parseInt(result.rows[0].tamanho_alocado_bytes, 10);
  }

  return result.rows[0] || null;
};

export const deleteGaleria = async (id, fotografoId) => {
  const result = await query(
    `DELETE FROM galerias
     WHERE id = $1 AND fotografo_id = $2
     RETURNING id;`,
    [id, fotografoId]
  );

  return result.rows[0] || null;
};

export const getGaleriaUsedSpace = async (galeriaId) => {
  const result = await query(
    `SELECT COALESCE(SUM(tamanho_arquivo_bytes), 0)::bigint AS used_space
     FROM fotos
     WHERE galeria_id = $1;`,
    [galeriaId]
  );
  return parseInt(result.rows[0].used_space, 10);
};

export const updateGaleriaStorage = async (id, fotografoId, tamanhoAlocadoBytes) => {
  const result = await query(
    `UPDATE galerias
     SET tamanho_alocado_bytes = $1
     WHERE id = $2 AND fotografo_id = $3
     RETURNING id, fotografo_id, nome, link_publico, tamanho_alocado_bytes, created_at;`,
    [tamanhoAlocadoBytes, id, fotografoId]
  );
  if (result.rows[0]) {
    result.rows[0].tamanho_alocado_bytes = parseInt(result.rows[0].tamanho_alocado_bytes, 10);
  }
  return result.rows[0] || null;
};
