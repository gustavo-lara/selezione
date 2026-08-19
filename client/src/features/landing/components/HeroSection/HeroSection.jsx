import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const BG_PHOTO =
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1920&q=90';

const miniPhotos = [
  { id: 1, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', selected: true,  tag: '#001' },
  { id: 2, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', selected: false, tag: '#002' },
  { id: 3, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80', selected: true,  tag: '#003' },
  { id: 4, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', selected: false, tag: '#004' },
];

export function HeroSection({ onRegister }) {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  /* Foto sobe levemente — parallax sutil */
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%',  '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1,     1.05]);

  /* Conteúdo desaparece conforme rola */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.45], ['0%', '-5%']);

  /* ── Interatividade do Mouse (Parallax) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1; // -1 to 1
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
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* ── 1. Foto (parallax) ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-12%',
          y: bgY,
          scale: bgScale,
          zIndex: 0,
        }}
      >
        <motion.div
          initial={{ scale: 1.15, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${BG_PHOTO})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 52%',
          }}
        />
      </motion.div>

      {/* ── 2. Overlay escuro — mais leve na base para o rosto aparecer ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,7,6,0.72) 0%, rgba(10,7,6,0.62) 50%, rgba(10,7,6,0.28) 80%, rgba(10,7,6,0.1) 100%)',
          zIndex: 1,
        }}
      />

      {/* ── 3. Véu vermelho lateral — profundidade ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(108deg, rgba(100, 10, 6, 0.72) 0%, rgba(90, 10, 6, 0.28) 38%, transparent 60%)',
          zIndex: 2,
        }}
      />

      {/* ── 4. Grain analógico ── */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', zIndex: 3, mixBlendMode: 'screen' }} xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" />
      </svg>

      {/* ── 5. Vinheta perimetral ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 88% 80% at 48% 48%, transparent 38%, rgba(6, 4, 3, 0.72) 100%)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Conteúdo */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 6,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(5rem, 9vh, 7rem)',
          paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
          paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
          paddingBottom: 'clamp(8rem, 14vw, 12rem)',
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Grid: texto (esquerda) + card (direita) */}
        <div className="hero-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(2rem, 5vw, 5rem)', alignItems: 'flex-end' }}>

          {/* ── TIPOGRAFIA ── */}
          <div>
            {/* Linha decorativa + label mono mínimo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}
            >
              
            </motion.div>

            {/* Título linha 1 */}
            <div style={{ overflow: 'hidden' }}>
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(4rem, 12vw, 10.5rem)',
                  fontWeight: 600,
                  lineHeight: 0.86,
                  letterSpacing: '-0.04em',
                  color: '#FFFFFF',
                  display: 'block',
                }}
              >
                Seus
              </motion.h1>
            </div>

            {/* Título linha 2 — itálica deslocada com gradiente */}
            <div style={{ overflow: 'hidden', paddingLeft: 'clamp(1.2rem, 3.5vw, 3rem)' }}>
              <motion.h1
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(4rem, 12vw, 10.5rem)',
                  fontWeight: 600,
                  lineHeight: 0.86,
                  letterSpacing: '-0.04em',
                  fontStyle: 'italic',
                  background: 'linear-gradient(90deg, #FFFFFF 20%, rgba(168, 30, 18, 0.85) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                ensaios.
              </motion.h1>
            </div>

            {/* Subtítulo em itálico elegante */}
            <div style={{ overflow: 'hidden', marginTop: '0.2em' }}>
              <motion.p
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(247,245,240,0.38)',
                  display: 'block',
                }}
              >
                A precisão da sua entrega.
              </motion.p>
            </div>

            {/* Descrição + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: 'clamp(2rem, 4vw, 3.5rem)', display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* Frase única elegante */}
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)', color: 'rgba(247,245,240,0.6)', lineHeight: 1.5, maxWidth: '380px', letterSpacing: '0.01em' }}>
                Eleve a experiência da sua entrega. Uma galeria pensada para o mais alto padrão fotográfico.
              </p>

              <div>
                <motion.button
                  onClick={onRegister}
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
                  Criar galeria
                  <ArrowRight size={16} strokeWidth={1.5} />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ── LUXURY FLOATING ELEMENT ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              alignSelf: 'center', 
              position: 'relative', 
              width: 'clamp(220px, 28vw, 400px)', 
              height: 'clamp(290px, 35vw, 500px)', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              perspective: 1000,
              rotateX: useTransform(smoothY, [-1, 1], [12, -12]),
              rotateY: useTransform(smoothX, [-1, 1], [-12, 12])
            }}
            className="hero-luxury-visual"
          >
            {/* Foto de Fundo */}
            <motion.div
              drag
              dragConstraints={{ top: -30, left: -30, right: 30, bottom: 30 }}
              dragElastic={0.1}
              initial={{ opacity: 0, y: 40, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              whileHover={{ rotate: -8, scale: 1.02 }}
              whileDrag={{ scale: 1.05, cursor: 'grabbing', rotate: -2, zIndex: 10 }}
              transition={{ duration: 1.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: '5%',
                left: '0%',
                width: '75%',
                height: '80%',
                backgroundImage: `url(${miniPhotos[1].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                filter: 'grayscale(0.6) brightness(0.7)',
                zIndex: 1,
                cursor: 'grab'
              }}
            />

            {/* Foto da Frente */}
            <motion.div
              drag
              dragConstraints={{ top: -30, left: -30, right: 30, bottom: 30 }}
              dragElastic={0.1}
              initial={{ opacity: 0, y: 50, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              whileDrag={{ scale: 1.06, cursor: 'grabbing', rotate: 0, zIndex: 10 }}
              transition={{ duration: 1.6, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                bottom: '5%',
                right: '0%',
                width: '80%',
                height: '85%',
                backgroundImage: `url(${miniPhotos[0].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.7)',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                cursor: 'grab'
              }}
            >
              {/* Overlay suave para o texto ler bem */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.7) 100%)', zIndex: 0 }} />
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  No. 01
                </span>
              </div>

              <div style={{ zIndex: 1 }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.6rem', color: '#FFF', fontWeight: 300, letterSpacing: '0.01em', marginBottom: '0.3rem' }}>
                  La Selezione
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Aprovado pelo cliente
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 860px) {
          .hero-content-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .hero-preview-card { display: none !important; }
        }
      `}</style>
    </div>
  );
}
