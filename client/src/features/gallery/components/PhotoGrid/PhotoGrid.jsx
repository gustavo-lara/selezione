import React from 'react';
import { Heart, Maximize2 } from 'lucide-react';

export function PhotoGrid({ fotos, onSelectPhoto, onToggleSelecao }) {
  if (fotos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'var(--font-mono)', color: 'var(--color-warm-grey)' }}>
        Nenhuma foto disponível nesta galeria ainda.
      </div>
    );
  }

  return (
    <div className="gallery-grid-responsive" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '1.5rem'
    }}>
      {fotos.map((foto, index) => {
        const frameNumber = `#${String(index + 1).padStart(3, '0')}`;
        return (
          <div
            key={foto.id}
            onClick={() => onSelectPhoto(index)}
            className={`contact-frame ${foto.selecionada ? 'selected' : ''}`}
            style={{ cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-grey)',
              marginBottom: '8px'
            }}>
              <span>{frameNumber}</span>
              <button
                onClick={(e) => onToggleSelecao(foto.id, e)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  color: foto.selecionada ? 'var(--color-mark-red)' : 'var(--color-warm-grey)',
                  fontWeight: foto.selecionada ? 600 : 400
                }}
              >
                <Heart size={16} fill={foto.selecionada ? "var(--color-mark-red)" : "none"} color="var(--color-mark-red)" />
                {foto.selecionada ? 'SELECIONADA' : 'MARCAR'}
              </button>
            </div>

            <div style={{ width: '100%', height: '240px', overflow: 'hidden', backgroundColor: '#EFECE6', position: 'relative' }}>
              <img
                src={foto.url_storage}
                alt={`Foto ${frameNumber}`}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  filter: foto.selecionada ? 'contrast(1.05)' : 'grayscale(0.1)'
                }}
              />

              {foto.selecionada && (
                <svg
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 10 15 C 30 5, 85 8, 92 25 C 98 45, 95 80, 80 90 C 65 98, 15 95, 8 75 C 2 55, 12 25, 30 12"
                    fill="none" stroke="var(--color-mark-red)" strokeWidth="3.5" strokeLinecap="round"
                    className="grease-pencil-circle"
                  />
                </svg>
              )}

              <div style={{
                position: 'absolute', bottom: '8px', right: '8px',
                backgroundColor: 'rgba(26, 24, 21, 0.6)', color: '#FFFFFF',
                padding: '4px 6px', borderRadius: '3px', display: 'flex', alignItems: 'center'
              }}>
                <Maximize2 size={12} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
