import React, { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    phase: 'A Preparação',
    title: 'Você cria a galeria',
    description:
      'No seu painel, você cria um novo ensaio, faz o upload das fotos e a galeria já está pronta. O sistema organiza tudo automaticamente em molduras numeradas, no estilo de uma folha de contato analógica.',
    detail: 'Suporte a múltiplos arquivos · Organização automática · Armazenamento na nuvem',
    side: 'Fotógrafo',
  },
  {
    number: '02',
    phase: 'O Convite',
    title: 'O cliente acessa sem cadastro',
    description:
      'Um link exclusivo é gerado para o ensaio. Você envia pelo WhatsApp ou e-mail. O cliente clica e cai diretamente na galeria — sem precisar criar conta, instalar app ou memorizar senha.',
    detail: 'Acesso com 1 clique · Funciona no celular · Zero atrito',
    side: 'Cliente',
  },
  {
    number: '03',
    phase: 'A Decisão',
    title: 'Você recebe a lista exata',
    description:
      'O cliente marca as fotos que quer com um clique — um círculo vermelho aparece sobre cada selecionada. Você acompanha em tempo real no painel e recebe a lista numerada, pronta para a edição final.',
    detail: 'Seleção em tempo real · Lista numerada · Sem margem para erro',
    side: 'Fotógrafo',
  },
];

export function HowItWorksSection() {
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

    const elements = ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-warm-grey-light)',
        borderBottom: '1px solid var(--color-warm-grey-light)',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--color-warm-grey)',
              fontWeight: 600,
            }}
          >
            O Fluxo de Aprovação
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              marginTop: '0.5rem',
              color: 'var(--color-ink)',
              lineHeight: 1.15,
            }}
          >
            Três momentos. Zero confusão.
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--color-warm-grey)',
              fontSize: '1rem',
              maxWidth: '480px',
              margin: '1rem auto 0',
              lineHeight: 1.6,
            }}
          >
            O fluxo foi desenhado para ser simples de um lado e preciso do outro.
          </p>
        </div>

        {/* Timeline vertical */}
        <div style={{ position: 'relative' }}>
          {/* Linha vertical */}
          <div
            style={{
              position: 'absolute',
              left: '2.5rem',
              top: 0,
              bottom: 0,
              width: '1px',
              backgroundColor: 'var(--color-warm-grey-light)',
              transformOrigin: 'top',
            }}
            className="reveal"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {steps.map((step, i) => {
              const delayClass = `delay-${(i + 1) * 150 > 500 ? 500 : (i + 1) * 150}`;
              return (
                <div
                  key={step.number}
                  className={`reveal-left ${delayClass}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '5rem 1fr',
                    gap: '2rem',
                    alignItems: 'start',
                  }}
                >
                  {/* Círculo do step number */}
                  <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '50%',
                        backgroundColor: i === 0 ? 'var(--color-ink)' : '#FFFFFF',
                        border: `2px solid ${i === 0 ? 'var(--color-ink)' : 'var(--color-warm-grey-light)'}`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1.35rem',
                          fontWeight: 600,
                          color: i === 0 ? 'var(--color-paper)' : 'var(--color-ink)',
                          lineHeight: 1,
                        }}
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div style={{ paddingTop: '0.75rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'var(--color-mark-red)',
                          fontWeight: 600,
                        }}
                      >
                        {step.phase}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          color: 'var(--color-warm-grey)',
                          backgroundColor: 'var(--color-paper-muted)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '100px',
                          border: '1px solid var(--color-warm-grey-light)',
                        }}
                      >
                        {step.side}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'var(--color-ink)',
                        marginBottom: '0.75rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.95rem',
                        color: 'var(--color-ink-muted)',
                        lineHeight: 1.7,
                        marginBottom: '1rem',
                        maxWidth: '560px',
                      }}
                    >
                      {step.description}
                    </p>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--color-warm-grey)',
                        letterSpacing: '0.06em',
                        borderTop: '1px dashed var(--color-warm-grey-light)',
                        paddingTop: '0.75rem',
                      }}
                    >
                      {step.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
