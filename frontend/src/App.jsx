import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import Sidebar from './components/Sidebar';

// Páginas Publicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas Privadas
import DashboardPage from './pages/DashboardPage';
import ViagensPage from './pages/ViagensPage';
import ViagemDetalhePage from './pages/ViagemDetalhePage';

// Componente para Proteger Rotas Privadas
function ProtectedRoute({ children, theme, toggleTheme }) {
  const { authenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={styles.loader}>
        <div className="spin" style={styles.spinner} />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      {/* Sidebar Fixo na Esquerda */}
      <Sidebar theme={theme} toggleTheme={toggleTheme} />
      
      {/* Conteúdo Dinâmico na Direita */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function MainApp() {
  const [theme, setTheme] = useState('dark');

  // Carregar e aplicar tema preferido do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('rosa_dos_ventos_theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, []);

  // Alternar entre Light e Dark Mode
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('rosa_dos_ventos_theme', nextTheme);
    
    if (nextTheme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rotas Protegidas (Dashboard & CRUDs) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute theme={theme} toggleTheme={toggleTheme}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viagens"
        element={
          <ProtectedRoute theme={theme} toggleTheme={toggleTheme}>
            <ViagensPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viagem/:id"
        element={
          <ProtectedRoute theme={theme} toggleTheme={toggleTheme}>
            <ViagemDetalhePage />
          </ProtectedRoute>
        }
      />

      {/* Redirecionamento de rotas inexistentes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

const styles = {
  loader: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070A13',
  },
  spinner: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid rgba(37,99,235,0.1)',
    borderTopColor: 'var(--primary)',
    animation: 'spin 1s linear infinite',
  },
};
