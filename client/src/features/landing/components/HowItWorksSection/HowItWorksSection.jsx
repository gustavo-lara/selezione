import React from 'react';

const steps = [
  {
    tag: '#001',
    title: 'Upload Ágil do Ensaio',
    description: 'Crie a galeria do cliente em segundos e faça o upload em massa das fotos do ensaio. O sistema organiza tudo automaticamente em molduras numeradas no formato de folha de contato 35mm.',
    highlights: ['✓ Suporte a múltiplos arquivos até 25MB', '✓ Armazenamento otimizado na nuvem']
  },
  {
    tag: '#002',
    title: 'Link Único sem Login',
    description: 'Gere um link público exclusivo com o slug do ensaio e envie no WhatsApp do cliente. Ele acessa a galeria instantaneamente no celular ou PC sem precisar criar conta ou memorizar senhas.',
    highlights: ['✓ Acesso com 1 clique pelo navegador', '✓ Zero atrito para o cliente']
  },
  {
    tag: '#003',
    title: 'Seleção de Fotos',
    description: 'O cliente marca as fotos preferidas visualizando o traço vermelho de caneta sobre as molduras. No seu painel, você acompanha a contagem em tempo real e acessa a lista exata para tratamento.',
    highlights: ['✓ Traço vermelho de aprovação', '✓ Relatório em tempo real']
  }
];

const benefits = [
  {
    title: 'Fim da troca de e-mails',
    description: 'Chega de receber listas digitadas por e-mail com números de fotos confusos. Tudo fica registrado de forma visual e precisa.'
  },
  {
    title: 'Identidade Fotográfica',
    description: 'Apresente seu trabalho em uma galeria com estética de folha de contato e mesa de luz que valoriza a arte do seu ensaio.'
  },
  {
    title: 'Controle Total do Estúdio',
    description: 'Você decide quando criar, visualizar ou remover galerias. As fotos ficam seguras com acesso controlado no seu painel.'
  }
];

export function HowItWorksSection() {
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid var(--color-warm-grey-light)',
      borderBottom: '1px solid var(--color-warm-grey-light)',
      padding: '3rem 1rem'
    }}>
      <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="frame-tag" style={{ color: 'var(--color-mark-red)' }}>O FLUXO DE TRABALHO</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 5vw, 2.6rem)', marginTop: '0.4rem', color: 'var(--color-ink)' }}>
            Como o Studio simplifica sua entrega
          </h2>
          <p style={{ color: 'var(--color-warm-grey)', fontSize: '1rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
            Entenda como transformar o processo de seleção de fotos em uma experiência rápida para o seu cliente e organizada para o seu estúdio.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {steps.map((step) => (
            <div key={step.tag} style={{
              backgroundColor: 'var(--color-paper)',
              border: '1px solid var(--color-warm-grey-light)',
              padding: '1.5rem 1.25rem',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-mark-red)' }}>
                  {step.tag}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: '0.75rem 0 0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ color: 'var(--color-ink-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {step.description}
                </p>
              </div>

              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-warm-grey)',
                borderTop: '1px dashed var(--color-warm-grey-light)',
                paddingTop: '0.85rem'
              }}>
                {step.highlights.map((h, i) => (
                  <React.Fragment key={i}>{h}{i < step.highlights.length - 1 && <br />}</React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Destaques adicionais / Por que usar */}
        <div style={{
          marginTop: '2.5rem',
          backgroundColor: 'var(--color-paper)',
          border: '1px solid var(--color-warm-grey-light)',
          padding: '1.75rem 1.25rem',
          borderRadius: '4px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          {benefits.map((benefit) => (
            <div key={benefit.title}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                {benefit.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-muted)' }}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
