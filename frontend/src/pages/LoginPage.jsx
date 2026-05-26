import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Compass, Mail, Lock, AlertTriangle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const result = await login(email, senha);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Link de Retorno */}
      <Link to="/" style={styles.backLink}>
        ← Voltar ao Início
      </Link>

      <div className="glass fade-in" style={styles.card}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <Compass size={40} color="var(--primary)" style={styles.compass} />
          <h2 style={styles.title}>Rosa dos Ventos</h2>
          <span style={styles.subtitle}>Sua jornada começa aqui</span>
        </div>

        {/* Notificação de Erro */}
        {error && (
          <div style={styles.errorBanner}>
            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label">E-MAIL</label>
            <div style={styles.inputWrapper}>
              <Mail size={16} color="var(--text-muted)" style={styles.inputIcon} />
              <input
                type="email"
                className="form-input"
                placeholder="seu-email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">SENHA</label>
            <div style={styles.inputWrapper}>
              <Lock size={16} color="var(--text-muted)" style={styles.inputIcon} />
              <input
                type="password"
                className="form-input"
                placeholder="Sua senha secreta"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                disabled={loading}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading}>
            {loading ? 'Efetuando Login...' : 'Entrar na Conta'}
          </button>
        </form>

        {/* Link para cadastro */}
        <div style={styles.footer}>
          <span style={styles.footerText}>Não possui uma conta?</span>
          <Link to="/register" style={styles.footerLink}>
            Cadastre-se grátis
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#070A13',
    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 60%)`,
    padding: '1.5rem',
    position: 'relative',
    fontFamily: 'var(--font-body)',
  },
  backLink: {
    position: 'absolute',
    top: '2rem',
    left: '2rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    transition: 'var(--transition)',
    ':hover': {
      color: '#FFF',
    },
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    textAlign: 'center',
  },
  compass: {
    filter: 'drop-shadow(0 0 10px var(--primary-glow))',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    border: '1px solid var(--danger)',
    color: '#FC8181',
    fontSize: '0.82rem',
    lineHeight: '1.4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inputIcon: {
    position: 'absolute',
    left: '0.85rem',
    pointerEvents: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '0.85rem',
    marginTop: '0.5rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.35rem',
    fontSize: '0.82rem',
    paddingTop: '0.5rem',
    borderTop: '1px solid var(--border-color)',
  },
  footerText: {
    color: 'var(--text-secondary)',
  },
  footerLink: {
    color: 'var(--primary)',
    fontWeight: '600',
    transition: 'var(--transition-fast)',
    ':hover': {
      color: 'var(--primary-hover)',
      textDecoration: 'underline',
    },
  },
};
