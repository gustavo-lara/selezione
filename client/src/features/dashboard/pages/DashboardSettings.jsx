import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
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
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <Toast message={toastMsg} />
      
      <div style={{ background: 'var(--color-paper)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-warm-grey-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Settings size={20} color="var(--color-mark-red)" />
          <h3 style={{ margin: 0 }}>Configurações do Estúdio</h3>
        </div>

        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-warm-grey)' }}>
              Nome do Fotógrafo / Nome do Estúdio
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Meu Studio"
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-warm-grey-light)', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button
              type="submit"
              disabled={savingSettings}
              style={{ background: 'var(--color-mark-red)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 600, opacity: savingSettings ? 0.7 : 1 }}
            >
              {savingSettings ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
