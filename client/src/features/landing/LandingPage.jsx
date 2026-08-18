import React, { useState } from 'react';
import { LandingHeader } from './components/LandingHeader/LandingHeader.jsx';
import { HeroSection } from './components/HeroSection/HeroSection.jsx';
import { ContactSheetDemo } from './components/ContactSheetDemo/ContactSheetDemo.jsx';
import { HowItWorksSection } from './components/HowItWorksSection/HowItWorksSection.jsx';
import { LandingFooter } from './components/LandingFooter/LandingFooter.jsx';
import { AuthModal } from '../auth/components/AuthModal/AuthModal.jsx';

export function LandingPage({ onLoginSuccess }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <LandingHeader
        onLogin={() => openAuth('login')}
        onRegister={() => openAuth('register')}
      />

      {/* Hero Section */}
      <section style={{ padding: '2.5rem 1rem 3.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <HeroSection onRegister={() => openAuth('register')} />
        <ContactSheetDemo />
      </section>

      <HowItWorksSection />

      <LandingFooter />

      {/* Modal de Autenticação */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          if (onLoginSuccess) onLoginSuccess(user);
        }}
      />
    </div>
  );
}
