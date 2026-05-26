import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Play, ArrowRight, ChevronRight, Star, MapPin, Users, Globe } from 'lucide-react';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Carousel de Destinos em Destaque
  const heroSlides = [
    {
      id: 1,
      title: 'Praias Paradisíacas',
      subtitle: 'Descubra as praias mais exóticas do mundo',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      title: 'Montanhas Majestosas',
      subtitle: 'Aventura e natureza selvagem',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      title: 'Cidades Históricas',
      subtitle: 'Mergulhe na cultura e tradição',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, heroSlides.length]);

  // Destinos em Destaque
  const featuredDestinations = [
    {
      id: 1,
      name: 'Fernando de Noronha',
      country: 'Brasil',
      rating: 4.9,
      reviews: 1240,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
      description: 'Arquipélago paradisíaco com praias virgens',
    },
    {
      id: 2,
      name: 'Bali',
      country: 'Indonésia',
      rating: 4.8,
      reviews: 2150,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80',
      description: 'Templos antigos e praias de areia branca',
    },
    {
      id: 3,
      name: 'Paris',
      country: 'França',
      rating: 4.7,
      reviews: 3890,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
      description: 'A cidade da luz e do romance',
    },
    {
      id: 4,
      name: 'Tóquio',
      country: 'Japão',
      rating: 4.9,
      reviews: 2560,
      image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9a0?auto=format&fit=crop&w=800&q=80',
      description: 'A fascinante mistura entre tecnologia futurista e templos ancestrais.',
    },
  ];

  // Highlights de Viagem
  const travelHighlights = [
    {
      icon: MapPin,
      title: 'Destinos Curados',
      description: 'Acesso a mais de 500 destinos selecionados pelo nosso team de especialistas em viagem.',
    },
    {
      icon: Users,
      title: 'Comunidade Global',
      description: 'Conecte-se com viajantes do mundo inteiro e compartilhe experiências e dicas.',
    },
    {
      icon: Globe,
      title: 'Planejamento Inteligente',
      description: 'Ferramentas avançadas para organizar roteiros, controlar gastos e gerenciar favoritos.',
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
          <Link to="/" style={styles.activeNavLink}>HOME</Link>
          <Link to="/sobre" style={styles.navLink}>SOBRE</Link>
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

      {/* HERO CAROUSEL */}
      <section style={styles.heroSection}>
        <div style={styles.carouselContainer}>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                ...styles.slide,
                opacity: index === currentSlide ? 1 : 0,
                visibility: index === currentSlide ? 'visible' : 'hidden',
              }}
            >
              <div
                style={{
                  ...styles.slideImage,
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
              <div style={styles.slideOverlay} />
              <div style={styles.slideContent}>
                <h1 style={styles.slideTitle}>{slide.title}</h1>
                <p style={styles.slideSubtitle}>{slide.subtitle}</p>
                <Link to="/destinos" style={styles.ctaButton}>
                  EXPLORAR DESTINOS <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <div style={styles.carouselControls}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.carouselDot,
                backgroundColor: index === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.3)',
              }}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlay(false);
              }}
            />
          ))}
        </div>
      </section>

      {/* SEARCH/PICKER SECTION */}
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
            <span style={styles.pickerLabel}>QUANDO</span>
            <span style={styles.pickerVal}>Próximas férias <ChevronRight size={14} /></span>
          </div>
          <Link to="/register" style={styles.pickerBtn}>
            PLANEJAR AGORA <ArrowRight size={16} style={{ marginLeft: '6px' }} />
          </Link>
        </div>
      </div>

      {/* FEATURED DESTINATIONS */}
      <section style={styles.destSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Destinos em Destaque</h2>
          <p style={styles.sectionDesc}>Explore os lugares mais incríveis do mundo com Rosa dos Ventos</p>
        </div>
        <div style={styles.destGrid}>
          {featuredDestinations.map((dest) => (
            <div key={dest.id} style={styles.destCard}>
              <div
                style={{
                  ...styles.destImage,
                  backgroundImage: `url('${dest.image}')`,
                }}
              />
              <div style={styles.destOverlay} />
              <div style={styles.destContent}>
                <h3 style={styles.destName}>{dest.name}</h3>
                <p style={styles.destCountry}>{dest.country}</p>
                <div style={styles.destRating}>
                  <Star size={14} fill="var(--primary)" color="var(--primary)" />
                  <span style={styles.ratingValue}>{dest.rating}</span>
                  <span style={styles.reviewCount}>({dest.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAVEL HIGHLIGHTS */}
      <section style={styles.highlightsSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Por que escolher Rosa dos Ventos?</h2>
          <p style={styles.sectionDesc}>Tudo que você precisa para planejar a viagem perfeita</p>
        </div>
        <div style={styles.highlightsGrid}>
          {travelHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div key={index} style={styles.highlightCard}>
                <div style={styles.highlightIconContainer}>
                  <IconComponent size={32} color="var(--primary)" />
                </div>
                <h3 style={styles.highlightTitle}>{highlight.title}</h3>
                <p style={styles.highlightDesc}>{highlight.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* IMMERSIVE SECTION - UPDATED TO FOLLOW REFERENCE */}
      <section style={styles.immersiveSection}>
        <div style={styles.immersiveBg} />
        <div style={styles.immersiveOverlay} />
        <div style={styles.immersiveContent}>
          <div style={styles.immersiveLeft}>
            <h2 style={styles.immersiveTitle}>
              TRAVEL AND<br />
              ENJOY THE<br />
              BEAUTY OF<br />
              NATURE
            </h2>
            <p style={styles.immersiveDesc}>
              Bali is an Indonesian island located in Southeast Asia, known for its stunning natural beauty, vibrant culture, and rich history. It is often referred to as the "Island of the Gods" due to its many temples and spiritual significance. Bali features picturesque beaches, lush rice terraces, volcanic mountains, and a lively arts scene. The island is a popular destination for tourists seeking relaxation, adventure, and cultural experiences, with activities ranging from surfing and diving to traditional Balinese dance and ceremonies.
            </p>
            <Link to="/register" style={styles.immersiveCTA}>
              COMEÇAR AGORA <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
          </div>
          <div style={styles.immersiveRight}>
            <div style={styles.videoGrid}>
              <div style={styles.videoCardSmall}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={styles.videoElement}
                >
                  <source src="https://assets.mixkit.co/videos/4521/4521-720.mp4" type="video/mp4" />
                </video>
                <div style={styles.videoCardOverlay}>
                   <div style={styles.playBtnCircle}>
                     <Play size={20} fill="#FFF" color="#FFF" />
                   </div>
                </div>
              </div>
              
              <div style={styles.videoCardSmall}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={styles.videoElement}
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4" type="video/mp4" />
                </video>
                <div style={styles.videoCardOverlay}>
                   <div style={styles.playBtnCircle}>
                     <Play size={20} fill="#FFF" color="#FFF" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>500+</h3>
            <p style={styles.statLabel}>Destinos Curados</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>50K+</h3>
            <p style={styles.statLabel}>Viajantes Ativos</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>100K+</h3>
            <p style={styles.statLabel}>Roteiros Criados</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>4.8★</h3>
            <p style={styles.statLabel}>Avaliação Média</p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={styles.ctaFinalSection}>
        <div style={styles.ctaFinalContent}>
          <h2 style={styles.ctaFinalTitle}>Pronto para sua próxima aventura?</h2>
          <p style={styles.ctaFinalDesc}>
            Junte-se a milhares de viajantes que já transformaram suas férias com Rosa dos Ventos
          </p>
          <div style={styles.ctaFinalButtons}>
            <Link to="/register" className="btn btn-primary" style={styles.ctaFinalBtnPrimary}>
              Criar Conta Agora
            </Link>
            <Link to="/destinos" className="btn btn-outline" style={styles.ctaFinalBtnOutline}>
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
    gap: '0.5rem',
  },
  logoText: {
    fontSize: '1.2rem',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: '#FFF',
  },
  nav: {
    display: 'flex',
    gap: '2.5rem',
  },
  activeNavLink: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#FFF',
    textDecoration: 'none',
    borderBottom: '2px solid var(--primary)',
    paddingBottom: '4px',
  },
  navLink: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#94A3B8',
    textDecoration: 'none',
    transition: 'var(--transition-fast)',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  loginBtn: {
    padding: '0.5rem 1.5rem',
    fontSize: '0.9rem',
    color: '#FFF',
    textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 'var(--radius-md)',
  },
  registerBtn: {
    padding: '0.5rem 1.5rem',
    fontSize: '0.9rem',
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    textDecoration: 'none',
    borderRadius: 'var(--radius-md)',
  },
  heroSection: {
    height: '80vh',
    position: 'relative',
    overflow: 'hidden',
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 1s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  slideOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(5,7,15,0.3) 0%, rgba(5,7,15,0.8) 100%)',
  },
  slideContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '800px',
    padding: '0 2rem',
  },
  slideTitle: {
    fontSize: '5rem',
    fontWeight: '900',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  },
  slideSubtitle: {
    fontSize: '1.5rem',
    color: '#CBD5E1',
    marginBottom: '2.5rem',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    padding: '1.2rem 2.5rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '1rem',
    fontWeight: '700',
    textDecoration: 'none',
    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.4)',
    transition: 'var(--transition)',
  },
  carouselControls: {
    position: 'absolute',
    bottom: '3rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '1rem',
    zIndex: 10,
  },
  carouselDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  pickerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-4rem',
    padding: '0 2rem',
    position: 'relative',
    zIndex: 20,
  },
  pickerContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '1rem 1rem 1rem 2.5rem',
    borderRadius: 'var(--radius-full)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '1000px',
  },
  pickerCol: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  pickerLabel: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: '0.05em',
  },
  pickerVal: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0F172A',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  divider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#E2E8F0',
    margin: '0 2rem',
  },
  pickerBtn: {
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    padding: '1rem 2rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.9rem',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  destSection: {
    padding: '8rem 4rem 4rem',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '4rem',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
  },
  sectionDesc: {
    fontSize: '1.1rem',
    color: '#94A3B8',
  },
  destGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  destCard: {
    height: '400px',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer',
    transition: 'var(--transition)',
  },
  destImage: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 0.5s ease',
  },
  destOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)',
  },
  destContent: {
    position: 'absolute',
    bottom: '2rem',
    left: '2rem',
    right: '2rem',
  },
  destName: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  destCountry: {
    fontSize: '1rem',
    color: '#CBD5E1',
    marginBottom: '0.75rem',
  },
  destRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  ratingValue: {
    fontWeight: '700',
  },
  reviewCount: {
    fontSize: '0.85rem',
    color: '#94A3B8',
  },
  highlightsSection: {
    padding: '6rem 4rem',
  },
  highlightsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '3rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  highlightCard: {
    textAlign: 'center',
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.05)',
    transition: 'var(--transition)',
  },
  highlightIconContainer: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
  },
  highlightTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  highlightDesc: {
    fontSize: '1rem',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  immersiveSection: {
    padding: '8rem 4rem',
    position: 'relative',
    minHeight: '600px',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
  immersiveBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: 0,
  },
  immersiveOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  },
  immersiveContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '6rem',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
    width: '100%',
  },
  immersiveLeft: {
    flex: 1.2,
  },
  immersiveTitle: {
    fontSize: '4.5rem',
    fontWeight: '900',
    lineHeight: '1',
    marginBottom: '2rem',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
  },
  immersiveDesc: {
    fontSize: '1.1rem',
    color: '#E2E8F0',
    lineHeight: '1.6',
    marginBottom: '2.5rem',
    textAlign: 'justify',
    maxWidth: '600px',
  },
  immersiveCTA: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'var(--primary)',
    color: '#FFFFFF',
    padding: '1rem 2.5rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '1rem',
    fontWeight: '700',
    textDecoration: 'none',
    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
  },
  immersiveRight: {
    flex: 0.8,
  },
  videoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  videoCardSmall: {
    width: '100%',
    height: '220px',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
    border: '2px solid rgba(255,255,255,0.2)',
  },
  videoElement: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtnCircle: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(8px)',
    border: '2px solid #FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    padding: '6rem 4rem',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  statCard: {
    textAlign: 'center',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: '800',
    color: 'var(--primary)',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '1.1rem',
    color: '#94A3B8',
  },
  ctaFinalSection: {
    padding: '8rem 4rem',
    textAlign: 'center',
  },
  ctaFinalContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  ctaFinalTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
  },
  ctaFinalDesc: {
    fontSize: '1.2rem',
    color: '#94A3B8',
    marginBottom: '3rem',
    lineHeight: '1.6',
  },
  ctaFinalButtons: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  ctaFinalBtnPrimary: {
    padding: '1.2rem 3rem',
    fontSize: '1.1rem',
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
  },
  ctaFinalBtnOutline: {
    padding: '1.2rem 3rem',
    fontSize: '1.1rem',
    color: '#FFF',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 'var(--radius-md)',
    textDecoration: 'none',
  },
  footer: {
    backgroundColor: '#05070F',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '5rem 4rem 2rem',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '4rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem',
  },
  footerSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  footerText: {
    fontSize: '1rem',
    color: '#94A3B8',
  },
  footerLink: {
    fontSize: '1rem',
    color: '#94A3B8',
    textDecoration: 'none',
    transition: 'var(--transition-fast)',
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    fontSize: '0.9rem',
    color: '#64748B',
  },
};
