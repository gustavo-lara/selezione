import React from 'react';


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
        
        Aprovadas ({totalSelecionadas})
      </button>
    </div>
  );
}
