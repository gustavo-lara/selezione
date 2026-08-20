import React from 'react';

export function LandingFooter() {
  return (
    <footer style={{
      padding: '5rem 2rem 4rem',
      backgroundColor: 'var(--color-paper)', 
      color: 'var(--color-ink-muted)',
      textAlign: 'center',
      fontFamily: 'var(--font-serif)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      borderTop: '1px solid var(--color-warm-grey-light)'
    }}>
      
      <div style={{ opacity: 0.85, transition: 'opacity 0.3s ease' }}>
        <img 
          src="/logo.png" 
          alt="Menegassi Logo" 
          style={{ 
            height: '35px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'brightness(0)'
          }} 
        />
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.4rem',
        fontSize: '0.95rem'
      }}>
        <p style={{ fontStyle: 'italic', letterSpacing: '0.02em', color: 'var(--color-ink)' }}>
          © 2026 Selezione — Plataforma Editorial de Seleção de Fotos.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-warm-grey)' }}>
          Design & Desenvolvimento por{' '}
          <a
            href="https://instagram.com/g.menegassi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'var(--color-ink)', 
              textDecoration: 'none', 
              borderBottom: '1px solid var(--color-warm-grey-light)', 
              paddingBottom: '2px', 
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'var(--color-mark-red)';
              e.target.style.borderBottomColor = 'var(--color-mark-red)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'var(--color-ink)';
              e.target.style.borderBottomColor = 'var(--color-warm-grey-light)';
            }}
          >
            Gustavo Menegassi
          </a>
        </p>
      </div>
    </footer>
  );
}
