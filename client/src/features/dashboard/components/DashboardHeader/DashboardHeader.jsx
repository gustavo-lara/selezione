import React from 'react';
import { Camera, Plus, ArrowLeft, Settings, LogOut } from 'lucide-react';

export function DashboardHeader({ currentUser, selectedGaleria, onBack, onNewGallery, onSettings, onLogout }) {
  return (
    <header >
      <div >
        <div >
          {selectedGaleria && (
            <button
              onClick={onBack}
              
              
            >
              <ArrowLeft size={16} /> <span >Voltar</span>
            </button>
          )}
          <div >
            <div >
              <Camera size={18} />
            </div>
            <div >
              <span >
                {currentUser?.nome || 'Estúdio Fotográfico'}
              </span>
              <span >
                PAINEL DO FOTÓGRAFO
              </span>
            </div>
          </div>
        </div>

        <div >
          {!selectedGaleria && (
            <button
              onClick={onNewGallery}
              
              
            >
              <Plus size={16} /> <span >Nova Galeria</span>
            </button>
          )}
          <button
            onClick={onSettings}
            
            
            title="Configurações do Estúdio"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={onLogout}
            
            
            title="Sair do Sistema"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
