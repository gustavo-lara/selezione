import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const photographerBenefits = [
  'Painel centralizado com todas as galerias',
  'Notificação quando o cliente finaliza a seleção',
  'Lista numerada das fotos aprovadas',
  'Sem mais e-mails com listas confusas',
  'Histórico de todas as aprovações',
  'Controle total sobre quem acessa',
];

const clientBenefits = [
  'Sem cadastro ou senha para criar',
  'Funciona diretamente no celular',
  'Interface limpa — só as fotos importam',
  'Seleciona e revisa antes de enviar',
  'Processo rápido e sem confusão',
  'Experiência à altura do ensaio',
];

export function ForWhoSection() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('.reveal-left, .reveal-right, .reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        borderTop: '1px solid var(--color-warm-grey-light)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="for-who-grid"
      >
        {/* PAINEL ESCURO — Fotógrafo */}
        <div
          className="reveal-left"
          style={{
            backgroundColor: 'var(--color-ink)',
            padding: '5rem 3.5rem',
            color: 'var(--color-paper)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-mark-red)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            Para o Fotógrafo
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            A clareza
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-film-beige)' }}>do controle total.</em>
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(247, 245, 240, 0.65)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '360px',
            }}
          >
            Chega de listas digitadas no WhatsApp com números de fotos errados. Você centraliza tudo num único painel e recebe a aprovação com precisão cirúrgica.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {photographerBenefits.map((benefit) => (
              <li
                key={benefit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: 'rgba(247, 245, 240, 0.85)',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-mark-red)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="#fff" strokeWidth={3} />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* PAINEL CLARO — Cliente */}
        <div
          className="reveal-right"
          style={{
            backgroundColor: 'var(--color-paper)',
            padding: '5rem 3.5rem',
            borderLeft: '1px solid var(--color-warm-grey-light)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-grey)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}
          >
            Para o Cliente
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 600,
              color: 'var(--color-ink)',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            O privilégio
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--color-mark-red)' }}>da escolha.</em>
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-ink-muted)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '360px',
            }}
          >
            Seu cliente não precisa criar conta, instalar nada ou lembrar de senhas. Ele recebe o link e já está dentro da galeria, num ambiente limpo, focado só nas fotos.
          </p>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {clientBenefits.map((benefit) => (
              <li
                key={benefit}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                  color: 'var(--color-ink-muted)',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-paper-muted)',
                    border: '1px solid var(--color-warm-grey-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={11} color="var(--color-ink)" strokeWidth={3} />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .for-who-grid {
            grid-template-columns: 1fr !important;
          }
          .for-who-grid > div {
            padding: 3.5rem 1.75rem !important;
            border-left: none !important;
            border-top: 1px solid var(--color-warm-grey-light);
          }
        }
      `}</style>
    </section>
  );
}
