import dotenv from 'dotenv';
import fs from 'fs';
import { Readable } from 'stream';

dotenv.config();

class SupabaseStorageClient {
  constructor() {
    this.storageUrl = process.env.SUPABASE_STORAGE_URL;
    this.bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'galerias';
    this.serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  getBaseUrl() {
    if (!this.storageUrl) {
      throw new Error('SUPABASE_STORAGE_URL não está configurado no .env');
    }
    const cleanUrl = this.storageUrl.replace(/\/$/, '');
    return cleanUrl.endsWith('/storage/v1') ? cleanUrl : `${cleanUrl}/storage/v1`;
  }

  async uploadFile({ filename, buffer, filePath, mimeType }) {
    const baseUrl = this.getBaseUrl();
    const uploadUrl = `${baseUrl}/object/${this.bucketName}/${filename}`;

    let bodyData = buffer;
    let headers = {
      'Authorization': `Bearer ${this.serviceKey}`,
      'apikey': this.serviceKey,
      'Content-Type': mimeType || 'image/jpeg',
      'x-upsert': 'true' // Sobrescreve se já existir
    };

    let fetchOptions = {
      method: 'POST',
      headers,
      body: bodyData
    };

    if (filePath) {
      // Lê o arquivo do disco para um Buffer local no exato momento do envio.
      // O uso de Web Streams nativo do Node 18+ com o Cloudflare/Supabase é notório por gerar 'UND_ERR_SOCKET / other side closed'.
      // Como o Multer já salvou no disco, carregar apenas os X arquivos simultâneos (ex: 5) consome pouquíssima RAM.
      bodyData = await fs.promises.readFile(filePath);
      fetchOptions.body = bodyData;
    }

    const MAX_RETRIES = 3;
    let attempt = 0;
    
    while (attempt < MAX_RETRIES) {
      try {
        const response = await fetch(uploadUrl, fetchOptions);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        // Retorna a URL pública consumível da imagem
        return `${baseUrl}/object/public/${this.bucketName}/${filename}`;
      } catch (err) {
        attempt++;
        console.warn(`[Supabase Storage] Tentativa ${attempt}/${MAX_RETRIES} falhou para ${filename}: ${err.message}`);
        
        if (attempt >= MAX_RETRIES) {
          throw new Error(`Falha no upload para Supabase após ${MAX_RETRIES} tentativas: ${err.message}`);
        }
        
        // Espera um tempinho antes de tentar de novo (Backoff)
        await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
      }
    }
  }

  async deleteFile(filename) {
    const baseUrl = this.getBaseUrl();
    const deleteUrl = `${baseUrl}/object/${this.bucketName}/${filename}`;

    const response = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.serviceKey}`,
        'apikey': this.serviceKey
      }
    });

    if (!response.ok && response.status !== 404) {
      const errorText = await response.text();
      throw new Error(`Falha ao excluir arquivo do Supabase Storage (HTTP ${response.status}): ${errorText}`);
    }
  }
}

export const supabaseStorage = new SupabaseStorageClient();
