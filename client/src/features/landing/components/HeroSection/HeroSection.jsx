import React from 'react';
import { ArrowRight } from 'lucide-react';

export function HeroSection({ onRegister }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 2.5rem' }}>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.75rem, 6vw, 4.2rem)',
        fontWeight: 600,
        lineHeight: 1.15,
        marginBottom: '1.25rem',
        color: 'var(--color-ink)'
      }}>
        Seus ensaios merecem uma <em style={{ fontStyle: 'italic', color: 'var(--color-mark-red)' }}>aprovação à altura</em>.
      </h1>

      <p style={{ fontSize: '1.05rem', color: '#3D3935', maxWidth: '680px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        Compartilhe galerias com seus clientes através de um link único sem pedir cadastros ou senhas. O cliente escolhe as fotos direto pelo celular e você acompanha o resultado no seu painel.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={onRegister}
          className="btn-mark"
          style={{ fontSize: '0.95rem', padding: '0.85rem 1.6rem' }}
        >
          Comece a entregar assim.
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
