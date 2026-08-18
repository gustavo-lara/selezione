import React from 'react';
import { Trash2 } from 'lucide-react';

export function PhotoGrid({ fotos, activeTab, onDeleteFoto }) {
  if (fotos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-warm-grey)', fontFamily: 'var(--font-mono)' }}>
        {activeTab === 'selecionadas'
          ? 'O cliente ainda não aprovou fotos nesta galeria.'
          : 'Nenhuma foto nesta galeria. Faça o upload acima.'}
      </div>
    );
  }

  return (
    <div className="gallery-grid-responsive" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1.25rem'
    }}>
      {fotos.map((foto, index) => (
        <div key={foto.id} className={`contact-frame ${foto.selecionada ? 'selected' : ''}`}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-warm-grey)',
            marginBottom: '6px'
          }}>
            <span>#{String(index + 1).padStart(3, '0')}</span>
            {foto.selecionada && (
              <span style={{ color: 'var(--color-mark-red)', fontWeight: 700 }}>✓ APROVADA</span>
            )}
          </div>

          <div style={{ width: '100%', height: '180px', overflow: 'hidden', backgroundColor: '#EFECE6', position: 'relative' }}>
            <img
              src={foto.url_storage}
              alt="Foto do ensaio"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />

            <button
              onClick={(e) => onDeleteFoto(foto.id, e)}
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                backgroundColor: 'rgba(26, 24, 21, 0.8)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '3px',
                padding: '4px 6px',
                cursor: 'pointer'
              }}
              title="Excluir Foto"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
