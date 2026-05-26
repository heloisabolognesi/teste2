import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, ArrowRight, CheckCircle, Users, Zap, Heart, Globe, Briefcase, Star, MapPin } from 'lucide-react';

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

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

      {/* IMMERSIVE HERO CAROUSEL */}
      <section style={styles.heroSection}>
        <div style={styles.carouselContainer}>
          {carouselImages.map((img, index) => (
            <div
              key={index}
              style={{
                ...styles.slide,
                opacity: index === currentSlide ? 1 : 0,
                backgroundImage: `url('${img}')`,
              }}
            />
          ))}
          <div style={styles.heroOverlay} />
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Explorando o Mundo,<br />Criando Memórias</h1>
            <p style={styles.heroSubtitle}>
              Conheça a história por trás da Rosa dos Ventos e como estamos transformando a jornada de milhares de viajantes.
            </p>
            <div style={styles.heroStats}>
              {stats.map((stat, i) => (
                <div key={i} style={styles.heroStatItem}>
                  <span style={styles.statNum}>{stat.number}</span>
                  <span style={styles.statLab}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & EXPERIENCE INTEGRATED SECTION */}
      <section style={styles.integratedSection}>
        <div style={styles.sectionContainer}>
          <div style={styles.contentGrid}>
            {/* Nossa Missão */}
            <div style={styles.missionBox}>
              <div style={styles.badge}>NOSSA MISSÃO</div>
              <h2 style={styles.sectionHeading}>Propósito que nos move</h2>
              <p style={styles.sectionDesc}>
                A Rosa dos Ventos nasceu da necessidade de simplificar o complexo. Acreditamos que o planejamento não deve ser um fardo, mas o início prazeroso de toda aventura. Nossa missão é democratizar o acesso a ferramentas de elite para organização de viagens.
              </p>
              <div style={styles.missionList}>
                {missionPoints.map((point, idx) => {
                  const Icon = point.icon;
                  return (
                    <div key={idx} style={styles.missionItem}>
                      <div style={styles.iconCircle}><Icon size={20} color="var(--primary)" /></div>
                      <div>
                        <h4 style={styles.itemTitle}>{point.title}</h4>
                        <p style={styles.itemText}>{point.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Experiência em Viagens */}
            <div style={styles.experienceBox}>
              <div style={styles.imageStack}>
                <div style={{...styles.stackImg, backgroundImage: `url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=600&q=80')`, top: 0, left: 0}} />
                <div style={{...styles.stackImg, backgroundImage: `url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80')`, bottom: '-20px', right: '-20px', zIndex: 2, border: '4px solid #05070F'}} />
              </div>
              <div style={styles.experienceInfo}>
                <h2 style={styles.sectionHeading}>Experiência em Viagens</h2>
                <p style={styles.sectionDesc}>
                  Nossa equipe é formada por nômades digitais e especialistas que já percorreram os sete continentes, trazendo bagagem real para cada funcionalidade.
                </p>
                <div style={styles.featureGrid}>
                  <div style={styles.featItem}><CheckCircle size={18} color="var(--primary)" /> <span>Roteiros Curados</span></div>
                  <div style={styles.featItem}><CheckCircle size={18} color="var(--primary)" /> <span>Gestão Financeira</span></div>
                  <div style={styles.featItem}><CheckCircle size={18} color="var(--primary)" /> <span>Sincronização Cloud</span></div>
                  <div style={styles.featItem}><CheckCircle size={18} color="var(--primary)" /> <span>Suporte Global</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Pronto para sua próxima aventura?</h2>
          <p style={styles.ctaSubtitle}>Junte-se a 50.000+ viajantes e comece a planejar hoje mesmo.</p>
          <Link to="/register" style={styles.ctaBtn}>
            COMEÇAR AGORA <ArrowRight size={20} style={{marginLeft: '10px'}} />
          </Link>
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
          </div>
        </div>
        <div style={styles.footerBottom}>
          <span>© 2026 Rosa dos Ventos. Todos os direitos reservados.</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#05070F',
    color: '#FFF',
    fontFamily: 'var(--font-body)',
    overflowX: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 4rem',
    backgroundColor: 'rgba(5, 7, 15, 0.7)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  },
  logo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  logoText: { fontSize: '1.1rem', fontWeight: '800', letterSpacing: '0.05em' },
  nav: { display: 'flex', gap: '2.5rem' },
  navLink: { fontSize: '0.85rem', fontWeight: '600', color: '#94A3B8', textDecoration: 'none', transition: '0.3s' },
  activeNavLink: { fontSize: '0.85rem', fontWeight: '700', color: '#FFF', textDecoration: 'none', borderBottom: '2px solid var(--primary)', paddingBottom: '4px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  loginBtn: { padding: '0.5rem 1.5rem', fontSize: '0.85rem', color: '#FFF', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px' },
  registerBtn: { padding: '0.5rem 1.5rem', fontSize: '0.85rem', backgroundColor: 'var(--primary)', color: '#FFF', textDecoration: 'none', borderRadius: '6px' },
  
  heroSection: { height: '70vh', position: 'relative', marginTop: '0' },
  carouselContainer: { width: '100%', height: '100%', position: 'relative' },
  slide: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'opacity 1.5s ease-in-out' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(5,7,15,0.4) 0%, rgba(5,7,15,0.9) 100%)' },
  heroContent: { position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '0 2rem' },
  heroTitle: { fontSize: '4.5rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '1.5rem', background: 'linear-gradient(to right, #FFF, #93C5FD)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  heroSubtitle: { fontSize: '1.2rem', color: '#94A3B8', maxWidth: '700px', marginBottom: '3rem' },
  heroStats: { display: 'flex', gap: '4rem' },
  heroStatItem: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  statNum: { fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' },
  statLab: { fontSize: '0.8rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' },

  integratedSection: { padding: '8rem 4rem' },
  sectionContainer: { maxWidth: '1200px', margin: '0 auto' },
  contentGrid: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '6rem', alignItems: 'start' },
  badge: { display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: 'rgba(37, 99, 235, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.5rem' },
  sectionHeading: { fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' },
  sectionDesc: { fontSize: '1.1rem', color: '#94A3B8', lineHeight: '1.8', marginBottom: '3rem' },
  missionList: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  missionItem: { display: 'flex', gap: '1.5rem', alignItems: 'start' },
  iconCircle: { width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  itemTitle: { fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' },
  itemText: { fontSize: '0.9rem', color: '#64748B', lineHeight: '1.5' },

  experienceBox: { position: 'relative' },
  imageStack: { position: 'relative', height: '400px', marginBottom: '4rem' },
  stackImg: { position: 'absolute', width: '80%', height: '300px', borderRadius: '12px', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' },
  experienceInfo: { marginTop: '2rem' },
  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  featItem: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#E2E8F0' },

  ctaSection: { padding: '4rem 4rem 8rem' },
  ctaCard: { background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', padding: '5rem', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' },
  ctaTitle: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' },
  ctaSubtitle: { fontSize: '1.1rem', color: '#94A3B8', marginBottom: '2.5rem' },
  ctaBtn: { display: 'inline-flex', alignItems: 'center', backgroundColor: 'var(--primary)', color: '#FFF', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: '700', textDecoration: 'none', transition: '0.3s', boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)' },

  footer: { padding: '5rem 4rem 2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' },
  footerContent: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto 4rem' },
  footerSection: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  footerTitle: { fontSize: '1.1rem', fontWeight: '700' },
  footerText: { color: '#94A3B8', fontSize: '0.9rem' },
  footerLink: { color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' },
  footerBottom: { textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', color: '#64748B', fontSize: '0.8rem' },
};
