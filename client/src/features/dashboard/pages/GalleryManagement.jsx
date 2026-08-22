import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { http } from '../../../services/http.js';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { Toast } from '../components/Toast/Toast.jsx';
import { GalleryEditModal } from '../components/GalleryEditModal/GalleryEditModal.jsx';
import { GalleryPasswordModal } from '../components/GalleryPasswordModal/GalleryPasswordModal.jsx';
import { PhotoUploader } from '../components/PhotoUploader/PhotoUploader.jsx';
import { GalleryTabs } from '../components/GalleryTabs/GalleryTabs.jsx';
import { PhotoGrid } from '../components/PhotoGrid/PhotoGrid.jsx';
import { LoadingScreen } from '../../../components/LoadingScreen/LoadingScreen.jsx';
import { motion } from 'framer-motion';

export function GalleryManagement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [galeria, setGaleria] = useState(null);
  const [todasGalerias, setTodasGalerias] = useState([]);
  const [galeriaFotos, setGaleriaFotos] = useState([]);
  const [activeTab, setActiveTab] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCota, setEditCota] = useState(10);
  const [editing, setEditing] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editPassword, setEditPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

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
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [galeriasRes, fotosRes] = await Promise.all([
        http.get('/api/galerias'),
        http.get(`/api/galerias/${id}/fotos`)
      ]);
      
      const todas = galeriasRes.data.galerias || [];
      setTodasGalerias(todas);
      
      const currentGaleria = todas.find(g => g.id === id);
      if (!currentGaleria) {
        navigate('/dashboard');
        return;
      }
      setGaleria(currentGaleria);
      setGaleriaFotos(fotosRes.data.fotos || []);
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const refetchGalerias = async () => {
    try {
      const res = await http.get('/api/galerias');
      const todas = res.data.galerias || [];
      setTodasGalerias(todas);
      const currentGaleria = todas.find(g => g.id === id);
      if (currentGaleria) setGaleria(currentGaleria);
    } catch (err) {
      console.error('Erro ao atualizar galerias', err);
    }
  };

  const refetchFotos = async () => {
    try {
      const res = await http.get(`/api/galerias/${id}/fotos`);
      setGaleriaFotos(res.data.fotos || []);
    } catch (err) {
      console.error('Erro ao atualizar fotos', err);
    }
  };

  const handleToggleStatus = async () => {
    if (!galeria) return;
    try {
      const newStatus = !galeria.is_active;
      await http.patch(`/api/galerias/${galeria.id}/status`, { isActive: newStatus });
      showToast(newStatus ? 'Galeria definida como Disponível.' : 'Galeria definida como Privada.');
      refetchGalerias();
    } catch (err) {
      console.error('Erro ao atualizar status:', err);
      alert('Falha ao atualizar o status da galeria.');
    }
  };

  const handleOpenEditGaleria = () => {
    if (!galeria) return;
    setEditCota(Math.floor(galeria.tamanho_alocado_bytes / (1024 * 1024)));
    setIsEditModalOpen(true);
  };

  const handleEditGaleria = async (e) => {
    e.preventDefault();
    if (!galeria) return;

    setEditing(true);
    try {
      const tamanho_alocado_bytes = Math.floor(editCota * 1024 * 1024);
      await http.put(`/api/galerias/${galeria.id}`, { tamanho_alocado_bytes });
      showToast('Cota da galeria atualizada com sucesso!');
      setIsEditModalOpen(false);
      refetchGalerias();
    } catch (err) {
      console.error('Erro ao editar galeria:', err);
      const msg = err.response?.data?.error || 'Falha ao editar a galeria.';
      alert(msg);
    } finally {
      setEditing(false);
    }
  };

  const handleOpenPasswordModal = () => {
    if (!galeria) return;
    setEditPassword(galeria.senha_hash ? '********' : '');
    setIsPasswordModalOpen(true);
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!galeria) return;

    if (galeria.senha_hash && editPassword === '********') {
      setIsPasswordModalOpen(false);
      return;
    }

    setSavingPassword(true);
    try {
      await http.patch(`/api/galerias/${galeria.id}/password`, { password: editPassword });
      showToast('Senha da galeria atualizada com sucesso!');
      setIsPasswordModalOpen(false);
      refetchGalerias();
    } catch (err) {
      console.error('Erro ao atualizar senha:', err);
      const msg = err.response?.data?.error || 'Falha ao atualizar a senha.';
      alert(msg);
    } finally {
      setSavingPassword(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0 || !galeria) return;

    setUploading(true);
    const BATCH_SIZE = 100;
    
    try {
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const chunk = files.slice(i, i + BATCH_SIZE);
        const formData = new FormData();
        
        for (let j = 0; j < chunk.length; j++) {
          formData.append('fotos', chunk[j]);
        }

        await http.post(`/api/galerias/${galeria.id}/fotos`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      showToast(`${files.length} foto(s) enviada(s) com sucesso!`);
      refetchFotos();
      refetchGalerias();
    } catch (err) {
      console.error('Erro no upload de fotos:', err);
      const msg = err.response?.data?.error || 'Falha ao enviar fotos. Parte do envio pode ter falhado.';
      alert(msg);
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  const handleDeleteFoto = async (fotoId, e) => {
    e.stopPropagation();
    if (!window.confirm('Excluir esta foto?')) return;

    try {
      await http.delete(`/api/fotos/${fotoId}`);
      showToast('Foto excluída.');
      refetchFotos();
      refetchGalerias();
    } catch (err) {
      console.error('Erro ao excluir foto:', err);
    }
  };

  const copyPublicLink = (slug) => {
    const publicUrl = `${window.location.origin}/galeria/${slug}`;
    navigator.clipboard.writeText(publicUrl);
    showToast('Link do cliente copiado para a área de transferência!');
  };

  if (loading || !galeria) {
    return <LoadingScreen message="Carregando galeria..." />;
  }

  const filteredFotos = activeTab === 'selecionadas'
    ? galeriaFotos.filter(f => f.selecionada)
    : galeriaFotos;

  const totalDistribuido = todasGalerias.reduce((acc, g) => acc + g.tamanho_alocado_bytes, 0);
  const armazenamentoLivreBytes = currentUser ? Math.max(0, currentUser.armazenamento_total_bytes - totalDistribuido) : 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Toast message={toastMsg} />
      
      <div>
        <div>
          <div>
            <span>
              GERENCIADOR DE GALERIA
            </span>
            <h1>
              {galeria.nome}
            </h1>
            <p>
              LINK PÚBLICO: {window.location.origin}/galeria/{galeria.link_publico}
            </p>
          </div>

          <div>
            {galeria.tamanho_alocado_bytes > 0 && (
              <div>
                <div>
                  <span>Uso da Galeria:</span>
                  <span>{formatBytes(galeria.tamanho_usado_bytes)} / {formatBytes(galeria.tamanho_alocado_bytes)}</span>
                </div>
                <div>
                    <div />
                </div>
              </div>
            )}
            
            <button
              onClick={handleOpenEditGaleria}
             
            >
              Editar Cota
            </button>
            <button
              onClick={handleOpenPasswordModal}
             
            >
               Senha
            </button>
            <button
              onClick={() => copyPublicLink(galeria.link_publico)}
             
            >
               Copiar Link do Cliente
            </button>
            <button
              onClick={handleToggleStatus}
             
            >

              {galeria.is_active ? 'Ocultar' : 'Disponibilizar'}
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

      <GalleryEditModal
        isOpen={isEditModalOpen}
        galeria={galeria}
        novaCota={editCota}
        armazenamentoLivreBytes={armazenamentoLivreBytes}
        editing={editing}
        onChangeCota={(e) => setEditCota(e.target.value)}
        onSubmit={handleEditGaleria}
        onClose={() => setIsEditModalOpen(false)}
        formatBytes={formatBytes}
      />

      <GalleryPasswordModal
        isOpen={isPasswordModalOpen}
        galeria={galeria}
        novaSenha={editPassword}
        saving={savingPassword}
        onChangeSenha={(e) => setEditPassword(e.target.value)}
        onSubmit={handleSavePassword}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </motion.div>
  );
}
