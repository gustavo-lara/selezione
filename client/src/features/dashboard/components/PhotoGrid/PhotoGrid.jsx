import React from 'react';
import { Trash2 } from 'lucide-react';

export function PhotoGrid({ fotos, activeTab, onDeleteFoto }) {
  if (fotos.length === 0) {
    return (
      <div >
        {activeTab === 'selecionadas'
          ? 'O cliente ainda não aprovou fotos nesta galeria.'
          : 'Nenhuma foto nesta galeria. Faça o upload acima.'}
      </div>
    );
  }

  return (
    <div  >
      {fotos.map((foto, index) => (
        <div key={foto.id} >
          <div >
            <span>#{String(index + 1).padStart(3, '0')}</span>
            {foto.selecionada && (
              <span >✓ APROVADA</span>
            )}
          </div>

          <div >
            <img
              src={foto.url_storage}
              alt="Foto do ensaio"
              
            />

            <button
              onClick={(e) => onDeleteFoto(foto.id, e)}
              
              title="Excluir Foto"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
