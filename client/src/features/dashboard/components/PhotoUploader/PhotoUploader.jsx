import React from 'react';
import { Upload } from 'lucide-react';

export function PhotoUploader({ uploading, onFileChange }) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '2px dashed var(--color-warm-grey-light)',
      borderRadius: '4px',
      padding: '1.5rem 1rem',
      textAlign: 'center',
      marginBottom: '1.75rem',
      position: 'relative'
    }}>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onFileChange}
        disabled={uploading}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0,
          cursor: uploading ? 'not-allowed' : 'pointer'
        }}
      />
      <Upload size={36} color={uploading ? 'var(--color-mark-red)' : 'var(--color-ink)'} style={{ marginBottom: '0.75rem' }} />
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.25rem' }}>
        {uploading ? 'Enviando fotos para a Galeria...' : 'Arraste ou clique para enviar fotos deste ensaio'}
      </h3>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-grey)' }}>
        SUPORTA JPEG, PNG, WEBP ATÉ 25MB POR FOTO
      </p>
    </div>
  );
}
