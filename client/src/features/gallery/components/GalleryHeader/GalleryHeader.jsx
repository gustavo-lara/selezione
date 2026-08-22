import React from 'react';
import { Camera, Heart, Send } from 'lucide-react';

export function GalleryHeader({ galeria, selectedCount, totalFotos, onSubmit }) {
  return (
    <header  >
      <div >
        <div >
          <Camera size={18} />
        </div>
        <div>
          <span  >GALERIA DE SELEÇÃO</span>
          <h2 >
            {galeria.nome}
          </h2>
        </div>
      </div>

      <div >
        <div >
          <Heart size={14} color="var(--color-mark-red)" fill={selectedCount > 0 ? "var(--color-mark-red)" : "none"} />
          <strong>{selectedCount}</strong> / {totalFotos} <span >SELECIONADAS</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={selectedCount === 0}
          
          
        >
          <Send size={15} /> Confirmar <span >Seleção</span>
        </button>
      </div>
    </header>
  );
}
