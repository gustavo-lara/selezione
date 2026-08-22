import React from 'react';
import { Heart } from 'lucide-react';

export function GalleryTabs({ activeTab, totalFotos, totalSelecionadas, onTabChange }) {
  return (
    <div >
      <button
        onClick={() => onTabChange('todas')}
        
      >
        Todas as Fotos ({totalFotos})
      </button>
      <button
        onClick={() => onTabChange('selecionadas')}
        
      >
        <Heart size={15} fill={activeTab === 'selecionadas' ? 'var(--color-mark-red)' : 'none'} />
        Aprovadas ({totalSelecionadas})
      </button>
    </div>
  );
}
