import React from 'react';
import { ArrowLeft, ArrowRight, X, Heart } from 'lucide-react';

export function PhotoLightbox({ fotos, activeIndex, onClose, onNext, onPrev, onToggleSelecao }) {
  if (activeIndex === null || !fotos[activeIndex]) return null;

  const foto = fotos[activeIndex];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(26, 24, 21, 0.92)', backdropFilter: 'blur(8px)',
        zIndex: 1000, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '1.5rem'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '1.5rem', left: '2rem', right: '2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#F7F5F0'
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
          FRAME #{String(activeIndex + 1).padStart(3, '0')} DE #{String(fotos.length).padStart(3, '0')}
        </span>

        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#F7F5F0', cursor: 'pointer' }}
        >
          <X size={28} />
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src={foto.url_storage}
          alt="Foto em tela cheia"
          style={{
            maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '2px solid #3D3935'
          }}
        />
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0.65rem', width: '100%', maxWidth: '500px'
        }}
      >
        <button
          onClick={onPrev}
          disabled={activeIndex === 0}
          className="btn-outline"
          style={{
            color: '#F7F5F0', borderColor: '#8A8578',
            opacity: activeIndex === 0 ? 0.3 : 1,
            padding: '0.55rem 0.85rem', fontSize: '0.8rem'
          }}
        >
          <ArrowLeft size={16} /> <span className="btn-text-mobile-hide">Anterior</span>
        </button>

        <button
          onClick={(e) => onToggleSelecao(foto.id, e)}
          className="btn-mark"
          style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem' }}
        >
          <Heart size={16} fill={foto.selecionada ? "#FFFFFF" : "none"} />
          {foto.selecionada ? 'DESMARCAR' : 'SELECIONAR'}
        </button>

        <button
          onClick={onNext}
          disabled={activeIndex === fotos.length - 1}
          className="btn-outline"
          style={{
            color: '#F7F5F0', borderColor: '#8A8578',
            opacity: activeIndex === fotos.length - 1 ? 0.3 : 1,
            padding: '0.55rem 0.85rem', fontSize: '0.8rem'
          }}
        >
          <span className="btn-text-mobile-hide">Próxima</span> <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
