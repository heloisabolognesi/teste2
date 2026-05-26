import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, ArrowRight, CheckCircle, Users, Zap, Heart, Globe, Briefcase } from 'lucide-react';

export default function AboutPage() {
  const missionPoints = [
    {
      icon: Globe,
      title: 'Alcance Global',
      description: 'Conectando viajantes de todo o mundo em uma plataforma única e intuitiva.',
    },
    {
      icon: Zap,
      title: 'Tecnologia Avançada',
      description: 'Ferramentas inteligentes que simplificam o planejamento de viagens.',
    },
    {
      icon: Heart,
      title: 'Paixão por Viagens',
      description: 'Criado por viajantes, para viajantes que amam explorar o mundo.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Destinos Curados' },
    { number: '50K+', label: 'Viajantes Ativos' },
    { number: '100K+', label: 'Roteiros Criados' },
    { number: '4.8★', label: 'Avaliação Média' },
  ];

  const team = [
    {
      name: 'Ana Silva',
      role: 'Fundadora & CEO',
      bio: 'Apaixonada por viagens e tecnologia',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Carlos Santos',
      role: 'CTO & Co-fundador',
      bio: 'Especialista em desenvolvimento web',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marina Costa',
      role: 'Design Lead',
      bio: 'Criadora de experiências imersivas',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div style={styles.container}>
      {/* HEADER/NAVBAR */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <Compass size={28} color="var(--primary)" />
          <span style={styles.logoText}>ROSA DOS VENTOS</span>
        </div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navLink}>HOME</Link>
          <Link to="/sobre" style={styles.activeNavLink}>SOBRE</Link>
          <Link to="/destinos" style={styles.navLink}>DESTINOS</Link>
          <Link to="/avaliacoes" style={styles.navLink}>AVALIAÇÕES</Link>
        </nav>
        <div style={styles.headerRight}>
          <Search size={18} color="#94A3B8" style={{ cursor: 'pointer' }} />
          <Link to="/login" className="btn btn-outline" style={styles.loginBtn}>
            Entrar
          </Link>
          <Link to="/register" className="btn btn-primary" style={styles.registerBtn}>
            Cadastrar
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Sobre Rosa dos Ventos</h1>
          <p style={styles.heroSubtitle}>
            Transformando a forma como as pessoas planejam, organizam e vivem suas viagens
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section style={styles.missionSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.missionLeft}>
            <h2 style={styles.sectionTitle}>Nossa Missão</h2>
            <p style={styles.sectionText}>
              Rosa dos Ventos nasceu de uma simples ideia: criar uma plataforma que unisse todas as ferramentas necessárias para planejar uma viagem perfeita em um único lugar. Acreditamos que viajar deve ser uma experiência memorável, desde o planejamento até o retorno para casa.
            </p>
            <p style={styles.sectionText}>
              Nosso objetivo é capacitar viajantes com tecnologia inteligente, design intuitivo e uma comunidade global de exploradores apaixonados pelo mundo.
            </p>
          </div>
          <div style={styles.missionRight}>
            <div
              style={{
                ...styles.missionImage,
                backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80)',
              }}
            />
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={styles.valuesSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitleCenter}>Nossos Valores</h2>
          <div style={styles.valuesGrid}>
            {missionPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} style={styles.valueCard}>
                  <div style={styles.valueIconContainer}>
                    <IconComponent size={40} color="var(--primary)" />
                  </div>
                  <h3 style={styles.valueTitle}>{point.title}</h3>
                  <p style={styles.valueDesc}>{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section style={styles.experienceSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.experienceLeft}>
            <div
              style={{
                ...styles.experienceImage,
                backgroundImage: 'url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80)',
              }}
            />
          </div>
          <div style={styles.experienceRight}>
            <h2 style={styles.sectionTitle}>Experiência em Viagens</h2>
            <p style={styles.sectionText}>
              Cada membro do nosso time é um viajante apaixonado. Temos experiência em mais de 100 países e entendemos os desafios reais que os viajantes enfrentam.
            </p>
            <div style={styles.experienceFeatures}>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="var(--primary)" />
                <span>Planejamento de roteiros personalizados</span>
              </div>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="var(--primary)" />
                <span>Controle detalhado de gastos por categoria</span>
              </div>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="var(--primary)" />
                <span>Salvamento de favoritos sincronizados</span>
              </div>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="var(--primary)" />
                <span>Interface intuitiva e responsiva</span>
              </div>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="var(--primary)" />
                <span>Comunidade global de viajantes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={styles.statsSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitleCenter}>Nossos Números</h2>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <h3 style={styles.statNumber}>{stat.number}</h3>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section style={styles.teamSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitleCenter}>Nosso Time</h2>
          <div style={styles.teamGrid}>
            {team.map((member, index) => (
              <div key={index} style={styles.teamCard}>
                <div
                  style={{
                    ...styles.teamImage,
                    backgroundImage: `url('${member.image}')`,
                  }}
                />
                <div style={styles.teamContent}>
                  <h3 style={styles.teamName}>{member.name}</h3>
                  <p style={styles.teamRole}>{member.role}</p>
                  <p style={styles.teamBio}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section style={styles.platformSection}>
        <div style={styles.sectionContainer}>
          <h2 style={styles.sectionTitleCenter}>Plataforma Moderna</h2>
          <p style={styles.platformDesc}>
            Rosa dos Ventos combina design premium com funcionalidades poderosas para oferecer a melhor experiência em planejamento de viagens.
          </p>
          <div style={styles.platformFeatures}>
            <div style={styles.platformFeature}>
              <div style={styles.platformFeatureIcon}>
                <Briefcase size={32} color="var(--primary)" />
              </div>
              <h3>Dashboard Intuitivo</h3>
              <p>Visualize todos os seus roteiros, gastos e favoritos em um painel organizado e elegante.</p>
            </div>
            <div style={styles.platformFeature}>
              <div style={styles.platformFeatureIcon}>
                <Users size={32} color="var(--primary)" />
              </div>
              <h3>Comunidade Ativa</h3>
              <p>Conecte-se com viajantes do mundo inteiro e compartilhe dicas e experiências.</p>
            </div>
            <div style={styles.platformFeature}>
              <div style={styles.platformFeatureIcon}>
                <Zap size={32} color="var(--primary)" />
              </div>
              <h3>Tecnologia Avançada</h3>
              <p>Desenvolvido com as tecnologias mais modernas para garantir performance e segurança.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Pronto para começar sua jornada?</h2>
          <p style={styles.ctaDesc}>
            Junte-se a milhares de viajantes que já transformaram suas férias com Rosa dos Ventos
          </p>
          <div style={styles.ctaButtons}>
            <Link to="/register" className="btn btn-primary" style={styles.ctaBtnPrimary}>
              Criar Conta Agora
            </Link>
            <Link to="/destinos" className="btn btn-outline" style={styles.ctaBtnOutline}>
              Explorar Destinos
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Rosa dos Ventos</h4>
            <p style={styles.footerText}>Seu planejador definitivo de viagens</p>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Navegação</h4>
            <Link to="/" style={styles.footerLink}>Home</Link>
            <Link to="/sobre" style={styles.footerLink}>Sobre</Link>
            <Link to="/destinos" style={styles.footerLink}>Destinos</Link>
            <Link to="/avaliacoes" style={styles.footerLink}>Avaliações</Link>
          </div>
          <div style={styles.footerSection}>
            <h4 style={styles.footerTitle}>Contato</h4>
            <p style={styles.footerText}>contato@rosadosventos.com.br</p>
            <p style={styles.footerText}>+55 (11) 9999-9999</p>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2026 Rosa dos Ventos. Todos os direitos reservados.</span>
          <span>Criado com ❤️ para viajantes apaixonados</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#05070F',
    backgroundImage: `radial-gradient(circle at 50% 10%, rgba(37, 99, 235, 0.12) 0%, transparent 60%)`,
    color: '#FFF',
    fontFamily: 'var(--font-body)',
    overflowX: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 4rem',
    backgroundColor: 'rgba(5, 7, 15, 0.5)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  logoText: {
    fontSize: '1.1rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: '#FFF',
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
  },
  activeNavLink: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: '0.1em',
    borderBottom: '2px solid var(--primary)',
    paddingBottom: '4px',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    textDecoration: 'none',
  },
  navLink: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    textDecoration: 'none',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  loginBtn: {
    padding: '0.45rem 1.25rem',
    fontSize: '0.85rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#FFF',
  },
  registerBtn: {
    padding: '0.45rem 1.25rem',
    fontSize: '0.85rem',
  },
  heroSection: {
    padding: '6rem 4rem',
    textAlign: 'center',
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)`,
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  sectionContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  missionSection: {
    padding: '6rem 4rem',
  },
  missionLeft: {
    flex: 1,
  },
  missionRight: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  sectionTitleCenter: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '3rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  sectionText: {
    fontSize: '1.05rem',
    color: '#94A3B8',
    lineHeight: '1.8',
    marginBottom: '1.5rem',
  },
  missionImage: {
    width: '100%',
    height: '400px',
    borderRadius: 'var(--radius-lg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  valuesSection: {
    padding: '6rem 4rem',
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  valueCard: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'var(--transition)',
  },
  valueIconContainer: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  valueTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
  },
  valueDesc: {
    fontSize: '0.95rem',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  experienceSection: {
    padding: '6rem 4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
  },
  experienceLeft: {
    flex: 1,
  },
  experienceRight: {
    flex: 1,
  },
  experienceImage: {
    width: '100%',
    height: '400px',
    borderRadius: 'var(--radius-lg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  experienceFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '2rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1rem',
  },
  statsSection: {
    padding: '6rem 4rem',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
  },
  statCard: {
    textAlign: 'center',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#94A3B8',
  },
  teamSection: {
    padding: '6rem 4rem',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  teamCard: {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'var(--transition)',
  },
  teamImage: {
    width: '100%',
    height: '300px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  teamContent: {
    padding: '2rem',
  },
  teamName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  teamRole: {
    fontSize: '0.9rem',
    color: 'var(--primary)',
    fontWeight: '600',
    marginBottom: '0.75rem',
  },
  teamBio: {
    fontSize: '0.95rem',
    color: '#94A3B8',
  },
  platformSection: {
    padding: '6rem 4rem',
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
  },
  platformDesc: {
    fontSize: '1.1rem',
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 3rem',
    lineHeight: '1.6',
  },
  platformFeatures: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  platformFeature: {
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
  },
  platformFeatureIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  ctaSection: {
    padding: '6rem 4rem',
    textAlign: 'center',
  },
  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  ctaDesc: {
    fontSize: '1.1rem',
    color: '#94A3B8',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  ctaButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaBtnPrimary: {
    padding: '1rem 2.5rem',
    fontSize: '1rem',
  },
  ctaBtnOutline: {
    padding: '1rem 2.5rem',
    fontSize: '1rem',
  },
  footer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '4rem 4rem 2rem',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto 2rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  footerTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#94A3B8',
  },
  footerLink: {
    fontSize: '0.9rem',
    color: '#94A3B8',
    transition: 'var(--transition-fast)',
    textDecoration: 'none',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    fontSize: '0.85rem',
    color: '#64748B',
    flexWrap: 'wrap',
    gap: '1rem',
  },
};
