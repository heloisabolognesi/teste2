import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Play, ArrowRight, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={styles.container}>
      {/* 1. HEADER BAR */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <Compass size={24} color="var(--primary)" />
          <span style={styles.logoText}>ROSA DOS VENTOS</span>
        </div>
        <nav style={styles.nav}>
          <span style={styles.activeNavLink}>HOME</span>
          <span style={styles.navLink}>SOBRE</span>
          <span style={styles.navLink}>DESTINOS</span>
          <span style={styles.navLink}>AVALIAÇÕES</span>
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

      {/* 2. HERO HERO SECTION */}
      <section style={styles.heroSection}>
        {/* Pagination Sidebar Right */}
        <div style={styles.paginationSidebar}>
          <span style={styles.pagItem}>01</span>
          <span style={styles.pagItem}>02</span>
          <div style={styles.activePagContainer}>
            <span style={styles.activePagItem}>03</span>
            <div style={styles.activeLine} />
          </div>
          <span style={styles.pagItem}>04</span>
          <span style={styles.pagItem}>05</span>
        </div>

        {/* Hero Title */}
        <div style={styles.heroTextContainer}>
          <h1 style={styles.heroTitle}>
            WONDERFUL<br />
            WORLD
          </h1>
          
          <div style={styles.descColumns}>
            <p style={styles.descCol}>
              A Rosa dos Ventos é o seu planejador definitivo de viagens. Organize roteiros inteiramente personalizados, controle gastos financeiros detalhados por categoria e salve os seus hotéis e restaurantes favoritos em um só lugar imersivo e de alta tecnologia.
            </p>
            <p style={styles.descCol}>
              Transforme a maneira como você explora o mundo. Crie recordações perfeitas, mantenha os seus custos dentro do orçamento ideal e garanta um cronograma diário limpo e fluido para as suas próximas férias.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FLOATING DESTINATION PICKER */}
      <div style={styles.pickerWrapper}>
        <div style={styles.pickerContainer}>
          <div style={styles.pickerCol}>
            <span style={styles.pickerLabel}>LOCALIZAÇÃO</span>
            <span style={styles.pickerVal}>Brasil, Europa... <ChevronRight size={14} /></span>
          </div>
          <div style={styles.divider} />
          <div style={styles.pickerCol}>
            <span style={styles.pickerLabel}>TIPO DE VIAGEM</span>
            <span style={styles.pickerVal}>Praia, Aventura... <ChevronRight size={14} /></span>
          </div>
          <div style={styles.divider} />
          <div style={styles.pickerCol}>
            <span style={styles.pickerLabel}>DESTINO</span>
            <span style={styles.pickerVal}>Qualquer lugar <ChevronRight size={14} /></span>
          </div>
          <Link to="/register" style={styles.pickerBtn}>
            PLANEJAR AGORA <ArrowRight size={16} style={{ marginLeft: '6px' }} />
          </Link>
        </div>
      </div>

      {/* 4. DESTINATION PORTRAIT GRID */}
      <section style={styles.destGridSection}>
        <div style={styles.gridContainer}>
          {/* Card 1 */}
          <div style={styles.portraitCard}>
            <div style={{ ...styles.cardImage, backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80')` }} />
            <div style={styles.cardOverlay} />
            <span style={styles.cardTitle}>Fernando de Noronha</span>
          </div>
          
          {/* Card 2 */}
          <div style={styles.portraitCard}>
            <div style={{ ...styles.cardImage, backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80')` }} />
            <div style={styles.cardOverlay} />
            <span style={styles.cardTitle}>Bali, Indonésia</span>
          </div>

          {/* Card 3 */}
          <div style={styles.portraitCard}>
            <div style={{ ...styles.cardImage, backgroundImage: `url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80')` }} />
            <div style={styles.cardOverlay} />
            <span style={styles.cardTitle}>Paris, França</span>
          </div>
        </div>
      </section>

      {/* 5. SECONDARY CINEMATIC SECTION */}
      <section style={styles.natureSection}>
        <div style={styles.natureContainer}>
          <div style={styles.natureLeft}>
            <h2 style={styles.natureTitle}>
              VIAJE E APROVEITE<br />
              A BELEZA DA<br />
              NATUREZA.
            </h2>
            <p style={styles.natureDesc}>
              Aproveite ao máximo cada jornada. O planejamento estruturado e flexível permite que você minimize imprevistos e desfrute de paisagens magníficas, desde praias tropicais até montanhas nevadas e locais históricos.
            </p>
          </div>
          
          <div style={styles.natureRight}>
            {/* Cinematic Video Blocks */}
            <div style={styles.videoCard}>
              <div style={{ ...styles.videoBg, backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=500&q=80')` }} />
              <div style={styles.videoOverlay} />
              <div style={styles.playBtnContainer}>
                <Play size={20} fill="#FFF" color="#FFF" />
              </div>
            </div>
            
            <div style={styles.videoCard}>
              <div style={{ ...styles.videoBg, backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80')` }} />
              <div style={styles.videoOverlay} />
              <div style={styles.playBtnContainer}>
                <Play size={20} fill="#FFF" color="#FFF" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION & FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>Contato: contato@rosadosventos.com.br</span>
          <span>Criado por você — Projeto Integrador 2026</span>
          <span>Colaboração Especial Acadêmica</span>
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
    paddingBottom: '2rem',
    position: 'relative',
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
    gap: '0.5rem',
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
  },
  navLink: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    ':hover': {
      color: '#FFF',
    },
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
    padding: '4rem 6rem 1rem 6rem',
    position: 'relative',
    minHeight: '65vh',
    display: 'flex',
    alignItems: 'center',
  },
  paginationSidebar: {
    position: 'absolute',
    right: '6rem',
    top: '35%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  pagItem: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer',
  },
  activePagContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  activePagItem: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: 'var(--primary)',
  },
  activeLine: {
    width: '40px',
    height: '2px',
    backgroundColor: 'var(--primary)',
    boxShadow: '0 0 8px var(--primary)',
  },
  heroTextContainer: {
    maxWidth: '850px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
  },
  heroTitle: {
    fontSize: '5rem',
    fontWeight: '800',
    lineHeight: '0.95',
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  descColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    maxWidth: '750px',
  },
  descCol: {
    fontSize: '0.88rem',
    color: '#94A3B8',
    lineHeight: '1.6',
    textAlign: 'justify',
  },
  pickerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    padding: '0 6rem',
    zIndex: 10,
    position: 'relative',
  },
  pickerContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 'var(--radius-full)',
    padding: '0.6rem 0.6rem 0.6rem 2.5rem',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    width: '100%',
    maxWidth: '900px',
  },
  pickerCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    flex: 1,
  },
  pickerLabel: {
    fontSize: '0.7rem',
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: '0.05em',
  },
  pickerVal: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#0F172A',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  divider: {
    width: '1px',
    height: '35px',
    backgroundColor: '#E2E8F0',
    margin: '0 2rem',
  },
  pickerBtn: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    padding: '0.9rem 2.2rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
    transition: 'var(--transition)',
    ':hover': {
      backgroundColor: '#1D4ED8',
      transform: 'translateY(-1px)',
    },
  },
  destGridSection: {
    padding: '6rem 6rem 3rem 6rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '2.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  portraitCard: {
    height: '400px',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '2rem',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    transition: 'var(--transition)',
    border: '1px solid rgba(255,255,255,0.05)',
    ':hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
      borderColor: 'rgba(37, 99, 235, 0.3)',
    },
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s ease',
    ':hover': {
      transform: 'scale(1.05)',
    },
  },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.8) 100%)',
    zIndex: 1,
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#FFF',
    zIndex: 2,
    textShadow: '0 2px 4px rgba(0,0,0,0.6)',
  },
  natureSection: {
    padding: '4rem 6rem',
  },
  natureContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '4rem',
  },
  natureLeft: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  natureTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.05',
    letterSpacing: '-0.03em',
  },
  natureDesc: {
    fontSize: '0.9rem',
    color: '#94A3B8',
    lineHeight: '1.6',
    maxWidth: '500px',
  },
  natureRight: {
    flex: 1,
    display: 'flex',
    gap: '1.5rem',
  },
  videoCard: {
    width: '180px',
    height: '240px',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  videoBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playBtnContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: 'var(--transition)',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: 'var(--primary)',
      borderColor: 'var(--primary)',
    },
  },
  footer: {
    padding: '3rem 6rem 1rem 6rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.8rem',
    color: '#475569',
    maxWidth: '1200px',
    margin: '0 auto',
  },
};
