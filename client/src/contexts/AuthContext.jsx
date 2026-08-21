import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('@studio:user');
    const savedToken = localStorage.getItem('@studio:token');

    if (savedUser && savedToken) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('@studio:user');
        localStorage.removeItem('@studio:token');
      }
    }
    setLoading(false);
  }, []);

  const login = (user, token) => {
    localStorage.setItem('@studio:user', JSON.stringify(user));
    localStorage.setItem('@studio:token', token);
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem('@studio:user');
    localStorage.removeItem('@studio:token');
    setCurrentUser(null);
  };

  if (loading) {
    return <LoadingScreen message="Verificando sessão..." />;
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
