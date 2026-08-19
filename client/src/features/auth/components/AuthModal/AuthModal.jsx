import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { http } from '../../../../services/http.js';

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setError('');
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin
        ? { email: formData.email, senha: formData.senha }
        : { nome: formData.nome, email: formData.email, senha: formData.senha };

      const response = await http.post(endpoint, payload);
      const { token, user } = response.data;

      localStorage.setItem('@studio:token', token);
      localStorage.setItem('@studio:user', JSON.stringify(user));

      onSuccess(user);
      onClose();
    } catch (err) {
      console.error('Erro na autenticação:', err);
      const msg = err.response?.data?.error || err.response?.data?.details?.[0] || 'Erro ao processar. Tente novamente.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 7, 6, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#F7F5F0',
              borderRadius: '8px',
              width: '100%',
              maxWidth: '900px',
              minHeight: '540px',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
            }}
          >
            {/* Botão Fechar */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(4px)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1A1815',
                zIndex: 10,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.5)'}
            >
              <X size={18} />
            </button>

            {/* Lado Esquerdo - Imagem (Oculto no mobile) */}
            <div className="auth-modal-image" style={{ flex: '1', position: 'relative', backgroundColor: '#1A1815', minHeight: '100%' }}>
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
                alt="Photography Editorial"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,7,6,0.8) 0%, transparent 50%)' }} />
              <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', color: '#FFF', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  A curadoria<br/>elevada.
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.04em' }}>
                  A ESCOLHA FINAL DO SEU ENSAIO
                </p>
              </div>
            </div>

            {/* Lado Direito - Formulário */}
            <div className="auth-modal-form" style={{ flex: '1', padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', borderBottom: '1px solid #D9D5CC' }}>
                <button
                  type="button"
                  onClick={() => { setIsLogin(true); setError(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0 0 0.75rem 0',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: isLogin ? '#1A1815' : '#9A9590',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s'
                  }}
                >
                  Entrar
                  {isLogin && <motion.div layoutId="auth-tab" style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', backgroundColor: '#1A1815' }} />}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsLogin(false); setError(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '0 0 0.75rem 0',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: !isLogin ? '#1A1815' : '#9A9590',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'color 0.3s'
                  }}
                >
                  Criar Conta
                  {!isLogin && <motion.div layoutId="auth-tab" style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', backgroundColor: '#1A1815' }} />}
                </button>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1A1815', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  {isLogin ? 'Bem-vindo de volta.' : 'Comece agora.'}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#6B6763' }}>
                  {isLogin ? 'Acesse seu painel para gerenciar suas seleções.' : 'Crie sua conta para entregar fotos com excelência.'}
                </p>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ backgroundColor: 'rgba(193, 59, 46, 0.08)', borderLeft: '2px solid #C13B2E', padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#C13B2E', fontSize: '0.85rem' }}>
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      key="nome"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6B6763', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Nome ou Estúdio</label>
                      <input
                        type="text"
                        name="nome"
                        required
                        placeholder="Ex: Gustavo Lara"
                        value={formData.nome}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #D9D5CC', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#1A1815', outline: 'none', transition: 'border-color 0.3s' }}
                        onFocus={(e) => e.target.style.borderColor = '#1A1815'}
                        onBlur={(e) => e.target.style.borderColor = '#D9D5CC'}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6B6763', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.75rem 0', border: 'none', borderBottom: '1px solid #D9D5CC', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#1A1815', outline: 'none', transition: 'border-color 0.3s' }}
                    onFocus={(e) => e.target.style.borderColor = '#1A1815'}
                    onBlur={(e) => e.target.style.borderColor = '#D9D5CC'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#6B6763', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>Senha</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="senha"
                      required
                      placeholder="••••••••"
                      value={formData.senha}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 2.5rem 0.75rem 0', border: 'none', borderBottom: '1px solid #D9D5CC', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#1A1815', outline: 'none', transition: 'border-color 0.3s' }}
                      onFocus={(e) => e.target.style.borderColor = '#1A1815'}
                      onBlur={(e) => e.target.style.borderColor = '#D9D5CC'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9A9590' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: '1rem',
                    width: '100%',
                    backgroundColor: '#1A1815',
                    color: '#F7F5F0',
                    border: 'none',
                    padding: '1rem',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'PROCESSANDO...' : (isLogin ? 'ACESSAR PAINEL' : 'CRIAR CONTA')}
                  {!loading && <ArrowRight size={18} />}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      <style>{`
        @media (max-width: 768px) {
          .auth-modal-image { display: none !important; }
          .auth-modal-form { padding: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </AnimatePresence>
  );
}
