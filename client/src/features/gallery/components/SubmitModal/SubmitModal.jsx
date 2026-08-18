import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function SubmitModal({ isOpen, submitted, selectedCount, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(26, 24, 21, 0.8)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#F7F5F0', border: '1px solid #8A8578', borderRadius: '4px',
        width: '100%', maxWidth: '440px', padding: '2.5rem 2rem', textAlign: 'center'
      }}>
        {!submitted ? (
          <>
            <div style={{
              display: 'inline-flex', padding: '12px', borderRadius: '50%',
              backgroundColor: 'rgba(193, 59, 46, 0.1)', color: 'var(--color-mark-red)',
              marginBottom: '1rem'
            }}>
              <Send size={28} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Confirmar Seleção Final?
            </h3>
            <p style={{ color: '#3D3935', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Você marcou <strong>{selectedCount} foto(s)</strong> para este ensaio. O fotógrafo receberá a notificação da sua escolha imediatamente.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={onClose} className="btn-outline">
                Revisar Fotos
              </button>
              <button onClick={onConfirm} className="btn-mark">
                Confirmar & Enviar
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{
              display: 'inline-flex', padding: '12px', borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#16a34a',
              marginBottom: '1rem'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              Escolha recebida.
            </h3>
            <p style={{ color: '#3D3935', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Sua escolha de <strong>{selectedCount} foto(s)</strong> foi gravada. O resto é com o fotógrafo.
            </p>
            <button
              onClick={onClose}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Concluir
            </button>
          </>
        )}
      </div>
    </div>
  );
}
