import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const BG_PHOTO = 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=1920&q=90'; // A moody gallery/studio space

export function NotFoundPage({ onBackToLanding }) {
  const containerRef = useRef(null);

  /* ── Interatividade do Mouse (Parallax Suave) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 80 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 80 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        isolation: 'isolate',
        backgroundColor: '#0a0706',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── 1. Foto de Fundo Desfocada ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-5%',
          zIndex: 0,
          scale: 1.05,
          x: useTransform(smoothX, [-1, 1], ['-1%', '1%']),
          y: useTransform(smoothY, [-1, 1], ['-1%', '1%']),
        }}
      >
        <motion.div
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 0.25, filter: 'blur(8px)' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${BG_PHOTO})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(0.8)',
          }}
        />
      </motion.div>

      {/* ── 2. Overlays de Profundidade ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10,7,6,0.3) 0%, rgba(10,7,6,0.95) 100%)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(108deg, rgba(100, 10, 6, 0.5) 0%, transparent 60%)',
          zIndex: 2,
        }}
      />

      {/* ── 3. Grain Analógico (mesmo da Hero) ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', zIndex: 3, mixBlendMode: 'screen' }} xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-404">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-404)" />
      </svg>

      {/* ── 4. Conteúdo Central ── */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        {/* Label Mono */}
        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
            }}
          >
            Erro 404
          </motion.div>
        </div>

        {/* Título Principal com Gradiente */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(5rem, 15vw, 12rem)',
              fontWeight: 600,
              lineHeight: 0.86,
              letterSpacing: '-0.04em',
              fontStyle: 'italic',
              background: 'linear-gradient(90deg, #FFFFFF 20%, rgba(168, 30, 18, 0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            Vazio.
          </motion.h1>
        </div>

        {/* Subtítulo Serifado */}
        <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
          <motion.p
            initial={{ y: '108%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              fontWeight: 400,
              color: 'rgba(247,245,240,0.5)',
              margin: 0,
              maxWidth: '500px',
              lineHeight: 1.2,
            }}
          >
            A galeria ou ensaio que você procura não existe ou foi removida.
          </motion.p>
        </div>

        {/* Botão de Retorno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: '4rem' }}
        >
          <motion.button
            onClick={onBackToLanding || (() => window.location.href = '/')}
            whileHover={{ opacity: 0.7 }}
            whileTap={{ scale: 0.97 }}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              padding: '0.5rem 0',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '0',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              letterSpacing: '0.02em',
            }}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retornar ao Início
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
