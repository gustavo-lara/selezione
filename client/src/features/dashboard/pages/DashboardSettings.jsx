import React, { useState, useEffect } from 'react';

import { useAuth } from '../../../contexts/AuthContext.jsx';
import { http } from '../../../services/http.js';
import { Toast } from '../components/Toast/Toast.jsx';

export function DashboardSettings() {
  const { currentUser, login, logout } = useAuth();
  const [studioName, setStudioName] = useState(currentUser?.nome || '');
  const [savingSettings, setSavingSettings] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  useEffect(() => {
    if (currentUser?.nome) setStudioName(currentUser.nome);
  }, [currentUser]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!studioName.trim()) return;

    setSavingSettings(true);
    try {
      const res = await http.put('/api/auth/me', { nome: studioName.trim() });
      const updatedUser = res.data.user;
      login(updatedUser, localStorage.getItem('@studio:token'));
      showToast('Nome do estúdio atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      if (err.response?.status === 401) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        logout();
        return;
      }
      const msg = err.response?.data?.details?.[0] || err.response?.data?.error || err.message || 'Falha ao atualizar nome do estúdio.';
      alert(`Falha ao atualizar nome: ${msg}`);
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div>
      <Toast message={toastMsg} />
      
      <div>
        <div>
          
          <h3>Configurações do Estúdio</h3>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div>
            <label>
              Nome do Fotógrafo / Nome do Estúdio
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Meu Studio"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
             
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={savingSettings}
             
            >
              {savingSettings ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
