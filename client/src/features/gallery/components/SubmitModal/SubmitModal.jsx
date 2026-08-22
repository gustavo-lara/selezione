import React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function SubmitModal({ isOpen, submitted, selectedCount, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div >
      <div >
        {!submitted ? (
          <>
            <div >
              <Send size={28} />
            </div>
            <h3 >
              Confirmar Seleção Final?
            </h3>
            <p >
              Você marcou <strong>{selectedCount} foto(s)</strong> para este ensaio. O fotógrafo receberá a notificação da sua escolha imediatamente.
            </p>

            <div >
              <button onClick={onClose} >
                Revisar Fotos
              </button>
              <button onClick={onConfirm} >
                Confirmar & Enviar
              </button>
            </div>
          </>
        ) : (
          <>
            <div >
              <CheckCircle2 size={36} />
            </div>
            <h3 >
              Escolha recebida.
            </h3>
            <p >
              Sua escolha de <strong>{selectedCount} foto(s)</strong> foi gravada. O resto é com o fotógrafo.
            </p>
            <button
              onClick={onClose}
              
              
            >
              Concluir
            </button>
          </>
        )}
      </div>
    </div>
  );
}
