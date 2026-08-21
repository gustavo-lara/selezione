import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { LandingHeader } from './components/LandingHeader/LandingHeader.jsx';
import { HeroSection } from './components/HeroSection/HeroSection.jsx';
import { WhatIsSection } from './components/WhatIsSection/WhatIsSection.jsx';
import { HowItWorksSection } from './components/HowItWorksSection/HowItWorksSection.jsx';
import { ForWhoSection } from './components/ForWhoSection/ForWhoSection.jsx';
import { ContactSheetDemo } from './components/ContactSheetDemo/ContactSheetDemo.jsx';
import { CTASection } from './components/CTASection/CTASection.jsx';
import { LandingFooter } from './components/LandingFooter/LandingFooter.jsx';
import { AuthModal } from '../auth/components/AuthModal/AuthModal.jsx';
import { LoadingScreen } from '../../components/LoadingScreen/LoadingScreen.jsx';
import { AnimatePresence } from 'framer-motion';

export function LandingPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openAuth = (mode = 'login') => {
    if (currentUser) {
      navigate('/dashboard');
      return;
    }
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      {/* Header fixo — flutua sobre tudo */}
      <LandingHeader
        onLogin={() => openAuth('login')}
        onRegister={() => openAuth('register')}
      />

      {/* ── Hero sticky: fica fixo enquanto as seções sobem por cima ── */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
        <HeroSection onRegister={() => openAuth('register')} />
      </div>

      {/* ── Conteúdo deslizante: z-index 2 → cobre o hero ao scrollar ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* 2. O QUE É */}
        <WhatIsSection />

        {/* 3. COMO FUNCIONA */}
        <div id="como-funciona"><HowItWorksSection /></div>

        {/* 4. PARA QUEM */}
        <div id="para-quem"><ForWhoSection /></div>

        {/* 5. DEMO */}
        <ContactSheetDemo />

        {/* 6. CTA FINAL */}
        <CTASection onRegister={() => openAuth('register')} />

        {/* 7. FOOTER */}
        <LandingFooter />
      </div>

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => {
          if (!isTransitioning) setIsAuthOpen(false);
        }}
        onSuccess={() => {
          // Bloqueia o fechamento do modal e aciona a tela preta de transição por cima dele
          setIsTransitioning(true);
          
          // Aguarda o tempo do fade-in da LoadingScreen (aprox 600ms) antes de pular pro dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 600);
        }}
      />

      {/* Tela de transição cinematográfica injetada por cima do modal aberto */}
      <AnimatePresence>
        {isTransitioning && (
          <LoadingScreen message="Autenticando..." fadeIn={true} />
        )}
      </AnimatePresence>
    </div>
  );
}
