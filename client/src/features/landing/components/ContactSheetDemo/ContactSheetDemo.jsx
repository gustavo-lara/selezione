import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MousePointer2 } from 'lucide-react';

const samplePhotos = [
  { id: 1, tag: '001', title: 'Retrato Clássico', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
  { id: 2, tag: '002', title: 'Editorial Urbano', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80' },
  { id: 3, tag: '003', title: 'Luz Natural', url: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&w=600&q=80' },
  { id: 4, tag: '004', title: 'Selezione B&W', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80' },
];

export function ContactSheetDemo() {
  const [selectedFrames, setSelectedFrames] = useState([1, 3]);
  const [showToast, setShowToast] = useState(false);
  const ref = useRef(null);

  const toggleFrame = (id) => {
    if (selectedFrames.includes(id)) {
      setSelectedFrames(selectedFrames.filter((item) => item !== id));
    } else {
      setSelectedFrames([...selectedFrames, id]);
    }
  };

  const handleSend = () => {
    if (selectedFrames.length === 0) return;
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Animação em cascata para as fotos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#F3F1EC', // Fundo bem claro, quase papel
        padding: 'clamp(6rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        marginTop: '-3rem',
        borderTopLeftRadius: '3rem',
        borderTopRightRadius: '3rem',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 -20px 50px rgba(26, 24, 21, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* ── Header Contextual ── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--color-warm-grey)',
              marginBottom: '1rem',
              display: 'block'
            }}
          >
            Demonstração Interativa
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 400,
              color: 'var(--color-ink)',
              lineHeight: 1.15,
            }}
          >
            É assim que o cliente experimenta.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              marginTop: '1.2rem',
              color: 'var(--color-ink-muted)',
              fontSize: '1.05rem',
              maxWidth: '480px',
              margin: '1.2rem auto 0',
              lineHeight: 1.6,
            }}
          >
            Clique nas fotos abaixo para aprová-las. Simule a escolha do seu cliente e finalize a seleção.
          </motion.p>
        </div>

        {/* ── Área da Galeria (Folha de Contato) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '4px',
            padding: 'clamp(2rem, 5vw, 3rem)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.06)',
            position: 'relative',
          }}
        >
          {/* Cabeçalho da folha de contato */}
          <div
            className="contact-sheet-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid var(--color-warm-grey-light)',
              paddingBottom: '1.5rem',
              marginBottom: '2.5rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: 'var(--color-mark-red)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-mark-red)', borderRadius: '50%' }} />
                Galeria Ativa
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  marginTop: '0.4rem',
                  color: 'var(--color-ink)',
                  fontWeight: 600,
                }}
              >
                Folha de Contato #35MM
              </h3>
            </div>
            <div
              className="contact-sheet-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                  color: 'var(--color-warm-grey)',
                }}
              >
                <MousePointer2 size={16} strokeWidth={1.5} />
                Clique para marcar
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-ink)',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-paper-muted)',
                  border: '1px solid var(--color-warm-grey-light)',
                  padding: '0.5rem 1rem',
                  borderRadius: '100px',
                  letterSpacing: '0.05em'
                }}
              >
                {selectedFrames.length}/{samplePhotos.length} SELECIONADAS
              </div>
            </div>
          </div>

          {/* Grid de fotos com Framer Motion Stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {samplePhotos.map((photo) => {
              const isSelected = selectedFrames.includes(photo.id);
              return (
                <motion.div
                  variants={itemVariants}
                  key={photo.id}
                  onClick={() => toggleFrame(photo.id)}
                  whileHover={{ y: -4 }}
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-warm-grey)', letterSpacing: '0.1em' }}>
                      Nº {photo.tag}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '0.95rem',
                        color: isSelected ? 'var(--color-mark-red)' : 'transparent',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      Aprovada
                    </span>
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '280px',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-paper-muted)',
                      border: isSelected ? '1px solid var(--color-mark-red)' : '1px solid transparent',
                      transition: 'border 0.3s ease',
                    }}
                  >
                    <motion.img
                      src={photo.url}
                      alt={photo.title}
                      animate={{ 
                        scale: isSelected ? 1.05 : 1,
                        filter: isSelected ? 'contrast(1.05) brightness(1)' : 'contrast(1) brightness(0.85) grayscale(0.15)'
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />

                    {/* Círculo animado da caneta vermelha */}
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
                        <motion.path
                          d="M 10 15 C 30 5, 85 8, 92 25 C 98 45, 95 80, 80 90 C 65 98, 15 95, 8 75 C 2 55, 12 25, 30 12"
                          fill="none"
                          stroke="var(--color-mark-red)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                      </svg>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ── Rodapé da Galeria ── */}
          <div
            style={{
              marginTop: '3rem',
              borderTop: '1px solid var(--color-warm-grey-light)',
              paddingTop: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--color-warm-grey)',
              }}
            >
              {selectedFrames.length === 0
                ? 'Nenhuma foto aprovada ainda.'
                : `${selectedFrames.length} foto${selectedFrames.length > 1 ? 's' : ''} separada${selectedFrames.length > 1 ? 's' : ''}.`}
            </div>

            <motion.button
              whileHover={selectedFrames.length > 0 ? { scale: 1.02, backgroundColor: '#A11D15' } : {}}
              whileTap={selectedFrames.length > 0 ? { scale: 0.98 } : {}}
              onClick={handleSend}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                backgroundColor: selectedFrames.length === 0 ? 'var(--color-warm-grey-light)' : 'var(--color-mark-red)',
                color: selectedFrames.length === 0 ? 'var(--color-warm-grey)' : '#FFFFFF',
                border: 'none',
                padding: '0.8rem 1.8rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                cursor: selectedFrames.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
            >
              <Send size={16} strokeWidth={2} />
              Finalizar e Enviar
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ── Toast de Confirmação ── */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            padding: '1.25rem 1.75rem',
            borderRadius: '4px',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
            zIndex: 999,
            borderLeft: '4px solid var(--color-mark-red)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}
        >
          <div style={{ fontWeight: 600 }}>Seleção Enviada!</div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(247, 245, 240, 0.6)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            O fotógrafo já recebeu a notificação.
          </div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .contact-sheet-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.25rem !important;
          }
          .contact-sheet-actions {
            width: 100%;
            justify-content: space-between !important;
            gap: 0.5rem !important;
          }
          .contact-sheet-actions > div:first-child {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </section>
  );
}
