import React from 'react';
import { Copy, Trash2 } from 'lucide-react';

export function GalleryCard({ galeria, onOpen, onCopyLink, onDelete }) {
  return (
    <div
      onClick={() => onOpen(galeria)}
      className="contact-frame"
      style={{ cursor: 'pointer', padding: '1.25rem' }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--color-warm-grey)',
        marginBottom: '0.5rem'
      }}>
        <span>LINK: #{galeria.link_publico.substring(0, 12)}...</span>
        <span>{new Date(galeria.created_at).toLocaleDateString()}</span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--color-ink)' }}>
        {galeria.nome}
      </h3>

      <div style={{
        backgroundColor: 'var(--color-paper-muted)',
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.25rem',
        border: '1px solid var(--color-warm-grey-light)'
      }}>
        <div>
          <span style={{ color: 'var(--color-warm-grey)', display: 'block', fontSize: '0.65rem' }}>TOTAL FOTOS</span>
          <strong style={{ fontSize: '1rem', color: 'var(--color-ink)' }}>{galeria.total_fotos || 0}</strong>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: 'var(--color-warm-grey)', display: 'block', fontSize: '0.65rem' }}>APROVADAS</span>
          <strong style={{ fontSize: '1rem', color: 'var(--color-mark-red)' }}>{galeria.total_selecionadas || 0}</strong>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={(e) => { e.stopPropagation(); onCopyLink(galeria.link_publico); }}
          className="btn-outline"
          style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', justifyContent: 'center' }}
        >
          <Copy size={14} /> Copiar Link
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(galeria.id, galeria.nome); }}
          className="btn-outline"
          style={{ padding: '0.5rem', color: 'var(--color-mark-red)', borderColor: 'var(--color-warm-grey-light)' }}
          title="Excluir Galeria"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
