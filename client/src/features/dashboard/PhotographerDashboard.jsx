import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { http } from '../../services/http.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { DashboardHeader } from './components/DashboardHeader/DashboardHeader.jsx';
import { Toast } from './components/Toast/Toast.jsx';
import { GalleryList } from './components/GalleryList/GalleryList.jsx';
import { GalleryCreateModal } from './components/GalleryCreateModal/GalleryCreateModal.jsx';
import { GalleryEditModal } from './components/GalleryEditModal/GalleryEditModal.jsx';
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
  const [novaCota, setNovaCota] = useState(10); // Default 10 MB
  const [creating, setCreating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCota, setEditCota] = useState(10);
  const [editing, setEditing] = useState(false);

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

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
      const fetched = res.data.galerias || [];
      setGalerias(fetched);
      setSelectedGaleria(prev => {
        if (!prev) return null;
        return fetched.find(g => g.id === prev.id) || prev;
      });
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
      const tamanho_alocado_bytes = Math.floor(novaCota * 1024 * 1024);
      await http.post('/api/galerias', { nome: novoNome, tamanho_alocado_bytes });
      showToast('Galeria criada com sucesso!');
      setNovoNome('');
      setNovaCota(10);
      setIsModalOpen(false);
      fetchGalerias();
      // Atualizar o storage global no contexto auth
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

  const handleOpenCreateModal = () => {
    const maxPossivel = Math.floor(armazenamentoLivreBytes / (1024 * 1024));
    setNovaCota(Math.min(10, Math.max(1, maxPossivel)));
    setIsModalOpen(true);
  };

  const handleOpenEditGaleria = () => {
    if (!selectedGaleria) return;
    setEditCota(Math.floor(selectedGaleria.tamanho_alocado_bytes / (1024 * 1024)));
    setIsEditModalOpen(true);
  };

  const handleEditGaleria = async (e) => {
    e.preventDefault();
    if (!selectedGaleria) return;

    setEditing(true);
    try {
      const tamanho_alocado_bytes = Math.floor(editCota * 1024 * 1024);
      await http.put(`/api/galerias/${selectedGaleria.id}`, { tamanho_alocado_bytes });
      showToast('Cota da galeria atualizada com sucesso!');
      setIsEditModalOpen(false);
      fetchGalerias();
    } catch (err) {
      console.error('Erro ao editar galeria:', err);
      const msg = err.response?.data?.error || 'Falha ao editar a galeria.';
      alert(msg);
    } finally {
      setEditing(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0 || !selectedGaleria) return;

    setUploading(true);
    const BATCH_SIZE = 100;
    
    try {
      // Divide os arquivos em lotes (chunks) de 100
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const chunk = files.slice(i, i + BATCH_SIZE);
        const formData = new FormData();
        
        for (let j = 0; j < chunk.length; j++) {
          formData.append('fotos', chunk[j]);
        }

        // Aguarda o envio de cada lote para não sobrecarregar o servidor
        await http.post(`/api/galerias/${selectedGaleria.id}/fotos`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      showToast(`${files.length} foto(s) enviada(s) com sucesso!`);
      fetchGaleriaFotos(selectedGaleria.id);
      fetchGalerias(); // para atualizar os bytes usados no backend e depois atualizamos a local
    } catch (err) {
      console.error('Erro no upload de fotos:', err);
      const msg = err.response?.data?.error || 'Falha ao enviar fotos. Parte do envio pode ter falhado.';
      alert(msg);
    } finally {
      setUploading(false);
      // Limpa o input para garantir que o evento onChange dispare caso o usuário selecione os mesmos arquivos
      e.target.value = null;
    }
  };

  const handleDeleteFoto = async (fotoId, e) => {
    e.stopPropagation();
    if (!window.confirm('Excluir esta foto?')) return;

    try {
      await http.delete(`/api/fotos/${fotoId}`);
      showToast('Foto excluída.');
      if (selectedGaleria) fetchGaleriaFotos(selectedGaleria.id);
      fetchGalerias();
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

  const totalDistribuido = galerias.reduce((acc, g) => acc + g.tamanho_alocado_bytes, 0);
  const totalFisico = galerias.reduce((acc, g) => acc + g.tamanho_usado_bytes, 0);
  const armazenamentoLivreBytes = currentUser ? Math.max(0, currentUser.armazenamento_total_bytes - totalDistribuido) : 0;

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
          
        >
          <Toast message={toastMsg} />

          <DashboardHeader
        currentUser={currentUser}
        selectedGaleria={selectedGaleria}
        onBack={() => setSelectedGaleria(null)}
        onNewGallery={handleOpenCreateModal}
        onSettings={() => { setStudioName(currentUser?.nome || ''); setIsSettingsOpen(true); }}
        onLogout={logout}
      />

      <main >
        {!selectedGaleria ? (
          <div>
            <div >
              <h1 >
                Seus Ensaios Fotográficos
              </h1>

              {currentUser && currentUser.armazenamento_total_bytes > 0 && (
                <div >
                  {/* Cota Alocada (Distribuída nas galerias) */}
                  <div >
                    <div >
                      <span >Cota Distribuída</span>
                      <span >{formatBytes(totalDistribuido)} / {formatBytes(currentUser.armazenamento_total_bytes)}</span>
                    </div>
                    <div >
                      <div  />
                    </div>
                  </div>

                  {/* Espaço Físico Real (Ocupado por fotos) */}
                  <div >
                    <div >
                      <span >Uso Físico Real</span>
                      <span >{formatBytes(totalFisico)} / {formatBytes(currentUser.armazenamento_total_bytes)}</span>
                    </div>
                    <div >
                      <div  />
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
              onNewGallery={handleOpenCreateModal}
              formatBytes={formatBytes}
            />
          </div>
        ) : (
          <div>
            <div >
              <div>
                <span >GERENCIADOR DE GALERIA</span>
                <h1 >
                  {selectedGaleria.nome}
                </h1>
                <p >
                  LINK PÚBLICO: {window.location.origin}/galeria/{selectedGaleria.link_publico}
                </p>
              </div>

              <div >
                {selectedGaleria.tamanho_alocado_bytes > 0 && (
                  <div >
                    <div >
                      <span >Uso da Galeria:</span>
                      <span>{formatBytes(selectedGaleria.tamanho_usado_bytes)} / {formatBytes(selectedGaleria.tamanho_alocado_bytes)}</span>
                    </div>
                    <div >
                       <div  />
                    </div>
                  </div>
                )}
                <button
                  onClick={handleOpenEditGaleria}
                  
                  
                >
                  Editar Cota
                </button>
                <button
                  onClick={() => copyPublicLink(selectedGaleria.link_publico)}
                  
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
        novaCota={novaCota}
        armazenamentoLivreBytes={armazenamentoLivreBytes}
        creating={creating}
        onChange={(e) => setNovoNome(e.target.value)}
        onChangeCota={(e) => setNovaCota(e.target.value)}
        onSubmit={handleCreateGaleria}
        onClose={() => setIsModalOpen(false)}
        formatBytes={formatBytes}
      />

      <GalleryEditModal
        isOpen={isEditModalOpen}
        galeria={selectedGaleria}
        novaCota={editCota}
        armazenamentoLivreBytes={armazenamentoLivreBytes}
        editing={editing}
        onChangeCota={(e) => setEditCota(e.target.value)}
        onSubmit={handleEditGaleria}
        onClose={() => setIsEditModalOpen(false)}
        formatBytes={formatBytes}
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
