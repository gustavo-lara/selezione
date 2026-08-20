import React from 'react';

export function LandingFooter() {
  return (
    <footer style={{
      padding: '5rem 2rem 4rem',
      backgroundColor: '#11100E', // Um tom levemente mais escuro que o CTA para dar profundidade
      color: 'rgba(247, 245, 240, 0.5)',
      textAlign: 'center',
      fontFamily: 'var(--font-serif)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      
      <div style={{ opacity: 0.7, transition: 'opacity 0.3s ease' }}>
        <img 
          src="/logo.png" 
          alt="Menegassi Logo" 
          style={{ 
            height: '35px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)' // Inverte para branco no fundo escuro
          }} 
        />
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.4rem',
        fontSize: '0.95rem'
      }}>
        <p style={{ fontStyle: 'italic', letterSpacing: '0.02em' }}>
          © 2026 Selezione — Plataforma Editorial de Seleção de Fotos.
        </p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(247, 245, 240, 0.3)' }}>
          Design & Desenvolvimento por{' '}
          <a
            href="https://instagram.com/g.menegassi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'rgba(247, 245, 240, 0.7)', 
              textDecoration: 'none', 
              borderBottom: '1px solid rgba(247, 245, 240, 0.2)', 
              paddingBottom: '2px', 
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.color = '#FFFFFF';
              e.target.style.borderBottomColor = '#FFFFFF';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'rgba(247, 245, 240, 0.7)';
              e.target.style.borderBottomColor = 'rgba(247, 245, 240, 0.2)';
            }}
          >
            Gustavo Menegassi
          </a>
        </p>
      </div>
    </footer>
  );
}
