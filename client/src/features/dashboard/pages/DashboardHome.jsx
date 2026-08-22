import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../../services/http.js';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { Toast } from '../components/Toast/Toast.jsx';
import { GalleryList } from '../components/GalleryList/GalleryList.jsx';
import { GalleryCreateModal } from '../components/GalleryCreateModal/GalleryCreateModal.jsx';
import { LoadingScreen } from '../../../components/LoadingScreen/LoadingScreen.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardHome() {
  const { currentUser, login, logout } = useAuth();
  const navigate = useNavigate();

  const [galerias, setGalerias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novaCota, setNovaCota] = useState(10);
  const [creating, setCreating] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    fetchGalerias().finally(() => {
      setTimeout(() => setInitialLoading(false), 500);
    });
  }, []);

  const fetchGalerias = async () => {
    setLoading(true);
    try {
      const res = await http.get('/api/galerias');
      setGalerias(res.data.galerias || []);
    } catch (err) {
      console.error('Erro ao buscar galerias:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGaleria = async (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    setCreating(true);
    try {
      const tamanho_alocado_bytes = Math.floor(novaCota * 1024 * 1024);
      await http.post('/api/galerias', { nome: novoNome, tamanho_alocado_bytes });
      showToast('Galeria criada com sucesso!');
      setNovoNome('');
      setNovaCota(10);
      setIsModalOpen(false);
      fetchGalerias();
      
      const userRes = await http.get('/api/auth/me');
      login(userRes.data.user, localStorage.getItem('@studio:token'));
    } catch (err) {
      console.error('Erro ao criar galeria:', err);
      if (err.response?.status === 401) {
        alert('Sua sessão expirou. Por favor, faça login novamente.');
        logout();
        return;
      }
      const msg = err.response?.data?.details?.[0] || err.response?.data?.error || 'Erro ao comunicar com a API.';
      alert(`Falha ao criar galeria: ${msg}`);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteGaleria = async (id, name) => {
    if (!window.confirm(`Tem certeza que deseja excluir a galeria "${name}"?`)) return;
    try {
      await http.delete(`/api/galerias/${id}`);
      showToast('Galeria excluída com sucesso.');
      fetchGalerias();
    } catch (err) {
      console.error('Erro ao excluir galeria:', err);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await http.patch(`/api/galerias/${id}/status`, { isActive: newStatus });
      showToast(newStatus ? 'Galeria definida como Disponível.' : 'Galeria definida como Privada.');
      fetchGalerias();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Falha ao atualizar o status da galeria.');
    }
  };

  const handleOpenGaleria = (galeria) => {
    navigate(`/dashboard/galeria/${galeria.id}`);
  };

  const copyPublicLink = (slug) => {
    const publicUrl = `${window.location.origin}/galeria/${slug}`;
    navigator.clipboard.writeText(publicUrl);
    showToast('Link do cliente copiado para a área de transferência!');
  };

  const totalDistribuido = galerias.reduce((acc, g) => acc + g.tamanho_alocado_bytes, 0);
  const totalFisico = galerias.reduce((acc, g) => acc + g.tamanho_usado_bytes, 0);
  const armazenamentoLivreBytes = currentUser ? Math.max(0, currentUser.armazenamento_total_bytes - totalDistribuido) : 0;

  const handleOpenCreateModal = () => {
    const maxPossivel = Math.floor(armazenamentoLivreBytes / (1024 * 1024));
    setNovaCota(Math.min(10, Math.max(1, maxPossivel)));
    setIsModalOpen(true);
  };

  if (initialLoading) {
    return <LoadingScreen message="Carregando suas galerias..." />;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Toast message={toastMsg} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-ink)' }}>
            Seus Ensaios Fotográficos
          </h1>

          {currentUser && currentUser.armazenamento_total_bytes > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ background: 'var(--color-paper)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-warm-grey-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-warm-grey)' }}>Cota Distribuída</span>
                  <span style={{ fontWeight: 600 }}>{formatBytes(totalDistribuido)} / {formatBytes(currentUser.armazenamento_total_bytes)}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--color-warm-grey-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (totalDistribuido / currentUser.armazenamento_total_bytes) * 100)}%`, height: '100%', background: 'var(--color-mark-red)' }} />
                </div>
              </div>

              <div style={{ background: 'var(--color-paper)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-warm-grey-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-warm-grey)' }}>Uso Físico Real</span>
                  <span style={{ fontWeight: 600 }}>{formatBytes(totalFisico)} / {formatBytes(currentUser.armazenamento_total_bytes)}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--color-warm-grey-light)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (totalFisico / currentUser.armazenamento_total_bytes) * 100)}%`, height: '100%', background: 'var(--color-mark-red)' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <GalleryList
          galerias={galerias}
          loading={loading}
          onOpen={handleOpenGaleria}
          onCopyLink={copyPublicLink}
          onDelete={handleDeleteGaleria}
          onToggleStatus={handleToggleStatus}
          onNewGallery={handleOpenCreateModal}
          formatBytes={formatBytes}
        />
      </div>

      <GalleryCreateModal
        isOpen={isModalOpen}
        novoNome={novoNome}
        novaCota={novaCota}
        armazenamentoLivreBytes={armazenamentoLivreBytes}
        creating={creating}
        onChange={(e) => setNovoNome(e.target.value)}
        onChangeCota={(e) => setNovaCota(e.target.value)}
        onSubmit={handleCreateGaleria}
        onClose={() => setIsModalOpen(false)}
        formatBytes={formatBytes}
      />
    </motion.div>
  );
}
