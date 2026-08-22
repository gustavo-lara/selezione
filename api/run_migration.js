import fs from 'fs';
import path from 'path';
import { query } from './src/infra/db/pool.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const sql = fs.readFileSync(path.join(__dirname, '../db/migrations/004_update_quota_3gb.sql'), 'utf-8');
  await query(sql);
  console.log('Migração 004 aplicada com sucesso!');
  process.exit(0);
}

run().catch(console.error);
