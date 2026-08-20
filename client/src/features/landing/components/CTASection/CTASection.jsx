import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection({ onRegister }) {
  const ref = useRef(null);

  // Background aura animation
  const orbVariants = {
    animate: {
      rotate: 360,
      scale: [1, 1.2, 1],
      transition: {
        rotate: { duration: 30, repeat: Infinity, ease: "linear" },
        scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
      }
    }
  };

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-ink)',
        padding: 'clamp(8rem, 15vw, 12rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px'
      }}
    >
      {/* ── Luzes de Ateliê (Background Aura) ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <motion.div
          variants={orbVariants}
          animate="animate"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '120vw',
            height: '60vw',
            marginTop: '-30vw',
            marginLeft: '-60vw',
            background: 'radial-gradient(ellipse, rgba(168, 30, 18, 0.15) 0%, rgba(212, 201, 168, 0.05) 40%, transparent 70%)',
            filter: 'blur(80px)',
            mixBlendMode: 'screen'
          }}
        />
      </div>



      {/* ── Conteúdo da CTA ── */}
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          style={{
             fontFamily: 'var(--font-serif)',
             fontStyle: 'italic',
             fontSize: '1.25rem',
             color: 'var(--color-mark-red)',
             marginBottom: '1rem'
          }}
        >
          O Seu Novo Padrão
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '3rem',
          }}
        >
          A precisão de um ateliê.
          <br />
          <motion.span 
             initial={{ opacity: 0, filter: 'blur(10px)' }}
             whileInView={{ opacity: 1, filter: 'blur(0px)' }}
             viewport={{ once: true, margin: '-100px' }}
             transition={{ duration: 1.2, delay: 0.5 }}
             style={{ color: 'var(--color-film-beige)', fontStyle: 'italic', display: 'inline-block', marginTop: '0.2em' }}
          >
             Na palma da mão.
          </motion.span>
        </motion.h2>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 0.8, delay: 0.4 }}
           style={{ display: 'flex', justifyContent: 'center' }}
        >
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.8)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onRegister}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '1.25rem 3.5rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '100px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(255,255,255,0.0)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 60px rgba(212, 201, 168, 0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(255,255,255,0.0)'}
          >
            Criar Minha Primeira Galeria
            <ArrowRight size={18} strokeWidth={2} />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
