import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/landing/index.js';
import { PhotographerDashboard } from './features/dashboard/index.js';
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
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <PhotographerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/galeria/:slug" element={<PublicGallery />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
