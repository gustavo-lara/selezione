import React from 'react';
import { Camera, ArrowRight } from 'lucide-react';

export function LandingHeader({ onLogin, onRegister }) {
  return (
    <header className="header-responsive" style={{
      borderBottom: '1px solid var(--color-warm-grey-light)',
      padding: '1.25rem 2rem',
      backgroundColor: 'var(--color-paper)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          backgroundColor: 'var(--color-ink)',
          color: 'var(--color-paper)',
          padding: '8px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Camera size={20} />
        </div>
        <div>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Studio
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', display: 'block', color: 'var(--color-warm-grey)', marginTop: '-2px' }}>
            by Menegassi
          </span>
        </div>
      </div>

      <div className="header-actions-responsive">
        <button
          onClick={onLogin}
          className="btn-outline"
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          Entrar no Estúdio
        </button>

        <button
          onClick={onRegister}
          className="btn-primary"
          style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
        >
          Criar Conta
          <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
}
