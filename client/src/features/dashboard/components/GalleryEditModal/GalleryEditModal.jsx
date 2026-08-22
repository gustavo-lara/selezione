import React from 'react';

export function GalleryEditModal({ 
  isOpen, galeria, novaCota, armazenamentoLivreBytes, editing, 
  onChangeCota, onSubmit, onClose, formatBytes 
}) {
  if (!isOpen || !galeria) return null;

  const maxCotaBytes = galeria.tamanho_alocado_bytes + armazenamentoLivreBytes;
  const maxCotaMB = Math.floor(maxCotaBytes / (1024 * 1024));
  const minCotaMB = Math.ceil(galeria.tamanho_usado_bytes / (1024 * 1024));

  return (
    <div >
      <div >
        <h3 >
          Editar Cota da Galeria
        </h3>
        <p >
          {galeria.nome}
        </p>

        <form onSubmit={onSubmit}>
          <div >
            <label >
              <span>Nova Cota de Armazenamento</span>
              <span>{novaCota} MB</span>
            </label>
            <input
              type="range"
              min="0"
              max={Math.max(Math.max(1, minCotaMB), maxCotaMB)}
              step="1"
              value={novaCota}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChangeCota({ target: { value: Math.max(Math.max(1, minCotaMB), val) } });
              }}
              
            />
            <div >
               <span>Mínimo (Usado): {formatBytes(galeria.tamanho_usado_bytes)}</span>
               <span>Máximo Possível: {formatBytes(maxCotaBytes)}</span>
            </div>
          </div>

          <div >
            <button
              type="button"
              onClick={onClose}
              
              
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={editing}
              
              
            >
              {editing ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
