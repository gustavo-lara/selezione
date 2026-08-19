import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'A galeria',
    body: 'Você cria o ensaio, faz o upload. A interface organiza tudo em molduras numeradas — como uma folha de contato analógica.',
  },
  {
    number: '02',
    title: 'O convite',
    body: 'Um link exclusivo é gerado. O cliente abre no celular — sem criar conta, sem instalar nada. Imersão imediata.',
  },
  {
    number: '03',
    title: 'A decisão',
    body: 'O cliente marca. Você recebe a lista numerada das aprovadas, pronta para a edição final.',
  },
];

export function WhatIsSection() {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      id="o-studio"
      style={{
        /* z-index 2 garante que desliza por cima do hero sticky */
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid var(--color-warm-grey-light)',
        padding: 'clamp(5rem, 9vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        /* Sombra no topo — efeito de "página sendo levantada" */
        boxShadow: '0 -12px 48px rgba(26, 24, 21, 0.18)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Pull-quote editorial — ancora visual pós-hero */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(4rem, 7vw, 6rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', maxWidth: '780px' }}>
            {/* Linha vermelha vertical */}
            <div style={{ width: '2px', height: '100%', minHeight: '80px', backgroundColor: 'var(--color-mark-red)', flexShrink: 0, opacity: 0.7 }} />
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-warm-grey)', display: 'block', marginBottom: '1rem' }}>
                O Studio
              </span>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.4rem)',
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-ink)',
                }}
              >
                Onde antes havia ruído e dispersão,<br />
                entregamos silêncio e foco.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Três momentos — linha horizontal minimalista */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
          }}
          className="whatis-grid"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                borderLeft: i > 0 ? '1px solid var(--color-warm-grey-light)' : 'none',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.14em', color: 'var(--color-mark-red)', textTransform: 'uppercase', marginBottom: '1.25rem', fontWeight: 600 }}>
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: 'var(--color-ink)',
                  marginBottom: '0.85rem',
                  lineHeight: 1.1,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)', lineHeight: 1.7, maxWidth: '280px' }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .whatis-grid {
            grid-template-columns: 1fr !important;
          }
          .whatis-grid > div {
            border-left: none !important;
            border-top: 1px solid var(--color-warm-grey-light);
          }
          .whatis-grid > div:first-child {
            border-top: none !important;
          }
        }
      `}</style>
    </section>
  );
}
