import React from 'react';

export function GalleryPasswordModal({ 
  isOpen, 
  galeria, 
  novaSenha, 
  saving, 
  onChangeSenha, 
  onSubmit, 
  onClose 
}) {
  if (!isOpen || !galeria) return null;

  return (
    <div>
      <div>
        <h3>
          Configurar Senha da Galeria
        </h3>
        <p>
          {galeria.nome}
        </p>

        <form onSubmit={onSubmit}>
          <div>
            <label>
              Senha de Acesso
            </label>
            <input
              type="text"
              placeholder="Digite a senha (ou deixe vazio para remover)"
              value={novaSenha}
              onChange={onChangeSenha}
            />
            <small>
              Se a galeria já possui uma senha, esta nova irá substituí-la. Para remover a proteção por senha, deixe o campo vazio e salve.
            </small>
          </div>

          <div>
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
