import React from 'react';
import { ArrowLeft, ArrowRight, X, Heart } from 'lucide-react';

export function PhotoLightbox({ fotos, activeIndex, onClose, onNext, onPrev, onToggleSelecao }) {
  if (activeIndex === null || !fotos[activeIndex]) return null;

  const foto = fotos[activeIndex];

  return (
    <div
      onClick={onClose}
      
    >
      <div
        onClick={(e) => e.stopPropagation()}
        
      >
        <span >
          FRAME #{String(activeIndex + 1).padStart(3, '0')} DE #{String(fotos.length).padStart(3, '0')}
        </span>

        <button
          onClick={onClose}
          
        >
          <X size={28} />
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        
      >
        <img
          src={foto.url_storage}
          alt="Foto em tela cheia"
          
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        
      >
        <button
          onClick={onPrev}
          disabled={activeIndex === 0}
          
          
        >
          <ArrowLeft size={16} /> <span >Anterior</span>
        </button>

        <button
          onClick={(e) => onToggleSelecao(foto.id, e)}
          
          
        >
          <Heart size={16} fill={foto.selecionada ? "#FFFFFF" : "none"} />
          {foto.selecionada ? 'DESMARCAR' : 'SELECIONAR'}
        </button>

        <button
          onClick={onNext}
          disabled={activeIndex === fotos.length - 1}
          
          
        >
          <span >Próxima</span> <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
