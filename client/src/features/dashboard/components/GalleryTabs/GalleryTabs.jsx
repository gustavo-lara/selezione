import React from 'react';
import { Heart } from 'lucide-react';

export function GalleryTabs({ activeTab, totalFotos, totalSelecionadas, onTabChange }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--color-warm-grey-light)', marginBottom: '1.25rem' }}>
      <button
        onClick={() => onTabChange('todas')}
        style={{
          padding: '0.6rem 0.85rem',
          border: 'none',
          background: 'none',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          borderBottom: activeTab === 'todas' ? '2px solid #1A1815' : '2px solid transparent',
          color: activeTab === 'todas' ? '#1A1815' : 'var(--color-warm-grey)'
        }}
      >
        Todas as Fotos ({totalFotos})
      </button>
      <button
        onClick={() => onTabChange('selecionadas')}
        style={{
          padding: '0.6rem 0.85rem',
          border: 'none',
          background: 'none',
          fontFamily: 'var(--font-sans)',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          borderBottom: activeTab === 'selecionadas' ? '2px solid var(--color-mark-red)' : '2px solid transparent',
          color: activeTab === 'selecionadas' ? 'var(--color-mark-red)' : 'var(--color-warm-grey)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}
      >
        <Heart size={15} fill={activeTab === 'selecionadas' ? 'var(--color-mark-red)' : 'none'} />
        Aprovadas ({totalSelecionadas})
      </button>
    </div>
  );
}
