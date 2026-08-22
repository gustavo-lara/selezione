import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

async function runMigration() {
  console.log('Executando migrações do banco de dados no Supabase...');

  if (!process.env.DATABASE_URL) {
    console.error('ERRO: DATABASE_URL não foi informada no arquivo .env');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const migrationsDir = path.resolve('../db/migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();
    
    const client = await pool.connect();
    
    for (const file of files) {
      console.log(`Executando migração: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await client.query(sql);
    }
    
    console.log('MIGRAÇÃO CONCLUÍDA COM SUCESSO!');
    
    client.release();
    await pool.end();
  } catch (error) {
    console.error('ERRO durante a execução da migração:', error);
    process.exit(1);
  }
}

runMigration();
