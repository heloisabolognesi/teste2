import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar a sessão do usuário na inicialização
  useEffect(() => {
    const storedToken = localStorage.getItem('rosa_dos_ventos_token');
    const storedUser = localStorage.getItem('rosa_dos_ventos_user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Efetuar Login
  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token, user: userData } = response.data;

      localStorage.setItem('rosa_dos_ventos_token', token);
      localStorage.setItem('rosa_dos_ventos_user', JSON.stringify(userData));

      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Erro de login:', error);
      const message = error.response?.data?.error || 'Erro ao realizar login. Tente novamente.';
      return { success: false, error: message };
    }
  };

  // Efetuar Cadastro
  const register = async (nome, email, senha, foto_perfil) => {
    try {
      await api.post('/auth/register', { nome, email, senha, foto_perfil });
      return { success: true };
    } catch (error) {
      console.error('Erro de cadastro:', error);
      const message = error.response?.data?.error || 'Erro ao cadastrar usuário. Tente novamente.';
      return { success: false, error: message };
    }
  };

  // Efetuar Logout
  const logout = () => {
    localStorage.removeItem('rosa_dos_ventos_token');
    localStorage.removeItem('rosa_dos_ventos_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
