import React from 'react';
import { Heart, Maximize2 } from 'lucide-react';

export function PhotoGrid({ fotos, onSelectPhoto, onToggleSelecao }) {
  if (fotos.length === 0) {
    return (
      <div >
        Nenhuma foto disponível nesta galeria ainda.
      </div>
    );
  }

  return (
    <div  >
      {fotos.map((foto, index) => {
        const frameNumber = `#${String(index + 1).padStart(3, '0')}`;
        return (
          <div
            key={foto.id}
            onClick={() => onSelectPhoto(index)}
            
            
          >
            <div >
              <span>{frameNumber}</span>
              <button
                onClick={(e) => onToggleSelecao(foto.id, e)}
                
              >
                <Heart size={16} fill={foto.selecionada ? "var(--color-mark-red)" : "none"} color="var(--color-mark-red)" />
                {foto.selecionada ? 'SELECIONADA' : 'MARCAR'}
              </button>
            </div>

            <div >
              <img
                src={foto.url_storage}
                alt={`Foto ${frameNumber}`}
                
              />

              {foto.selecionada && (
                <svg
                  
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 10 15 C 30 5, 85 8, 92 25 C 98 45, 95 80, 80 90 C 65 98, 15 95, 8 75 C 2 55, 12 25, 30 12"
                    fill="none" stroke="var(--color-mark-red)" strokeWidth="3.5" strokeLinecap="round"
                    
                  />
                </svg>
              )}

              <div >
                <Maximize2 size={12} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
