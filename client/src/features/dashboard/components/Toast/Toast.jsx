import React from 'react';
import { Check } from 'lucide-react';

export function Toast({ message }) {
  if (!message) return null;

  return (
    <div >
      <Check size={18} color="var(--color-mark-red)" />
      {message}
    </div>
  );
}
