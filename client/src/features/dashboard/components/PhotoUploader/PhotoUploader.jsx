import React from 'react';
import { Upload } from 'lucide-react';

export function PhotoUploader({ uploading, onFileChange }) {
  return (
    <div >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onFileChange}
        disabled={uploading}
        
      />
      <Upload size={36} color={uploading ? 'var(--color-mark-red)' : 'var(--color-ink)'}  />
      <h3 >
        {uploading ? 'Enviando fotos para a Galeria...' : 'Arraste ou clique para enviar fotos deste ensaio'}
      </h3>
      <p >
        SUPORTA JPEG, PNG, WEBP ATÉ 25MB POR FOTO
      </p>
    </div>
  );
}
