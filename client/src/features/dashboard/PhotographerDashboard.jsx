import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { http } from '../../services/http.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { DashboardHeader } from './components/DashboardHeader/DashboardHeader.jsx';
import { Toast } from './components/Toast/Toast.jsx';
import { GalleryList } from './components/GalleryList/GalleryList.jsx';
import { GalleryCreateModal } from './components/GalleryCreateModal/GalleryCreateModal.jsx';
import { SettingsModal } from './components/SettingsModal/SettingsModal.jsx';
import { PhotoUploader } from './components/PhotoUploader/PhotoUploader.jsx';
import { GalleryTabs } from './components/GalleryTabs/GalleryTabs.jsx';
import { PhotoGrid } from './components/PhotoGrid/PhotoGrid.jsx';
import { LoadingScreen } from '../../components/LoadingScreen/LoadingScreen.jsx';
import { AnimatePresence, motion } from 'framer-motion';

export function PhotographerDashboard() {
  const { currentUser, login, logout } = useAuth();
  
  const [galerias, setGalerias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedGaleria, setSelectedGaleria] = useState(null);
  const [galeriaFotos, setGaleriaFotos] = useState([]);
  const [activeTab, setActiveTab] = useState('todas');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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

  useEffect(() => {
    fetchGalerias().finally(() => {
      // Adicionando um pequeno delay para que a animação possa ser vista (pode remover depois)
      setTimeout(() => setInitialLoading(false), 1500);
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

  const fetchGaleriaFotos = async (galeriaId) => {
    try {
      const res = await http.get(`/api/galerias/${galeriaId}/fotos`);
      setGaleriaFotos(res.data.fotos || []);
    } catch (err) {
      console.error('Erro ao buscar fotos da galeria:', err);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!studioName.trim()) return;

    setSavingSettings(true);
    try {
      const res = await http.put('/api/auth/me', { nome: studioName.trim() });
      const updatedUser = res.data.user;
      login(updatedUser, localStorage.getItem('@studio:token'));
      showToast('Nome do estúdio atualizado com sucesso!');
      setIsSettingsOpen(false);
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

  const handleCreateGaleria = async (e) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    setCreating(true);
    try {
      await http.post('/api/galerias', { nome: novoNome });
      showToast('Galeria criada com sucesso!');
      setNovoNome('');
      setIsModalOpen(false);
      fetchGalerias();
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
      if (selectedGaleria?.id === id) setSelectedGaleria(null);
      fetchGalerias();
    } catch (err) {
      console.error('Erro ao excluir galeria:', err);
    }
  };

  const handleOpenGaleria = async (galeria) => {
    setSelectedGaleria(galeria);
    setActiveTab('todas');
    fetchGaleriaFotos(galeria.id);
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedGaleria) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('fotos', files[i]);
    }

    try {
      await http.post(`/api/galerias/${selectedGaleria.id}/fotos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      showToast(`${files.length} foto(s) enviada(s) com sucesso!`);
      fetchGaleriaFotos(selectedGaleria.id);
      fetchGalerias();
    } catch (err) {
      console.error('Erro no upload de fotos:', err);
      alert('Falha ao enviar fotos.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFoto = async (fotoId, e) => {
    e.stopPropagation();
    if (!window.confirm('Excluir esta foto?')) return;

    try {
      await http.delete(`/api/fotos/${fotoId}`);
      showToast('Foto excluída.');
      if (selectedGaleria) fetchGaleriaFotos(selectedGaleria.id);
    } catch (err) {
      console.error('Erro ao excluir foto:', err);
    }
  };

  const copyPublicLink = (slug) => {
    const publicUrl = `${window.location.origin}/galeria/${slug}`;
    navigator.clipboard.writeText(publicUrl);
    showToast('Link do cliente copiado para a área de transferência!');
  };

  const filteredFotos = activeTab === 'selecionadas'
    ? galeriaFotos.filter(f => f.selecionada)
    : galeriaFotos;

  return (
    <AnimatePresence mode="wait">
      {initialLoading ? (
        <LoadingScreen key="loading" message="Abrindo o seu estúdio..." />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: '100vh', backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}
        >
          <Toast message={toastMsg} />

          <DashboardHeader
        currentUser={currentUser}
        selectedGaleria={selectedGaleria}
        onBack={() => setSelectedGaleria(null)}
        onNewGallery={() => setIsModalOpen(true)}
        onSettings={() => { setStudioName(currentUser?.nome || ''); setIsSettingsOpen(true); }}
        onLogout={logout}
      />

      <main style={{ padding: '1.5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        {!selectedGaleria ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', marginTop: '0.2rem' }}>
                Seus Ensaios Fotográficos
              </h1>
            </div>

            <GalleryList
              galerias={galerias}
              loading={loading}
              onOpen={handleOpenGaleria}
              onCopyLink={copyPublicLink}
              onDelete={handleDeleteGaleria}
              onNewGallery={() => setIsModalOpen(true)}
            />
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="frame-tag">GERENCIADOR DE GALERIA</span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', marginTop: '0.2rem' }}>
                  {selectedGaleria.nome}
                </h1>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-grey)', wordBreak: 'break-all' }}>
                  LINK PÚBLICO: {window.location.origin}/galeria/{selectedGaleria.link_publico}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => copyPublicLink(selectedGaleria.link_publico)}
                  className="btn-mark"
                >
                  <Copy size={16} /> Copiar Link do Cliente
                </button>
              </div>
            </div>

            <PhotoUploader uploading={uploading} onFileChange={handleFileUpload} />

            <GalleryTabs
              activeTab={activeTab}
              totalFotos={galeriaFotos.length}
              totalSelecionadas={galeriaFotos.filter(f => f.selecionada).length}
              onTabChange={setActiveTab}
            />

            <PhotoGrid
              fotos={filteredFotos}
              activeTab={activeTab}
              onDeleteFoto={handleDeleteFoto}
            />
          </div>
        )}
      </main>

      <GalleryCreateModal
        isOpen={isModalOpen}
        novoNome={novoNome}
        creating={creating}
        onChange={(e) => setNovoNome(e.target.value)}
        onSubmit={handleCreateGaleria}
        onClose={() => setIsModalOpen(false)}
      />

          <SettingsModal
            isOpen={isSettingsOpen}
            studioName={studioName}
            saving={savingSettings}
            onChange={(e) => setStudioName(e.target.value)}
            onSubmit={handleUpdateProfile}
            onClose={() => setIsSettingsOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
