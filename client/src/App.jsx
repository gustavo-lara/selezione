import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/landing/index.js';
import { PhotographerDashboard, DashboardHome, GalleryManagement, DashboardSettings } from './features/dashboard/index.js';
import { PublicGallery } from './features/gallery/index.js';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProtectedRoute } from './components/routing/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PhotographerDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="galeria/:id" element={<GalleryManagement />} />
        <Route path="configuracoes" element={<DashboardSettings />} />
      </Route>
      <Route path="/galeria/:slug" element={<PublicGallery />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
