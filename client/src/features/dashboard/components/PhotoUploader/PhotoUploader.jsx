import React from 'react';


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
      
      <h3 >
        {uploading ? 'Enviando arquivos para a Galeria...' : 'Arraste ou clique para enviar fotos e vídeos deste ensaio'}
      </h3>
      <p >
        SUPORTA IMAGENS E VÍDEOS DE ALTA RESOLUÇÃO
      </p>
    </div>
  );
}
