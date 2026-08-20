import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const photographerBenefits = [
  'Painel centralizado com todas as galerias',
  'Notificação quando o cliente finaliza',
  'Lista numerada e exata das aprovadas',
  'Fim dos e-mails com listas confusas',
  'Histórico de aprovações salvo',
  'Controle estrito sobre quem acessa',
];

const clientBenefits = [
  'Sem cadastro ou senhas para criar',
  'Acesso imediato no celular',
  'Interface limpa — foco total na arte',
  'Revisão fluída antes do envio',
  'Processo intuitivo e sem estresse',
  'Experiência premium do início ao fim',
];

// Reusable list component with staggering animation
const BenefitList = ({ items, isDark }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.ul 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: 0 }}
    >
      {items.map((benefit) => (
        <motion.li
          key={benefit}
          variants={itemVariants}
          whileHover={{ x: 6, color: isDark ? '#FFFFFF' : 'var(--color-ink)' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '1rem',
            color: isDark ? 'rgba(247, 245, 240, 0.7)' : 'var(--color-ink-muted)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'default'
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: isDark ? 'var(--color-mark-red)' : 'var(--color-paper-muted)',
              border: isDark ? 'none' : '1px solid var(--color-warm-grey-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: isDark ? '0 4px 12px rgba(168, 30, 18, 0.4)' : 'none',
            }}
          >
            <Check size={13} color={isDark ? "#fff" : "var(--color-ink)"} strokeWidth={2.5} />
          </div>
          {benefit}
        </motion.li>
      ))}
    </motion.ul>
  );
};

export function ForWhoSection() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      style={{
        borderTop: '1px solid var(--color-warm-grey-light)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="for-who-grid"
      >
        {/* ── PAINEL ESCURO — Fotógrafo ── */}
        <div
          style={{
            backgroundColor: 'var(--color-ink)',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 5rem)',
            color: 'var(--color-paper)',
            position: 'relative',
          }}
        >
          {/* Subtle dark grain overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', mixBlendMode: 'screen' }}>
             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
               <filter id="grain-dark"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" /></filter>
               <rect width="100%" height="100%" filter="url(#grain-dark)" />
             </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '440px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'rgba(247,245,240,0.5)',
                marginBottom: '1.5rem',
              }}
            >
              Para o Fotógrafo
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              A clareza
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-film-beige)' }}>do controle total.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                fontSize: '1.05rem',
                color: 'rgba(247, 245, 240, 0.65)',
                lineHeight: 1.6,
                marginBottom: '4rem',
              }}
            >
              Chega de listas digitadas no WhatsApp com números de fotos errados. Você centraliza tudo num único painel e recebe a aprovação com precisão cirúrgica.
            </motion.p>

            <BenefitList items={photographerBenefits} isDark={true} />
          </div>
        </div>

        {/* ── PAINEL CLARO — Cliente ── */}
        <div
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: 'clamp(4rem, 8vw, 8rem) clamp(2rem, 5vw, 5rem)',
            borderLeft: '1px solid var(--color-warm-grey-light)',
          }}
        >
          <div style={{ maxWidth: '440px', margin: '0 auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'var(--color-warm-grey)',
                marginBottom: '1.5rem',
              }}
            >
              Para o Cliente
            </motion.div>

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
                marginBottom: '1.5rem',
              }}
            >
              O privilégio
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--color-mark-red)' }}>da escolha.</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-ink-muted)',
                lineHeight: 1.6,
                marginBottom: '4rem',
              }}
            >
              Seu cliente não precisa criar conta, instalar nada ou lembrar de senhas. Ele recebe o link e já está dentro da galeria, num ambiente limpo, focado só nas fotos.
            </motion.p>

            <BenefitList items={clientBenefits} isDark={false} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .for-who-grid {
            grid-template-columns: 1fr !important;
          }
          .for-who-grid > div {
            border-left: none !important;
            border-top: 1px solid var(--color-warm-grey-light);
          }
        }
      `}</style>
    </section>
  );
}
