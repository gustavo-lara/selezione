import React from 'react';
import { Settings } from 'lucide-react';

export function SettingsModal({ isOpen, studioName, saving, onChange, onSubmit, onClose }) {
  if (!isOpen) return null;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <Settings size={20} color="var(--color-mark-red)" />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0 }}>
            Configurações do Estúdio
          </h3>
        </div>

        <form onSubmit={onSubmit} style={{ marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Nome do Fotógrafo / Nome do Estúdio
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Studio Gustavo Lara"
              value={studioName}
              onChange={onChange}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #8A8578',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem', backgroundColor: '#FFFFFF'
              }}
            />
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
              disabled={saving}
              className="btn-mark"
              style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
