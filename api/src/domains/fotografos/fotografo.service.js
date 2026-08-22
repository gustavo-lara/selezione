import bcrypt from 'bcryptjs';
import { query } from '../../infra/db/pool.js';

export const findFotografoByEmail = async (email) => {
  const result = await query(
    'SELECT id, nome, email, senha_hash, created_at FROM fotografos WHERE email = $1;',
    [email]
  );
  return result.rows[0] || null;
};

export const findFotografoById = async (id) => {
  const result = await query(
    `SELECT 
      f.id, f.nome, f.email, f.created_at, f.plano, f.armazenamento_total_bytes,
      (f.armazenamento_total_bytes - COALESCE(SUM(g.tamanho_alocado_bytes), 0))::bigint AS armazenamento_livre_bytes
    FROM fotografos f
    LEFT JOIN galerias g ON f.id = g.fotografo_id
    WHERE f.id = $1
    GROUP BY f.id;`,
    [id]
  );
  
  if (!result.rows[0]) return null;
  
  const user = result.rows[0];
  return {
    ...user,
    armazenamento_total_bytes: parseInt(user.armazenamento_total_bytes, 10),
    armazenamento_livre_bytes: parseInt(user.armazenamento_livre_bytes, 10)
  };
};

export const createFotografo = async ({ nome, email, senha }) => {
  const salt = await bcrypt.genSalt(10);
  const senhaHash = await bcrypt.hash(senha, salt);

  const result = await query(
    `INSERT INTO fotografos (nome, email, senha_hash)
     VALUES ($1, $2, $3)
     RETURNING id, nome, email, created_at;`,
    [nome, email, senhaHash]
  );

  return result.rows[0];
};

export const verifyPassword = async (senha, senhaHash) => {
  return await bcrypt.compare(senha, senhaHash);
};

export const updateFotografoNome = async (id, nome) => {
  const result = await query(
    `UPDATE fotografos
     SET nome = $1
     WHERE id = $2
     RETURNING id, nome, email, created_at;`,
    [nome, id]
  );
  return result.rows[0] || null;
};
