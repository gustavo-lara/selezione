import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'O Upload',
    body: 'Suba o material bruto. Nossa plataforma organiza seu ensaio em uma folha de contato digital limpa, valorizando seu trabalho fotográfico desde o primeiro momento.',
  },
  {
    number: '02',
    title: 'A Apresentação',
    body: 'Envie um link exclusivo e elegante. Sem precisar baixar apps ou criar contas, seu cliente foca apenas no que importa: a qualidade do seu olhar.',
  },
  {
    number: '03',
    title: 'A Seleção',
    body: 'Com marcações simples e diretas, o cliente escolhe as favoritas. Você recebe a lista exata para finalizar a edição, sem planilhas ou mensagens perdidas.',
  },
];

export function WhatIsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      ref={ref}
      id="a-selezione"
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-warm-grey-light)',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        boxShadow: '0 -16px 40px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        
        {/* ── Editorial Quote Section ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 'clamp(5rem, 10vw, 7rem)' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: 60 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '1px', backgroundColor: 'var(--color-mark-red)', marginBottom: '2rem' }}
          />
          
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.65rem', 
              letterSpacing: '0.2em', 
              textTransform: 'uppercase', 
              color: 'var(--color-warm-grey)', 
              marginBottom: '1.5rem' 
            }}
          >
            Para Fotógrafos Profissionais
          </motion.span>
          
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
                color: 'var(--color-ink)',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              Apresente a seleção de fotos com o mesmo rigor estético do seu clique.
            </p>
          </motion.div>
        </div>

        {/* ── Interactive Steps Grid ── */}
        <div
          className="whatis-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 + (i * 0.15), ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                padding: '3rem 2.5rem',
                backgroundColor: hoveredIndex === i ? '#FFFFFF' : 'transparent',
                border: '1px solid',
                borderColor: hoveredIndex === i ? 'rgba(0,0,0,0.04)' : 'transparent',
                boxShadow: hoveredIndex === i ? '0 30px 60px rgba(0,0,0,0.06)' : 'none',
                transform: hoveredIndex === i ? 'translateY(-8px)' : 'translateY(0)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: hoveredIndex === i ? 10 : 1
              }}
            >
              {/* Watermark Gigante ao fundo do card */}
              <div style={{
                position: 'absolute',
                top: '-15%',
                right: '-5%',
                fontFamily: 'var(--font-serif)',
                fontSize: '12rem',
                fontWeight: 700,
                color: 'var(--color-ink)',
                opacity: hoveredIndex === i ? 0.04 : 0.015,
                transition: 'opacity 0.6s ease',
                pointerEvents: 'none',
                lineHeight: 1,
                userSelect: 'none'
              }}>
                {step.number}
              </div>

              {/* Conteúdo do Card */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.65rem', 
                  letterSpacing: '0.14em', 
                  color: 'var(--color-mark-red)', 
                  textTransform: 'uppercase', 
                  marginBottom: '2rem', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {/* Linha vermelha animada no hover */}
                  <motion.div 
                    animate={{ width: hoveredIndex === i ? 24 : 12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ height: '1px', backgroundColor: 'var(--color-mark-red)' }} 
                  />
                  Passo {step.number}
                </div>
                
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-ink)',
                    marginBottom: '1rem',
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                
                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--color-ink-muted)', 
                  lineHeight: 1.7, 
                  maxWidth: '100%',
                  transition: 'color 0.4s ease',
                }}>
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .whatis-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
