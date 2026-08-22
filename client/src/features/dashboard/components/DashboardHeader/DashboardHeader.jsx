import React from 'react';


export function DashboardHeader({ currentUser, selectedGaleria, onBack, onNewGallery, onSettings, onLogout }) {
  return (
    <header >
      <div >
        <div >
          {selectedGaleria && (
            <button
              onClick={onBack}
              
              
            >
               <span >Voltar</span>
            </button>
          )}
          <div >
            <div >
              
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
               <span >Nova Galeria</span>
            </button>
          )}
          <button
            onClick={onSettings}
            
            
            title="Configurações do Estúdio"
          >Configurações do Estúdio</button>
          <button
            onClick={onLogout}
            
            
            title="Sair do Sistema"
          >Sair do Sistema</button>
        </div>
      </div>
    </header>
  );
}
