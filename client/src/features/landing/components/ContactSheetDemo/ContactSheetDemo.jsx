import React, { useState, useEffect, useRef } from 'react';
import { Send, MousePointer } from 'lucide-react';

const samplePhotos = [
  { id: 1, tag: '#001', title: 'Sombra e Luz', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  { id: 2, tag: '#002', title: 'Editorial Urbano', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' },
  { id: 3, tag: '#003', title: 'Cerimônia Natural', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
  { id: 4, tag: '#004', title: 'Studio B&W', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
];

export function ContactSheetDemo() {
  const [selectedFrames, setSelectedFrames] = useState([1, 3]);
  const [showToast, setShowToast] = useState(false);
  const [toastSent, setToastSent] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleFrame = (id) => {
    if (selectedFrames.includes(id)) {
      setSelectedFrames(selectedFrames.filter((item) => item !== id));
    } else {
      setSelectedFrames([...selectedFrames, id]);
    }
  };

  const handleSend = () => {
    if (selectedFrames.length === 0) return;
    setToastSent(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-paper-muted)',
        borderTop: '1px solid var(--color-warm-grey-light)',
        borderBottom: '1px solid var(--color-warm-grey-light)',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header contextual */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-warm-grey)',
              fontWeight: 600,
            }}
          >
            Demonstração Interativa
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 600,
              marginTop: '0.5rem',
              color: 'var(--color-ink)',
              lineHeight: 1.15,
            }}
          >
            É assim que o cliente experimenta.
          </h2>
          <p
            style={{
              marginTop: '0.85rem',
              color: 'var(--color-warm-grey)',
              fontSize: '0.95rem',
              maxWidth: '480px',
              margin: '0.85rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Clique nas fotos abaixo para marcar ou desmarcar. Quando terminar, clique em "Enviar Seleção".
          </p>
        </div>

        {/* Demo card */}
        <div
          className="reveal"
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-ink)',
            borderRadius: '6px',
            padding: '1.75rem 1.5rem',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
          }}
        >
          {/* Cabeçalho da galeria */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
              borderBottom: '1px solid var(--color-warm-grey-light)',
              paddingBottom: '1.1rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-mark-red)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                ● Galeria Ativa
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  marginTop: '0.2rem',
                  color: 'var(--color-ink)',
                }}
              >
                Folha de Contato #35MM — Ensaio Editorial
              </h3>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--color-ink)',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-paper-muted)',
                  border: '1px solid var(--color-warm-grey-light)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '4px',
                }}
              >
                {selectedFrames.length}/{samplePhotos.length} SELECIONADAS
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-warm-grey)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                <MousePointer size={12} />
                Clique para marcar
              </div>
            </div>
          </div>

          {/* Grid de fotos */}
          <div
            className="gallery-grid-responsive"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {samplePhotos.map((photo) => {
              const isSelected = selectedFrames.includes(photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => toggleFrame(photo.id)}
                  className={`contact-frame ${isSelected ? 'selected' : ''}`}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  title={isSelected ? 'Clique para desmarcar' : 'Clique para marcar'}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--color-warm-grey)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    <span>{photo.tag}</span>
                    <span
                      style={{
                        color: isSelected ? 'var(--color-mark-red)' : 'var(--color-warm-grey)',
                        fontWeight: isSelected ? 700 : 400,
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {isSelected ? '✓ APROVADA' : 'NÃO MARCADA'}
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '260px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-paper-muted)',
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: isSelected ? 'contrast(1.06)' : 'grayscale(0.2)',
                        transition: 'filter 0.3s ease',
                      }}
                    />

                    {/* Overlay translúcido ao hover */}
                    {!isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(26, 24, 21, 0)',
                          transition: 'background-color 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        className="hover-overlay"
                      />
                    )}

                    {/* Círculo de caneta de cera vermelha */}
                    {isSelected && (
                      <svg
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                        }}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
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

                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--color-ink)',
                    }}
                  >
                    {photo.title}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rodapé com botão de envio */}
          <div
            style={{
              marginTop: '1.75rem',
              borderTop: '1px solid var(--color-warm-grey-light)',
              paddingTop: '1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--color-warm-grey)',
                letterSpacing: '0.06em',
              }}
            >
              {selectedFrames.length === 0
                ? 'NENHUMA FOTO MARCADA AINDA'
                : `${selectedFrames.length} FOTO${selectedFrames.length > 1 ? 'S' : ''} MARCADA${selectedFrames.length > 1 ? 'S' : ''} PARA APROVAÇÃO`}
            </div>

            <button
              className={`btn-primary ${selectedFrames.length === 0 ? '' : ''}`}
              onClick={handleSend}
              style={{
                opacity: selectedFrames.length === 0 ? 0.4 : 1,
                cursor: selectedFrames.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <Send size={15} />
              Enviar Seleção
            </button>
          </div>
        </div>

        {/* Label de contexto */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-warm-grey)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Esta é a tela que o seu cliente vê ao acessar o link
        </div>
      </div>

      {/* Toast de confirmação */}
      {showToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(26, 24, 21, 0.25)',
            zIndex: 999,
            animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            borderLeft: '3px solid var(--color-mark-red)',
            maxWidth: '320px',
          }}
        >
          <div style={{ marginBottom: '0.3rem' }}>✓ Seleção enviada com sucesso!</div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(247, 245, 240, 0.6)',
              fontWeight: 400,
              letterSpacing: '0.04em',
            }}
          >
            {selectedFrames.length} FOTO{selectedFrames.length > 1 ? 'S' : ''} APROVADA{selectedFrames.length > 1 ? 'S' : ''} · O FOTÓGRAFO FOI NOTIFICADO
          </div>
        </div>
      )}
    </section>
  );
}
