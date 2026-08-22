import React from 'react';


export function PhotoGrid({ fotos, activeTab, onDeleteFoto }) {
  const isVideo = (url) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mov');
  };
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
            {isVideo(foto.url_storage) ? (
              <video
                src={foto.url_storage}
                controls
               
              />
            ) : (
              <img
                src={foto.url_storage}
                alt="Foto do ensaio"
              />
            )}

            <button
              onClick={(e) => onDeleteFoto(foto.id, e)}
              
              title="Excluir Foto"
            >
              
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
