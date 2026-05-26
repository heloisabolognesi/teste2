import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      name: 'Marina Silva',
      destination: 'Fernando de Noronha',
      rating: 5,
      text: 'Rosa dos Ventos transformou minha forma de planejar viagens! Consegui organizar tudo em um só lugar e ainda controlar meus gastos. Voltei com memórias incríveis e dentro do orçamento!',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      date: 'Março 2026',
    },
    {
      id: 2,
      name: 'Carlos Santos',
      destination: 'Bali, Indonésia',
      rating: 5,
      text: 'Plataforma excelente! A interface é intuitiva, os roteiros ficam organizados e consegui salvar todos os meus restaurantes e hotéis favoritos. Recomendo para todo viajante!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: 'Fevereiro 2026',
    },
    {
      id: 3,
      name: 'Ana Costa',
      destination: 'Paris, França',
      rating: 5,
      text: 'Que descoberta! Rosa dos Ventos me ajudou a planejar uma viagem perfeita para Paris. O controle de gastos é muito útil e a comunidade compartilha dicas incríveis.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
      date: 'Janeiro 2026',
    },
    {
      id: 4,
      name: 'Pedro Oliveira',
      destination: 'Tóquio, Japão',
      rating: 5,
      text: 'Impossível viajar sem Rosa dos Ventos agora! Planejei uma viagem de 2 semanas para o Japão e tudo ficou perfeito. A plataforma é realmente completa e profissional.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      date: 'Dezembro 2025',
    },
    {
      id: 5,
      name: 'Juliana Ferreira',
      destination: 'Suíça - Alpes',
      rating: 5,
      text: 'Melhor investimento para minhas viagens! Rosa dos Ventos oferece tudo que um viajante precisa. Design lindo, funcionalidades poderosas e suporte excelente.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      date: 'Novembro 2025',
    },
    {
      id: 6,
      name: 'Roberto Alves',
      destination: 'Nova Zelândia',
      rating: 5,
      text: 'Viajei para a Nova Zelândia com Rosa dos Ventos e foi incrível! Consegui planejar trilhas, atividades de aventura e ainda controlar todos os gastos. Voltei querendo voltar!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: 'Outubro 2025',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Viajantes Ativos' },
    { number: '4.8★', label: 'Avaliação Média' },
    { number: '100K+', label: 'Roteiros Criados' },
    { number: '98%', label: 'Satisfação' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
          <Link to="/sobre" style={styles.navLink}>SOBRE</Link>
          <Link to="/destinos" style={styles.navLink}>DESTINOS</Link>
          <Link to="/avaliacoes" style={styles.activeNavLink}>AVALIAÇÕES</Link>
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
          <h1 style={styles.heroTitle}>O que Nossos Viajantes Dizem</h1>
          <p style={styles.heroSubtitle}>
            Histórias reais de pessoas que transformaram suas viagens com Rosa dos Ventos
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <h3 style={styles.statNumber}>{stat.number}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAROUSEL SECTION */}
      <section style={styles.carouselSection}>
        <div style={styles.carouselContainer}>
          <div style={styles.carouselContent}>
            {reviews.map((review, index) => (
              <div
                key={review.id}
                style={{
                  ...styles.carouselSlide,
                  opacity: index === currentSlide ? 1 : 0,
                  visibility: index === currentSlide ? 'visible' : 'hidden',
                }}
              >
                <div style={styles.quoteIcon}>
                  <Quote size={40} color="var(--primary)" />
                </div>
                <p style={styles.reviewText}>{review.text}</p>
                <div style={styles.reviewerInfo}>
                  <div
                    style={{
                      ...styles.reviewerImage,
                      backgroundImage: `url('${review.image}')`,
                    }}
                  />
                  <div>
                    <h4 style={styles.reviewerName}>{review.name}</h4>
                    <p style={styles.reviewerDestination}>{review.destination}</p>
                    <div style={styles.reviewRating}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="var(--primary)" color="var(--primary)" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div style={styles.carouselControls}>
            <button style={styles.carouselBtn} onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            <div style={styles.carouselDots}>
              {reviews.map((_, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.carouselDot,
                    backgroundColor: index === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                  }}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <button style={styles.carouselBtn} onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section style={styles.reviewsGridSection}>
        <h2 style={styles.sectionTitle}>Mais Avaliações</h2>
        <div style={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewCardHeader}>
                <div
                  style={{
                    ...styles.reviewCardImage,
                    backgroundImage: `url('${review.image}')`,
                  }}
                />
                <div style={styles.reviewCardInfo}>
                  <h4 style={styles.reviewCardName}>{review.name}</h4>
                  <p style={styles.reviewCardDestination}>{review.destination}</p>
                </div>
              </div>
              <div style={styles.reviewCardRating}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p style={styles.reviewCardText}>{review.text}</p>
              <p style={styles.reviewCardDate}>{review.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Junte-se a Milhares de Viajantes Felizes</h2>
          <p style={styles.ctaDesc}>
            Comece sua jornada com Rosa dos Ventos e crie memórias inesquecíveis
          </p>
          <Link to="/register" className="btn btn-primary" style={styles.ctaBtn}>
            Criar Conta Agora
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
    padding: '4rem 4rem',
    textAlign: 'center',
    minHeight: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)`,
  },
  heroContent: {
    maxWidth: '800px',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#94A3B8',
    lineHeight: '1.6',
  },
  statsSection: {
    padding: '4rem 4rem',
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
    padding: '2rem',
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
  carouselSection: {
    padding: '4rem 4rem 6rem',
  },
  carouselContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  carouselContent: {
    position: 'relative',
    minHeight: '400px',
    marginBottom: '2rem',
  },
  carouselSlide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '3rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    transition: 'opacity 0.5s ease-in-out',
  },
  quoteIcon: {
    marginBottom: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
  },
  reviewText: {
    fontSize: '1.2rem',
    color: '#FFF',
    lineHeight: '1.8',
    marginBottom: '2rem',
    fontStyle: 'italic',
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.5rem',
  },
  reviewerImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '2px solid var(--primary)',
  },
  reviewerName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  reviewerDestination: {
    fontSize: '0.9rem',
    color: '#94A3B8',
    marginBottom: '0.5rem',
  },
  reviewRating: {
    display: 'flex',
    gap: '0.25rem',
    justifyContent: 'center',
  },
  carouselControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
  },
  carouselBtn: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    border: '1px solid rgba(37, 99, 235, 0.3)',
    color: 'var(--primary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
  },
  carouselDots: {
    display: 'flex',
    gap: '0.5rem',
  },
  carouselDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  reviewsGridSection: {
    padding: '4rem 4rem 6rem',
    backgroundColor: 'rgba(15, 23, 42, 0.3)',
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '800',
    marginBottom: '3rem',
    textAlign: 'center',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  reviewsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  reviewCard: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'var(--transition)',
  },
  reviewCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  reviewCardImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '2px solid var(--primary)',
  },
  reviewCardInfo: {
    flex: 1,
  },
  reviewCardName: {
    fontSize: '1rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  reviewCardDestination: {
    fontSize: '0.85rem',
    color: '#94A3B8',
  },
  reviewCardRating: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '1rem',
  },
  reviewCardText: {
    fontSize: '0.95rem',
    color: '#94A3B8',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  reviewCardDate: {
    fontSize: '0.85rem',
    color: '#64748B',
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
  ctaBtn: {
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
