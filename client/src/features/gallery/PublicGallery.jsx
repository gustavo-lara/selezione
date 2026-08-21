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
      setGaleria(galeriaRes.data.galeria);

      const fotosRes = await http.get(`/api/public/${slug}/fotos`);
      setFotos(fotosRes.data.fotos || []);
    } catch (err) {
      console.error('Erro ao carregar galeria pública:', err);
      setError('Galeria não encontrada ou link inválido.');
    } finally {
      setLoading(false);
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
      const res = await http.post(`/api/fotos/${fotoId}/selecao`);
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
      <div style={{
        minHeight: '100vh', backgroundColor: 'var(--color-paper)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', color: 'var(--color-warm-grey)'
      }}>
        Carregando...
      </div>
    );
  }

  if (error || !galeria) {
    return (
      <div style={{
        minHeight: '100vh', backgroundColor: 'var(--color-paper)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', textAlign: 'center'
      }}>
        <Camera size={48} color="var(--color-mark-red)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>
          Galeria Não Encontrada
        </h2>
        <p style={{ color: 'var(--color-warm-grey)', marginBottom: '1.5rem' }}>
          {error || 'O link que você acessou não existe ou foi desativado.'}
        </p>
        <button onClick={() => navigate('/')} className="btn-primary">
          <ArrowLeft size={16} /> Voltar à Página Inicial
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-paper)', color: 'var(--color-ink)' }}>
      <GalleryHeader
        galeria={galeria}
        selectedCount={selectedCount}
        totalFotos={fotos.length}
        onSubmit={() => setIsSubmitModalOpen(true)}
      />

      <main style={{ padding: '1.5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-warm-grey)' }}>
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
