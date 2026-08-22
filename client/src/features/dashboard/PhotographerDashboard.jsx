import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { DashboardHeader } from './components/DashboardHeader/DashboardHeader.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export function PhotographerDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <DashboardHeader
          currentUser={currentUser}
          selectedGaleria={!isHome} 
          onBack={() => navigate('/dashboard')}
          onSettings={() => navigate('/dashboard/configuracoes')}
          onLogout={logout}
        />

        <main>
          {/* This is where the nested routes will render */}
          <Outlet />
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
