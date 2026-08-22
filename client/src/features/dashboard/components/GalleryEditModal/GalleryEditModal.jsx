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
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(26, 24, 21, 0.75)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#F7F5F0', border: '1px solid #8A8578', borderRadius: '4px',
        width: '100%', maxWidth: '420px', padding: '2rem'
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.25rem' }}>
          Editar Cota da Galeria
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-warm-grey)', marginBottom: '1.5rem' }}>
          {galeria.nome}
        </p>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
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
              style={{ width: '100%', accentColor: 'var(--color-mark)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-warm-grey)' }}>
               <span>Mínimo (Usado): {formatBytes(galeria.tamanho_usado_bytes)}</span>
               <span>Máximo Possível: {formatBytes(maxCotaBytes)}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={editing}
              className="btn-mark"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
            >
              {editing ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
