import React from 'react';
import { Camera, Plus, ArrowLeft, Settings, LogOut } from 'lucide-react';

export function DashboardHeader({ currentUser, selectedGaleria, onBack, onNewGallery, onSettings, onLogout }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--color-warm-grey-light)',
      padding: '0.85rem 1.5rem',
      backgroundColor: '#FFFFFF',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
          {selectedGaleria && (
            <button
              onClick={onBack}
              className="btn-outline"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <ArrowLeft size={16} /> <span className="btn-text-mobile-hide">Voltar</span>
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0 }}>
            <div style={{ backgroundColor: '#1A1815', color: '#F7F5F0', padding: '8px', borderRadius: '4px', flexShrink: 0 }}>
              <Camera size={18} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                fontWeight: 700,
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}>
                {currentUser?.nome || 'Estúdio Fotográfico'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', display: 'block', color: 'var(--color-warm-grey)', marginTop: '2px' }}>
                PAINEL DO FOTÓGRAFO
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
          {!selectedGaleria && (
            <button
              onClick={onNewGallery}
              className="btn-mark"
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
            >
              <Plus size={16} /> <span className="btn-text-mobile-hide">Nova Galeria</span>
            </button>
          )}
          <button
            onClick={onSettings}
            className="btn-outline"
            style={{ padding: '0.5rem 0.65rem', fontSize: '0.85rem' }}
            title="Configurações do Estúdio"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onLogout}
            className="btn-outline"
            style={{ padding: '0.5rem 0.65rem', fontSize: '0.85rem' }}
            title="Sair do Sistema"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
