import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Compass, LayoutDashboard, Map, LogOut, Sun, Moon } from 'lucide-react';

export default function Sidebar({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/viagens', name: 'Minhas Viagens', icon: Map },
  ];

  return (
    <aside className="glass" style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <Compass size={32} color="var(--primary)" style={styles.compassIcon} />
        <span style={styles.logoText}>Rosa dos Ventos</span>
      </div>

      {/* Perfil Mini */}
      {user && (
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            {user.foto_perfil ? (
              <img src={user.foto_perfil} alt={user.nome} style={styles.avatarImg} />
            ) : (
              user.nome.charAt(0).toUpperCase()
            )}
          </div>
          <div style={styles.profileInfo}>
            <span style={styles.profileName}>{user.nome}</span>
            <span style={styles.profileEmail}>{user.email}</span>
          </div>
        </div>
      )}

      {/* Menu Links */}
      <nav style={styles.nav}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/viagens' && location.pathname.startsWith('/viagem/'));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                backgroundColor: isActive ? 'rgba(37, 99, 235, 0.15)' : 'transparent',
                borderColor: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              }}
            >
              <Icon size={20} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} style={styles.iconGlow} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Toggle & Logout */}
      <div style={styles.footer}>
        <button onClick={toggleTheme} className="theme-toggle-btn" style={styles.themeBtn} title="Alternar Tema">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button onClick={logout} style={styles.logoutBtn}>
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1.5rem',
    borderRadius: '0',
    borderTop: '0',
    borderBottom: '0',
    borderLeft: '0',
    zIndex: 100,
  },
  logoContainer: {
    display: 'flex',
   alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2.5rem',
  },
  compassIcon: {
    filter: 'drop-shadow(0 0 8px var(--primary-glow))',
    animation: 'spin 20s linear infinite', // micro-animação sutil de rotação da bússola!
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #FFF 30%, var(--primary) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border-color)',
    marginBottom: '2rem',
  },
  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    boxShadow: 'var(--shadow-glow)',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  profileName: {
    fontSize: '0.9rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  profileEmail: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flexGrow: 1,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    borderLeft: '3px solid transparent',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'var(--transition)',
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: 'auto',
  },
  themeBtn: {
    alignSelf: 'flex-start',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.85rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    color: 'var(--danger)',
    fontWeight: '550',
    fontSize: '0.95rem',
    transition: 'var(--transition)',
    border: '1px solid transparent',
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
  },
};
