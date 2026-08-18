import React, { useState } from 'react';

const samplePhotos = [
  { id: 1, tag: '#001', title: 'Ensaio Retrato - Sombra e Luz', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { id: 2, tag: '#002', title: 'Editorial Urbano 35mm', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { id: 3, tag: '#003', title: 'Casamento Natural - Cerimônia', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
  { id: 4, tag: '#004', title: 'Studio Black & White', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' }
];

export function ContactSheetDemo() {
  const [selectedFrames, setSelectedFrames] = useState([1, 3]);

  const toggleFrame = (id) => {
    if (selectedFrames.includes(id)) {
      setSelectedFrames(selectedFrames.filter(item => item !== id));
    } else {
      setSelectedFrames([...selectedFrames, id]);
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid var(--color-ink)',
      borderRadius: '4px',
      padding: '1.5rem 1rem',
      boxShadow: 'var(--shadow-card)',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        borderBottom: '1px solid var(--color-warm-grey-light)',
        paddingBottom: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div>
          <span className="frame-tag" style={{ color: 'var(--color-mark-red)', fontWeight: 700 }}>
            ● DEMONSTRAÇÃO INTERATIVA
          </span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginTop: '0.2rem' }}>
            Folha de Contato #35MM — Ensaio Editorial
          </h3>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-grey)' }}>
          CLIQUE NAS FOTOS PARA MARCAR
        </div>
      </div>

      {/* Grid estilo Contact Sheet de Película */}
      <div className="gallery-grid-responsive" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem'
      }}>
        {samplePhotos.map((photo) => {
          const isSelected = selectedFrames.includes(photo.id);
          return (
            <div
              key={photo.id}
              onClick={() => toggleFrame(photo.id)}
              className={`contact-frame ${isSelected ? 'selected' : ''}`}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-warm-grey)'
              }}>
                <span>{photo.tag}</span>
                <span style={{ color: isSelected ? 'var(--color-mark-red)' : 'inherit', fontWeight: isSelected ? 600 : 400 }}>
                  {isSelected ? '✓ SELECIONADA' : 'NÃO MARCADA'}
                </span>
              </div>

              <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden', backgroundColor: '#EFECE6' }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: isSelected ? 'contrast(1.05)' : 'grayscale(0.15)',
                    transition: 'filter 0.3s'
                  }}
                />

                {/* Elemento de Assinatura: Traço de Caneta Vermelha de Contato */}
                {isSelected && (
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {/* Círculo oval orgânico simulando marcação manual com caneta vermelha */}
                    <path
                      d="M 10 15 C 30 5, 85 8, 92 25 C 98 45, 95 80, 80 90 C 65 98, 15 95, 8 75 C 2 55, 12 25, 30 12"
                      fill="none"
                      stroke="var(--color-mark-red)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="grease-pencil-circle"
                    />
                  </svg>
                )}
              </div>

              <div style={{ marginTop: '10px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-ink)' }}>
                {photo.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
