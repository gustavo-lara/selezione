import React from 'react';
import { Camera, Heart, Send } from 'lucide-react';

export function GalleryHeader({ galeria, selectedCount, totalFotos, onSubmit }) {
  return (
    <header className="header-responsive" style={{
      position: 'sticky', top: 0, zIndex: 100,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--color-warm-grey-light)',
      padding: '0.75rem 1rem',
      boxShadow: 'var(--shadow-paper)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <div style={{ backgroundColor: 'var(--color-ink)', color: '#F7F5F0', padding: '6px', borderRadius: '4px' }}>
          <Camera size={18} />
        </div>
        <div>
          <span className="frame-tag" style={{ fontSize: '0.6rem' }}>GALERIA DE SELEÇÃO</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, lineHeight: 1.2 }}>
            {galeria.nome}
          </h2>
        </div>
      </div>

      <div className="header-actions-responsive">
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          backgroundColor: 'var(--color-paper-muted)',
          padding: '0.35rem 0.6rem',
          borderRadius: '4px',
          border: '1px solid var(--color-warm-grey-light)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem'
        }}>
          <Heart size={14} color="var(--color-mark-red)" fill={selectedCount > 0 ? "var(--color-mark-red)" : "none"} />
          <strong>{selectedCount}</strong> / {totalFotos} <span className="hide-on-xs">SELECIONADAS</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={selectedCount === 0}
          className="btn-mark"
          style={{
            opacity: selectedCount === 0 ? 0.5 : 1,
            cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
            padding: '0.5rem 0.85rem',
            fontSize: '0.8rem'
          }}
        >
          <Send size={15} /> Confirmar <span className="hide-on-xs">Seleção</span>
        </button>
      </div>
    </header>
  );
}
