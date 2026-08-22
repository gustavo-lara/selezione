import crypto from 'crypto';
import path from 'path';
import fs from 'fs';
import { query } from '../../infra/db/pool.js';
import { supabaseStorage } from '../../infra/storage/supabaseStorage.js';

export const saveUploadedFotos = async ({ galeriaId, files }) => {
  const savedFotos = [];
  const CONCURRENCY_LIMIT = 5;

  // Função helper para processar um único arquivo
  const processFile = async (file, index) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueHash = crypto.randomBytes(4).toString('hex');
    const storageFilename = `${galeriaId}/${Date.now()}-${uniqueHash}${ext}`;

    try {
      // Upload via REST API para o Supabase Storage lendo do disco
      const publicUrl = await supabaseStorage.uploadFile({
        filename: storageFilename,
        filePath: file.path,
        mimeType: file.mimetype
      });

      // Inserção do metadado no banco PostgreSQL
      const result = await query(
        `INSERT INTO fotos (galeria_id, url_storage, thumbnail_url, ordem, tamanho_arquivo_bytes)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, galeria_id, url_storage, thumbnail_url, ordem, tamanho_arquivo_bytes, created_at;`,
        [galeriaId, publicUrl, publicUrl, index, file.size]
      );

      return result.rows[0];
    } finally {
      // Sempre limpar o arquivo temporário do disco
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }
  };

  // Processamento em lotes (paralelismo controlado)
  for (let i = 0; i < files.length; i += CONCURRENCY_LIMIT) {
    const batch = files.slice(i, i + CONCURRENCY_LIMIT);
    const batchPromises = batch.map((file, idx) => processFile(file, i + idx));
    const batchResults = await Promise.all(batchPromises);
    savedFotos.push(...batchResults);
  }

  return savedFotos;
};

export const getFotosByGaleriaId = async (galeriaId) => {
  const result = await query(
    `SELECT 
       f.id,
       f.galeria_id,
       f.url_storage,
       f.thumbnail_url,
       f.ordem,
       f.tamanho_arquivo_bytes,
       f.created_at,
       COALESCE(s.aprovado, false) AS selecionada
     FROM fotos f
     LEFT JOIN selecoes s ON s.foto_id = f.id
     WHERE f.galeria_id = $1
     ORDER BY f.ordem ASC, f.created_at ASC;`,
    [galeriaId]
  );

  return result.rows.map(row => ({
     ...row,
     tamanho_arquivo_bytes: parseInt(row.tamanho_arquivo_bytes, 10)
  }));
};

export const getFotosByGaleriaSlug = async (slug) => {
  const result = await query(
    `SELECT 
       f.id,
       f.galeria_id,
       f.url_storage,
       f.thumbnail_url,
       f.ordem,
       f.created_at,
       COALESCE(s.aprovado, false) AS selecionada
     FROM fotos f
     JOIN galerias g ON g.id = f.galeria_id
     LEFT JOIN selecoes s ON s.foto_id = f.id
     WHERE g.link_publico = $1
     ORDER BY f.ordem ASC, f.created_at ASC;`,
    [slug]
  );

  return result.rows;
};

export const deleteFotoById = async (fotoId, fotografoId) => {
  // Verificar se a foto existe e se pertence a uma galeria do fotógrafo logado
  const findResult = await query(
    `SELECT f.id, f.url_storage, f.galeria_id
     FROM fotos f
     JOIN galerias g ON g.id = f.galeria_id
     WHERE f.id = $1 AND g.fotografo_id = $2;`,
    [fotoId, fotografoId]
  );

  const foto = findResult.rows[0];
  if (!foto) {
    return null;
  }

  // Remover o registro do banco de dados PostgreSQL
  await query('DELETE FROM fotos WHERE id = $1;', [fotoId]);

  // Tentar extrair o nome do arquivo do storage e deletar do bucket
  try {
    const urlParts = foto.url_storage.split('/storage/v1/object/public/galerias/');
    if (urlParts.length === 2) {
      const storageFilename = urlParts[1];
      await supabaseStorage.deleteFile(storageFilename);
    }
  } catch (err) {
    console.warn(`Aviso: Foto ${fotoId} foi removida do banco, mas falhou ao deletar do storage:`, err.message);
  }

  return foto;
};

export const deleteFotosFromStorageByGaleriaId = async (galeriaId) => {
  const fotos = await getFotosByGaleriaId(galeriaId);
  
  if (fotos && fotos.length > 0) {
    console.log(`Iniciando exclusão de ${fotos.length} fotos da galeria ${galeriaId} no storage...`);
    
    const DELETE_CONCURRENCY = 10;
    
    // Removemos em lotes paralelos para não gerar timeout no frontend e não sobrecarregar a API
    for (let i = 0; i < fotos.length; i += DELETE_CONCURRENCY) {
      const batch = fotos.slice(i, i + DELETE_CONCURRENCY);
      
      const batchPromises = batch.map(async (foto) => {
        try {
          const urlParts = foto.url_storage.split('/storage/v1/object/public/galerias/');
          if (urlParts.length === 2) {
            const storageFilename = urlParts[1];
            await supabaseStorage.deleteFile(storageFilename);
          }
        } catch (err) {
          console.warn(`Aviso: Falha ao deletar foto ${foto.id} do storage:`, err.message);
        }
      });
      
      await Promise.all(batchPromises);
    }
  }
};
