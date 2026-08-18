import React from 'react';
import { Check } from 'lucide-react';

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      backgroundColor: '#1A1815',
      color: '#F7F5F0',
      padding: '0.85rem 1.4rem',
      borderRadius: '4px',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.9rem',
      boxShadow: 'var(--shadow-card)',
      zIndex: 1100,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <Check size={18} color="var(--color-mark-red)" />
      {message}
    </div>
  );
}
