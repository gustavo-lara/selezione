import React from 'react';
import { Upload } from 'lucide-react';

export function PhotoUploader({ uploading, onFileChange }) {
  return (
    <div >
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={onFileChange}
        disabled={uploading}
        
      />
      <Upload size={36} color={uploading ? 'var(--color-mark-red)' : 'var(--color-ink)'}  />
      <h3 >
        {uploading ? 'Enviando arquivos para a Galeria...' : 'Arraste ou clique para enviar fotos e vídeos deste ensaio'}
      </h3>
      <p >
        SUPORTA IMAGENS E VÍDEOS DE ALTA RESOLUÇÃO
      </p>
    </div>
  );
}
