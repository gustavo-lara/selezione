import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Settings, LogOut } from 'lucide-react';

export function DashboardHeader({ currentUser, selectedGaleria, onBack, onNewGallery, onSettings, onLogout }) {
  const T = {
    fg: '#1A1815',
    fgMuted: '#9A9590',
    slash: '#D9D5CC',
    navLink: '#6B6763',
    navHover: '#1A1815',
  };
  const transition = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';

  return (
    <motion.header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'transparent',
        paddingLeft: 'clamp(1.25rem, 5vw, 3rem)',
        paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
        paddingTop: '0.9rem',
        paddingBottom: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
        {selectedGaleria && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: T.fg,
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '0.9rem',
              padding: '0.35rem 0',
              transition,
            }}
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
        )}
        
        {/* LOGO */}
        <a 
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none', cursor: 'pointer' }}
        >
          <img 
            src="/logo.png" 
            alt="Selezione Logo" 
            style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: T.slash, transition }}>
            /
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: T.fg,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}>
              {currentUser?.nome || 'Estúdio Fotográfico'}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: T.fgMuted,
              marginTop: '0.1rem'
            }}>
              PAINEL DO FOTÓGRAFO
            </span>
          </div>
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {!selectedGaleria && (
          <button
            onClick={onNewGallery || (() => window.dispatchEvent(new Event('openNewGalleryModal')))}
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: '0.9rem',
              letterSpacing: '-0.01em',
              padding: '0.35rem 1rem',
              border: '1px solid rgba(26,24,21,0.25)',
              borderRadius: '100px',
              backgroundColor: 'rgba(26,24,21,0.03)',
              color: T.fg,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              whiteSpace: 'nowrap',
              outline: 'none',
              transition,
              marginRight: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26,24,21,0.08)';
              e.currentTarget.style.borderColor = 'rgba(26,24,21,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(26,24,21,0.03)';
              e.currentTarget.style.borderColor = 'rgba(26,24,21,0.25)';
            }}
          >
            <Plus size={16} />
            <span>Nova Galeria</span>
          </button>
        )}

        <div style={{
          width: '1px',
          height: '16px',
          backgroundColor: 'rgba(26,24,21,0.15)',
          margin: '0 0.25rem',
        }} />

        <button
          onClick={onSettings}
          title="Configurações do Estúdio"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: T.navLink,
            display: 'flex',
            alignItems: 'center',
            padding: '0.35rem',
            transition,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = T.fg; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.navLink; }}
        >
          <Settings size={19} strokeWidth={1.8} />
        </button>

        <button
          onClick={onLogout}
          title="Sair do Sistema"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: T.navLink,
            display: 'flex',
            alignItems: 'center',
            padding: '0.35rem',
            transition,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#D92B2B'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = T.navLink; }}
        >
          <LogOut size={19} strokeWidth={1.8} />
        </button>
      </div>
    </motion.header>
  );
}
