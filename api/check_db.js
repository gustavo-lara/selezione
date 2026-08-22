import { query } from './src/infra/db/pool.js';

async function check() {
  const galerias = await query('SELECT id, fotografo_id, nome, tamanho_alocado_bytes FROM galerias;');
  console.log('Galerias:', galerias.rows);
  process.exit(0);
}

check().catch(console.error);
