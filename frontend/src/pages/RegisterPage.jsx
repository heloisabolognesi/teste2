import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Compass, User, Mail, Lock, Image, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!nome || !email || !senha) {
      setError('Os campos Nome, E-mail e Senha são obrigatórios.');
      return;
    }

    setLoading(true);
    const result = await register(nome, email, senha, fotoPerfil);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setNome('');
      setEmail('');
      setSenha('');
      setFotoPerfil('');
      
      // Redirecionar para login após 2 segundos de sucesso
      setTimeout(() => {
        navigate('/login');
      }, 2200);
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
          <h2 style={styles.title}>Criar Nova Conta</h2>
          <span style={styles.subtitle}>Junte-se à comunidade Rosa dos Ventos</span>
        </div>

        {/* Notificação de Sucesso */}
        {success && (
          <div style={styles.successBanner}>
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>Cadastro realizado com sucesso! Redirecionando...</span>
          </div>
        )}

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
            <label className="form-label">NOME COMPLETO</label>
            <div style={styles.inputWrapper}>
              <User size={16} color="var(--text-muted)" style={styles.inputIcon} />
              <input
                type="text"
                className="form-input"
                placeholder="Seu lindo nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                disabled={loading || success}
              />
            </div>
          </div>

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
                disabled={loading || success}
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
                placeholder="Mínimo 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                disabled={loading || success}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL FOTO DE PERFIL (OPCIONAL)</label>
            <div style={styles.inputWrapper}>
              <Image size={16} color="var(--text-muted)" style={styles.inputIcon} />
              <input
                type="text"
                className="form-input"
                placeholder="https://exemplo.com/sua-foto.jpg"
                value={fotoPerfil}
                onChange={(e) => setFotoPerfil(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
                disabled={loading || success}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={styles.submitBtn} disabled={loading || success}>
            {loading ? 'Cadastrando Conta...' : 'Criar minha Conta'}
          </button>
        </form>

        {/* Link para login */}
        <div style={styles.footer}>
          <span style={styles.footerText}>Já tem cadastro?</span>
          <Link to="/login" style={styles.footerLink}>
            Faça login
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
    maxWidth: '440px',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
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
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    border: '1px solid var(--success)',
    color: '#6EE7B7',
    fontSize: '0.82rem',
    lineHeight: '1.4',
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
    gap: '0.9rem',
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
