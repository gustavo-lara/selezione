import React from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { GalleryCard } from '../GalleryCard/GalleryCard.jsx';

export function GalleryList({ galerias, loading, onOpen, onCopyLink, onDelete, onNewGallery }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', fontFamily: 'var(--font-mono)', color: 'var(--color-warm-grey)' }}>
        Carregando galerias do banco de dados...
      </div>
    );
  }

  if (galerias.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        backgroundColor: '#FFFFFF',
        border: '1px dashed var(--color-warm-grey-light)',
        borderRadius: '4px'
      }}>
        <ImageIcon size={48} color="var(--color-warm-grey)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
          Nenhuma entrega ainda.
        </h3>
        <p style={{ color: 'var(--color-warm-grey)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Comece pela primeira.
        </p>
        <button onClick={onNewGallery} className="btn-mark">
          <Plus size={18} /> Criar Primeira Galeria
        </button>
      </div>
    );
  }

  return (
    <div className="gallery-grid-responsive" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '1.25rem'
    }}>
      {galerias.map((g) => (
        <GalleryCard
          key={g.id}
          galeria={g}
          onOpen={onOpen}
          onCopyLink={onCopyLink}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
