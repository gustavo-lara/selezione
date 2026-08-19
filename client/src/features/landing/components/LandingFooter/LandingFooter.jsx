import React from 'react';

export function LandingFooter() {
  return (
    <footer style={{
      padding: '3rem 2rem',
      borderTop: '1px solid var(--color-warm-grey-light)',
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.8rem',
      color: 'var(--color-warm-grey)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <span
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: '2rem',
            color: 'var(--color-ink)',
            lineHeight: 1
          }}
        >
          Selezione
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-warm-grey)' }}>
          by Menegassi
        </span>
      </div>
      <p>© 2026 Selezione, um produto Menegassi — Plataforma de Seleção e Aprovação de Fotos.</p>
      <p style={{ marginTop: '0.4rem', fontSize: '0.85rem' }}>
        Desenvolvido por{' '}
        <a
          href="https://instagram.com/g.menegassi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--color-mark-red)', textDecoration: 'none', fontWeight: 600 }}
        >
          @gustavo
        </a>
      </p>
    </footer>
  );
}
