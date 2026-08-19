import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export function CTASection({ onRegister }) {
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
      { threshold: 0.15 }
    );
    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-ink)',
        padding: '7rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Textura de fundo sutil */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(ellipse at 25% 75%, rgba(138, 24, 16, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 25%, rgba(212, 201, 168, 0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
        <div
          className="reveal"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(176, 36, 24, 0.7)',
            marginBottom: '1.75rem',
          }}
        >
          Menegassi
        </div>

        <h2
          className="reveal delay-100"
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}
        >
          A precisão de um ateliê.
          <br />
          <span style={{ color: 'var(--color-film-beige)', opacity: 0.7 }}>Na palma da mão.</span>
        </h2>

        <div className="reveal delay-200" style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
          <button
            onClick={onRegister}
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.9rem',
              padding: '0.85rem 2rem',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '100px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              letterSpacing: '0.02em',
              transition: 'background-color 0.25s ease, border-color 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            Criar galeria
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Assinatura */}
        <div
          className="reveal delay-400"
          style={{
            marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(247, 245, 240, 0.08)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              fontWeight: 600,
              color: 'rgba(247, 245, 240, 0.35)',
              letterSpacing: '-0.02em',
            }}
          >
            Studio,{' '}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'rgba(247, 245, 240, 0.2)',
              letterSpacing: '0.1em',
            }}
          >
            by Menegassi
          </span>
        </div>
      </div>
    </section>
  );
}
