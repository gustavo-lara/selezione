import React from 'react';


export function GalleryHeader({ galeria, selectedCount, totalFotos, onSubmit }) {
  return (
    <header  >
      <div >
        <div >
          
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
          
          <strong>{selectedCount}</strong> / {totalFotos} <span >SELECIONADAS</span>
        </div>

        <button
          onClick={onSubmit}
          disabled={selectedCount === 0}
          
          
        >
           Confirmar <span >Seleção</span>
        </button>
      </div>
    </header>
  );
}
