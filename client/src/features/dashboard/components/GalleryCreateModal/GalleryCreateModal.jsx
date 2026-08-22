import React from 'react';

export function GalleryCreateModal({ 
  isOpen, novoNome, novaCota, armazenamentoLivreBytes, creating, 
  onChange, onChangeCota, onSubmit, onClose, formatBytes 
}) {
  if (!isOpen) return null;

  return (
    <div >
      <div >
        <h3 >
          Nova Galeria de Ensaio
        </h3>
        <p >
          SERÁ GERADO UM LINK PÚBLICO ÚNICO POR GALERIA
        </p>

        <form onSubmit={onSubmit}>
          <div >
            <label >
              Nome do Ensaio / Cliente
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Casamento Cliente"
              value={novoNome}
              onChange={onChange}
              
            />
          </div>

          <div >
            <label >
              <span>Cota de Armazenamento para a Galeria</span>
              <span>{novaCota} MB</span>
            </label>
            <input
              type="range"
              min="0"
              max={Math.max(1, Math.floor(armazenamentoLivreBytes / (1024 * 1024)))}
              step="1"
              value={novaCota}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChangeCota({ target: { value: Math.max(1, val) } });
              }}
              
            />
            <div >
               <span>Mínimo: 1 MB</span>
               <span>Livre: {formatBytes(armazenamentoLivreBytes)}</span>
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
              disabled={creating}
              
              
            >
              {creating ? 'Criando...' : 'Criar Galeria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
