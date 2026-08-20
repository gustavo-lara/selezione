import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40% 0px' });

  // A linha cronológica desce conforme o scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: '#7A140F', // Um vermelho luxuoso e profundo
        backgroundImage: 'radial-gradient(ellipse at top, #A11D15 0%, #61100C 100%)',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        color: '#F7F5F0',
      }}
    >
      {/* ── Efeito de Flash de Câmera na Entrada ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: [0, 1, 0, 0, 0.85, 0] } : {}}
        transition={{ duration: 0.6, times: [0, 0.1, 0.2, 0.4, 0.5, 0.6], ease: "easeOut" }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          zIndex: 50,
          pointerEvents: 'none',
          mixBlendMode: 'screen'
        }}
      />

      {/* ── Animações de Fundo (Graças/Orbs) ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '20%', '-10%'],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 60, 40, 0.6) 0%, transparent 70%)',
            filter: 'blur(60px)',
            mixBlendMode: 'screen'
          }}
        />
        <motion.div
          animate={{
            x: ['10%', '-20%', '10%'],
            y: ['20%', '-10%', '20%'],
            scale: [1, 1.4, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '60vw',
            height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 90, 50, 0.45) 0%, transparent 70%)',
            filter: 'blur(70px)',
            mixBlendMode: 'color-dodge'
          }}
        />
      </div>

      {/* Textura de Grain Sutil */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none', mixBlendMode: 'screen', zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-red">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-red)" />
      </svg>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header Centralizado */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'rgba(247,245,240,0.7)',
              fontWeight: 400,
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            A Ordem Cronológica
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 6vw, 4.2rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Três momentos.<br />
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>Zero atrito.</span>
          </motion.h2>
        </div>

        {/* Timeline Vertical */}
        <div style={{ position: 'relative', paddingLeft: 'clamp(2rem, 5vw, 4rem)' }}>
          {/* Fundo da Linha (Cinza escuro transparente) */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(2rem, 5vw, 4rem)',
              top: '2rem',
              bottom: 0,
              width: '1px',
              backgroundColor: 'rgba(247,245,240,0.15)',
            }}
          />
          {/* Linha Ativa Animada (Branca) */}
          <motion.div
            style={{
              position: 'absolute',
              left: 'clamp(2rem, 5vw, 4rem)',
              top: '2rem',
              bottom: 0,
              width: '2px',
              backgroundColor: '#FFFFFF',
              height: lineHeight,
              transformOrigin: 'top',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {steps.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}
          </div>
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
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'relative',
        paddingLeft: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      {/* Indicador Cronológico (Bolinha na linha) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, type: 'spring' }}
        style={{
          position: 'absolute',
          left: '-5px',
          top: '1.2rem',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 0 15px rgba(255,255,255,0.8)',
          zIndex: 2,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Metadados da Etapa */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            {step.number}
          </span>
          <div style={{ width: '20px', height: '1px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.8)',
            }}
          >
            {step.phase}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: step.side === 'Fotógrafo' ? '#1A1815' : '#FFFFFF',
              backgroundColor: step.side === 'Fotógrafo' ? '#F7F5F0' : 'rgba(255,255,255,0.15)',
              padding: '0.15rem 0.6rem',
              borderRadius: '4px',
            }}
          >
            Ação: {step.side}
          </span>
        </div>

        {/* Título */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          {step.title}
        </h3>

        {/* Descrição */}
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(247,245,240,0.7)',
            lineHeight: 1.6,
            maxWidth: '540px',
            marginTop: '0.5rem',
          }}
        >
          {step.description}
        </p>


      </div>
    </motion.div>
  );
}
