import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../../../contexts/AuthContext.jsx';

const NAV_LINKS = [
  { label: 'A Selezione',      href: '#a-selezione' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Para quem',     href: '#para-quem' },
];

function scrollTo(href) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function LandingHeader({ onLogin, onRegister }) {
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.65);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ── Tokens de cor ──
     Usa dark tokens quando: scrollou além do hero OU menu está aberto
     (menu overlay é sempre branco, então texto deve ser escuro) */
  const isLight = scrolled || menuOpen;

  const T = {
    fg:        isLight ? '#1A1815'                  : 'rgba(255,255,255,0.92)',
    fgMuted:   isLight ? '#9A9590'                  : 'rgba(255,255,255,0.40)',
    slash:     isLight ? '#D9D5CC'                  : 'rgba(255,255,255,0.18)',
    navLink:   isLight ? '#6B6763'                  : 'rgba(255,255,255,0.50)',
    navHover:  isLight ? '#1A1815'                  : 'rgba(255,255,255,0.95)',
    btnBorder: isLight ? 'rgba(26,24,21,0.45)'      : 'rgba(255,255,255,0.38)',
    ctaBg:     isLight ? '#1A1815'                  : 'rgba(255,255,255,0.12)',
    ctaBorder: isLight ? '#1A1815'                  : 'rgba(255,255,255,0.38)',
    ctaFg:     isLight ? '#F7F5F0'                  : 'rgba(255,255,255,0.92)',
  };

  const transition = 'color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease';

  return (
    <>
      {/* ══════════════════════════════════════════
          HEADER PRINCIPAL
          ══════════════════════════════════════════ */}
      <motion.header
        animate={{
          backgroundColor: scrolled ? 'rgba(247,245,240,0.96)' : 'rgba(0,0,0,0)',
          backdropFilter:  scrolled ? 'blur(16px) saturate(1.4)' : 'blur(0px)',
          boxShadow:       scrolled
            ? '0 1px 0 rgba(217,213,204,0.8), 0 4px 24px rgba(26,24,21,0.04)'
            : 'none',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          paddingLeft:  'clamp(1.25rem, 5vw, 3rem)',
          paddingRight: 'clamp(1.25rem, 5vw, 3rem)',
          paddingTop:    '0.9rem',
          paddingBottom: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* ── WORDMARK ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: "'Alex Brush', cursive",
              fontSize: '2rem', /* Maior por ser cursiva */
              fontWeight: 400,
              lineHeight: 1,
              color: T.fg,
              transition,
              userSelect: 'none',
              transform: 'translateY(-2px)' /* Ajuste fino de alinhamento */
            }}
          >
            Selezione
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: T.slash, transition }}>
            /
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: T.fgMuted,
              transition,
              userSelect: 'none',
              /* ocultar em mobile muito pequeno */
            }}
            className="header-brand-sub"
          >
            Menegassi
          </span>
        </div>

        {/* ── NAV CENTRAL (apenas desktop ≥ 860px) ── */}
        <nav
          className="header-nav-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} link={link} fgColor={T.navLink} hoverColor={T.navHover} />
          ))}
        </nav>

          {/* AÇÕES DIREITA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>

          {/* Separador vertical — apenas desktop */}
          <div
            className="header-login-desktop"
            style={{
              width: '1px',
              height: '16px',
              backgroundColor: isLight ? 'rgba(26,24,21,0.15)' : 'rgba(255,255,255,0.18)',
              marginRight: '1.25rem',
              transition,
              flexShrink: 0,
            }}
          />

          {currentUser ? (
            <>
              <button
                onClick={logout}
                className="header-login-desktop"
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                  color: T.navLink,
                  padding: '0.35rem 0.75rem',
                  transition,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.fg; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.navLink; }}
              >
                Sair
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="header-cta-desktop"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                  padding: '0.35rem 1rem',
                  border: `1px solid ${isLight ? 'rgba(26,24,21,0.25)' : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: '100px',
                  backgroundColor: isLight ? 'rgba(26,24,21,0.03)' : 'rgba(255,255,255,0.05)',
                  color: T.fg,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  outline: 'none',
                  transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isLight ? 'rgba(26,24,21,0.08)' : 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = isLight ? 'rgba(26,24,21,0.4)' : 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isLight ? 'rgba(26,24,21,0.03)' : 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = isLight ? 'rgba(26,24,21,0.25)' : 'rgba(255,255,255,0.25)';
                }}
              >
                Acessar Painel 
                <span style={{ fontSize: '0.75rem', marginTop: '0.1rem', opacity: 0.8 }}>↗</span>
              </button>
            </>
          ) : (
            <>
              {/* Entrar — serif itálico, como um link de nav refinado */}
              <button
                onClick={onLogin}
                className="header-login-desktop"
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                  color: T.navLink,
                  padding: '0.35rem 0.75rem',
                  transition,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = T.fg; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = T.navLink; }}
              >
                Entrar
              </button>

              {/* Criar galeria — ghost pill refinada (oculta no mobile junto ao hamburger) */}
              <button
                onClick={onRegister}
                className="header-cta-desktop"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: '0.9rem',
                  letterSpacing: '-0.01em',
                  padding: '0.35rem 1rem',
                  border: `1px solid ${isLight ? 'rgba(26,24,21,0.25)' : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: '100px',
                  backgroundColor: isLight ? 'rgba(26,24,21,0.03)' : 'rgba(255,255,255,0.05)',
                  color: T.fg,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                  outline: 'none',
                  transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isLight ? 'rgba(26,24,21,0.08)' : 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.borderColor = isLight ? 'rgba(26,24,21,0.4)' : 'rgba(255,255,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isLight ? 'rgba(26,24,21,0.03)' : 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = isLight ? 'rgba(26,24,21,0.25)' : 'rgba(255,255,255,0.25)';
                }}
              >
                Criar galeria 
                <span style={{ fontSize: '0.75rem', marginTop: '0.1rem', opacity: 0.8 }}>↗</span>
              </button>
            </>
          )}

          {/* Hamburger — apenas < 860px */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="header-hamburger"
            aria-label="Menu"
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              display: 'none',
              padding: '0.3rem',
              marginLeft: '0.25rem',
              color: T.fg,
              lineHeight: 0,
              transition,
            }}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════
          MENU MOBILE (overlay)
          ══════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 99,
              backgroundColor: 'rgba(247,245,240,0.98)',
              backdropFilter: 'blur(20px)',
              paddingTop:    '4.5rem',
              paddingBottom: '2rem',
              paddingLeft:   'clamp(1.5rem, 6vw, 3rem)',
              paddingRight:  'clamp(1.5rem, 6vw, 3rem)',
              boxShadow: '0 8px 32px rgba(26,24,21,0.1)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); setMenuOpen(false); }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    color: '#1A1815',
                    textDecoration: 'none',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid var(--color-warm-grey-light)',
                    display: 'block',
                    lineHeight: 1.1,
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* ── Botões do menu mobile ── */}
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

              {currentUser ? (
                <>
                  <button
                    onClick={() => { window.location.href = '/dashboard'; }}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      letterSpacing: '-0.02em',
                      padding: '1rem 1.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-mark-red)',
                      color: '#F7F5F0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      outline: 'none',
                      width: '100%',
                    }}
                  >
                    <span>Acessar Painel</span>
                    <ArrowUpRight size={18} strokeWidth={1.8} />
                  </button>

                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '1rem',
                      letterSpacing: '-0.02em',
                      padding: '0.9rem 1.5rem',
                      border: '1px solid rgba(26,24,21,0.2)',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: '#3D3935',
                      cursor: 'pointer',
                      outline: 'none',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Sair da conta</span>
                    <ArrowUpRight size={16} strokeWidth={1.8} color="var(--color-mark-red)" />
                  </button>
                </>
              ) : (
                <>
                  {/* Criar galeria — destaque total, vermelho */}
                  <button
                    onClick={() => { onRegister(); setMenuOpen(false); }}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      letterSpacing: '-0.02em',
                      padding: '1rem 1.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: 'var(--color-mark-red)',
                      color: '#F7F5F0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      outline: 'none',
                      width: '100%',
                    }}
                  >
                    <span>Criar galeria</span>
                    <ArrowUpRight size={18} strokeWidth={1.8} />
                  </button>

                  {/* Entrar na Selezione — ghost serif */}
                  <button
                    onClick={() => { onLogin(); setMenuOpen(false); }}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontWeight: 600,
                      fontSize: '1rem',
                      letterSpacing: '-0.02em',
                      padding: '0.9rem 1.5rem',
                      border: '1px solid rgba(26,24,21,0.2)',
                      borderRadius: '4px',
                      backgroundColor: 'transparent',
                      color: '#3D3935',
                      cursor: 'pointer',
                      outline: 'none',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>Entrar na Selezione</span>
                    <ArrowUpRight size={16} strokeWidth={1.8} color="var(--color-mark-red)" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CSS responsivo ── */}
      <style>{`
        /* ≥ 860px: nav visível, hamburger oculto, cta visível */
        @media (min-width: 860px) {
          .header-nav-desktop   { display: flex !important; }
          .header-login-desktop { display: inline-flex !important; }
          .header-cta-desktop   { display: inline-flex !important; }
          .header-hamburger     { display: none !important; }
        }
        /* < 860px: nav oculta, hamburger visível, cta oculto no header */
        @media (max-width: 859px) {
          .header-nav-desktop   { display: none !important; }
          .header-login-desktop { display: none !important; }
          .header-cta-desktop   { display: none !important; }
          .header-hamburger     { display: flex !important; }
        }
        /* < 400px: ocultar "Menegassi" no wordmark para não quebrar */
        @media (max-width: 399px) {
          .header-brand-sub { display: none !important; }
        }
      `}</style>
    </>
  );
}

/* ─── NavLink simples com underline hover ─── */
function NavLink({ link, fgColor, hoverColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={link.href}
      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        textDecoration: 'none',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '0.88rem',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        color: hovered ? hoverColor : fgColor,
        transition: 'color 0.18s ease',
        padding: '0.15rem 0',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {link.label}
      {/* underline animado */}
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          backgroundColor: hovered ? hoverColor : 'transparent',
          transition: 'background-color 0.2s ease',
        }}
      />
    </a>
  );
}
