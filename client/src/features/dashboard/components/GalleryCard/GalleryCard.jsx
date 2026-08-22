import React from 'react';
import { Copy, Trash2, Eye, EyeOff } from 'lucide-react';

export function GalleryCard({ galeria, onOpen, onCopyLink, onDelete, onToggleStatus, formatBytes }) {
  return (
    <div
      onClick={() => onOpen(galeria)}
      
      
    >
      <div >
        <span>LINK: #{galeria.link_publico.substring(0, 12)}...</span>
        <span>{new Date(galeria.created_at).toLocaleDateString()}</span>
      </div>

      <h3 >
        {galeria.nome}
      </h3>

      <div >
        <div>
          <span >TOTAL FOTOS</span>
          <strong >{galeria.total_fotos || 0}</strong>
        </div>
        <div >
          <span >APROVADAS</span>
          <strong >{galeria.total_selecionadas || 0}</strong>
        </div>
      </div>

      {galeria.tamanho_alocado_bytes > 0 && formatBytes && (
        <div >
          <div >
            <span>Uso da Galeria</span>
            <span>{formatBytes(galeria.tamanho_usado_bytes || 0)} / {formatBytes(galeria.tamanho_alocado_bytes)}</span>
          </div>
          <div >
            <div  />
          </div>
        </div>
      )}

      <div >
        <button
          onClick={(e) => { e.stopPropagation(); onToggleStatus(galeria.id, galeria.is_active); }}
          title={galeria.is_active ? "Ocultar Galeria" : "Publicar Galeria"}
          style={{ padding: '0.5rem', background: 'transparent', border: '1px solid var(--color-warm-grey-light)', borderRadius: '4px', cursor: 'pointer', color: galeria.is_active ? 'var(--color-ink)' : 'var(--color-warm-grey)' }}
        >
          {galeria.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onCopyLink(galeria.link_publico); }}
          
          
        >
          <Copy size={14} /> Copiar Link
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(galeria.id, galeria.nome); }}
          
          
          title="Excluir Galeria"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
