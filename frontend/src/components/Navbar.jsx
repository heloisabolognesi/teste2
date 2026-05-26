import React from 'react';
import useAuth from '../hooks/useAuth';
import { Compass, Menu } from 'lucide-react';

export default function Navbar({ title, onMobileMenuToggle }) {
  const { user } = useAuth();

  // Saudação dinâmica com base no horário (outro bônus acadêmico sensacional!)
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <header className="glass" style={styles.header}>
      {/* Menu Sanduíche Mobile */}
      <button style={styles.menuMobileBtn} onClick={onMobileMenuToggle}>
        <Menu size={24} />
      </button>

      {/* Título da Página / Rota */}
      <div style={styles.titleContainer}>
        <h2 style={styles.title}>{title}</h2>
      </div>

      {/* Saudação do Usuário */}
      {user && (
        <div style={styles.userSection}>
          <span style={styles.greeting}>
            {getGreeting()}, <strong style={styles.username}>{user.nome}</strong>! ✈️
          </span>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderRadius: 'var(--radius-md)',
    marginBottom: '2rem',
    border: '1px solid var(--border-color)',
  },
  menuMobileBtn: {
    display: 'none',
    color: 'var(--text-primary)',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
  },
  greeting: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  username: {
    color: 'var(--primary)',
    fontWeight: '650',
  },
};
