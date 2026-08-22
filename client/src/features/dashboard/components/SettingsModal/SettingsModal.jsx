import React from 'react';


export function SettingsModal({ isOpen, studioName, saving, onChange, onSubmit, onClose }) {
  if (!isOpen) return null;

  return (
    <div >
      <div >
        <div >
          
          <h3 >
            Configurações do Estúdio
          </h3>
        </div>

        <form onSubmit={onSubmit} >
          <div >
            <label >
              Nome do Fotógrafo / Nome do Estúdio
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Meu Studio"
              value={studioName}
              onChange={onChange}
              
            />
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
              disabled={saving}
              
              
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
