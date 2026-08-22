import React from 'react';

import { GalleryCard } from '../GalleryCard/GalleryCard.jsx';

export function GalleryList({ galerias, loading, onOpen, onCopyLink, onDelete, onToggleStatus, onNewGallery, formatBytes }) {
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
        
        <h3 >
          Nenhuma entrega ainda.
        </h3>
        <p >
          Comece pela primeira.
        </p>
        <button onClick={onNewGallery} >
           Criar Primeira Galeria
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
          onToggleStatus={onToggleStatus}
          formatBytes={formatBytes}
        />
      ))}
    </div>
  );
}
