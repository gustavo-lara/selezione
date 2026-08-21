import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    phase: 'A Preparação',
    title: 'Você cria a galeria',
    description:
      'No seu painel, você cria um novo ensaio, faz o upload das fotos e a galeria já está pronta. O sistema organiza tudo automaticamente em molduras numeradas, no estilo de uma folha de contato analógica.',
    side: 'Fotógrafo',
  },
  {
    number: '02',
    phase: 'O Convite',
    title: 'O cliente acessa sem cadastro',
    description:
      'Um link exclusivo é gerado para o ensaio. Você envia pelo WhatsApp ou e-mail. O cliente clica e cai diretamente na galeria — sem precisar criar conta, instalar app ou memorizar senha.',
    side: 'Cliente',
  },
  {
    number: '03',
    phase: 'A Decisão',
    title: 'Você recebe a lista exata',
    description:
      'O cliente marca as fotos que quer com um clique. Você acompanha em tempo real no painel e recebe a lista numerada, pronta para a edição final.',
    side: 'Fotógrafo',
  },
];

export function HowItWorksSection() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: '#7A140F',
        backgroundImage: 'radial-gradient(ellipse at top, #A11D15 0%, #61100C 100%)',
        padding: 'clamp(4rem, 10vw, 12rem) clamp(1rem, 5vw, 4rem)',
        position: 'relative',
        color: '#F7F5F0',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .hiw-sticky-col {
          position: relative;
          margin-bottom: 2rem;
          z-index: 10;
        }
        .hiw-scroll-col {
          display: flex;
          flex-direction: column;
          gap: 6rem;
          padding-top: 0;
        }
        @media (min-width: 768px) {
          .hiw-sticky-col {
            position: sticky;
            top: 20vh;
            margin-bottom: 0;
          }
          .hiw-scroll-col {
            gap: 8rem;
            padding-top: 10vh;
          }
        }
      `}</style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
        gap: 'clamp(2rem, 8vw, 8rem)',
        alignItems: 'start'
      }}>
        
        {/* Sticky Left Column */}
        <motion.div 
          className="hiw-sticky-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20%' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.1 }
            }
          }}
        >
          <motion.span 
            variants={{
              hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontStyle: 'italic', 
              fontSize: '1.2rem', 
              color: 'var(--color-film-beige)', 
              display: 'block', 
              marginBottom: '1rem' 
            }}
          >
            A Ordem Cronológica
          </motion.span>
          <motion.h2 
            variants={{
              hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
              visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 8vw, 4.2rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '2rem'
            }}
          >
            Três passos.<br />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>Zero atrito.</span>
          </motion.h2>
          <motion.p 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
            }}
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              maxWidth: '400px'
            }}
          >
            Uma experiência desenhada para remover qualquer barreira entre a sua arte e o cliente final.
          </motion.p>
        </motion.div>

        {/* Scrolling Right Column */}
        <div className="hiw-scroll-col">
          {steps.map((step, i) => (
            <StepItem key={step.number} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function StepItem({ step, index }) {
  const itemRef = useRef(null);
  const inView = useInView(itemRef, { once: true, margin: '-20%' });

  return (
    <motion.div
      ref={itemRef}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Background Watermark Number */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -50, scale: 0.9 },
          visible: { opacity: 0.03, x: 0, scale: 1, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
        }}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          fontSize: 'clamp(10rem, 20vw, 16rem)',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontWeight: 400,
          color: '#FFFFFF',
          lineHeight: 0.8,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {step.number}
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
        >
          <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--color-film-beige)' }}>
            {step.number}
          </span>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            {step.phase}
          </span>
        </motion.div>

        <motion.h3 
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 8vw, 2.6rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}
        >
          {step.title}
        </motion.h3>

        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{
            fontSize: '1.1rem',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            maxWidth: '460px'
          }}
        >
          {step.description}
        </motion.p>

        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
          }}
          style={{ marginTop: '2.5rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: step.side === 'Fotógrafo' ? 'var(--color-ink)' : '#FFFFFF',
            backgroundColor: step.side === 'Fotógrafo' ? 'var(--color-film-beige)' : 'rgba(255,255,255,0.08)',
            padding: '0.5rem 1.2rem',
            borderRadius: '100px',
            border: step.side === 'Cliente' ? '1px solid rgba(255,255,255,0.15)' : 'none'
          }}>
            Ação: {step.side}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
