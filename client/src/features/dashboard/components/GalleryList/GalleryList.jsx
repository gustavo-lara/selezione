import React from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';
import { GalleryCard } from '../GalleryCard/GalleryCard.jsx';

export function GalleryList({ galerias, loading, onOpen, onCopyLink, onDelete, onNewGallery, formatBytes }) {
  if (loading) {
    return (
      <div >
        Carregando galerias do banco de dados...
      </div>
    );
  }

  if (galerias.length === 0) {
    return (
      <div >
        <ImageIcon size={48} color="var(--color-warm-grey)"  />
        <h3 >
          Nenhuma entrega ainda.
        </h3>
        <p >
          Comece pela primeira.
        </p>
        <button onClick={onNewGallery} >
          <Plus size={18} /> Criar Primeira Galeria
        </button>
      </div>
    );
  }

  return (
    <div  >
      {galerias.map((g) => (
        <GalleryCard
          key={g.id}
          galeria={g}
          onOpen={onOpen}
          onCopyLink={onCopyLink}
          onDelete={onDelete}
          formatBytes={formatBytes}
        />
      ))}
    </div>
  );
}
