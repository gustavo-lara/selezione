import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, ArrowLeft } from 'lucide-react';
import { http } from '../../services/http.js';
import { GalleryHeader } from './components/GalleryHeader/GalleryHeader.jsx';
import { PhotoGrid } from './components/PhotoGrid/PhotoGrid.jsx';
import { PhotoLightbox } from './components/PhotoLightbox/PhotoLightbox.jsx';
import { SubmitModal } from './components/SubmitModal/SubmitModal.jsx';

export function PublicGallery() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [galeria, setGaleria] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPublicData();
    }
  }, [slug]);

  const fetchPublicData = async () => {
    setLoading(true);
    setError('');
    try {
      const galeriaRes = await http.get(`/api/galerias/public/${slug}`);
      const galeriaData = galeriaRes.data.galeria;
      setGaleria(galeriaData);

      const token = sessionStorage.getItem(`clientToken_${slug}`);
      
      if (galeriaData.isProtected && !token) {
         setLoading(false);
         return;
      }

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const fotosRes = await http.get(`/api/public/${slug}/fotos`, { headers });
      setFotos(fotosRes.data.fotos || []);
    } catch (err) {
      console.error('Erro ao carregar galeria pública:', err);
      if (err.response && err.response.status === 403) {
        setError('Esta galeria está indisponível no momento.');
      } else if (err.response && err.response.status === 401) {
        sessionStorage.removeItem(`clientToken_${slug}`);
        setGaleria(prev => prev ? { ...prev, isProtected: true } : { isProtected: true });
        setLoading(false);
        return;
      } else {
        setError('Galeria não encontrada ou link inválido.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticate = async (e) => {
    e.preventDefault();
    setAuthenticating(true);
    setAuthError('');
    try {
      const res = await http.post(`/api/galerias/public/${slug}/auth`, { password });
      sessionStorage.setItem(`clientToken_${slug}`, res.data.token);
      await fetchPublicData();
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Senha incorreta');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleToggleSelecao = async (fotoId, e) => {
    if (e) e.stopPropagation();

    setFotos(prevFotos =>
      prevFotos.map(f =>
        f.id === fotoId ? { ...f, selecionada: !f.selecionada } : f
      )
    );

    try {
      const token = sessionStorage.getItem(`clientToken_${slug}`);
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await http.post(`/api/fotos/${fotoId}/selecao`, {}, { headers });
      const updatedSelecao = res.data.selecao;
      setFotos(prevFotos =>
        prevFotos.map(f =>
          f.id === fotoId ? { ...f, selecionada: updatedSelecao.aprovado } : f
        )
      );
    } catch (err) {
      console.error('Erro ao alternar seleção:', err);
      fetchPublicData();
    }
  };

  const selectedCount = fotos.filter(f => f.selecionada).length;

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex !== null && activePhotoIndex < fotos.length - 1) {
      setActivePhotoIndex(activePhotoIndex + 1);
    }
  };

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    if (activePhotoIndex !== null && activePhotoIndex > 0) {
      setActivePhotoIndex(activePhotoIndex - 1);
    }
  };

  if (loading) {
    return (
      <div >
        Carregando...
      </div>
    );
  }

  if (error || !galeria) {
    return (
      <div >
        <Camera size={48} color="var(--color-mark-red)"  />
        <h2 >
          {error === 'Esta galeria está indisponível no momento.' ? 'Galeria Indisponível' : 'Galeria Não Encontrada'}
        </h2>
        <p >
          {error || 'O link que você acessou não existe ou foi desativado.'}
        </p>
        <button onClick={() => navigate('/')} >
          <ArrowLeft size={16} /> Voltar à Página Inicial
        </button>
      </div>
    );
  }

  if (galeria?.isProtected && !sessionStorage.getItem(`clientToken_${slug}`)) {
    return (
      <div>
        <h2>Galeria Protegida</h2>
        <p>Esta galeria requer uma senha para ser acessada.</p>
        <form onSubmit={handleAuthenticate}>
          <input 
            type="password" 
            placeholder="Digite a senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError && <span>{authError}</span>}
          <button 
            type="submit" 
            disabled={authenticating}
          >
            {authenticating ? 'Verificando...' : 'Acessar Galeria'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div >
      <GalleryHeader
        galeria={galeria}
        selectedCount={selectedCount}
        totalFotos={fotos.length}
        onSubmit={() => setIsSubmitModalOpen(true)}
      />

      <main >
        <div >
          <p >
            CLIQUE NO ÍCONE DE CORAÇÃO OU NA FOTO PARA MARCAR SUA ESCOLHA
          </p>
        </div>

        <PhotoGrid
          fotos={fotos}
          onSelectPhoto={setActivePhotoIndex}
          onToggleSelecao={handleToggleSelecao}
        />
      </main>

      <PhotoLightbox
        fotos={fotos}
        activeIndex={activePhotoIndex}
        onClose={() => setActivePhotoIndex(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
        onToggleSelecao={handleToggleSelecao}
      />

      <SubmitModal
        isOpen={isSubmitModalOpen}
        submitted={submitted}
        selectedCount={selectedCount}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={() => setSubmitted(true)}
      />
    </div>
  );
}
