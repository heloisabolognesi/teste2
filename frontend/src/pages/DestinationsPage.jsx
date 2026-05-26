import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, MapPin, Star, Users, TrendingUp, Filter, X } from 'lucide-react';

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'beach', name: 'Praias' },
    { id: 'mountain', name: 'Montanhas' },
    { id: 'city', name: 'Cidades' },
    { id: 'adventure', name: 'Aventura' },
    { id: 'culture', name: 'Cultura' },
  ];

  const destinations = [
    {
      id: 1,
      name: 'Fernando de Noronha',
      country: 'Brasil',
      category: 'beach',
      rating: 4.9,
      reviews: 1240,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      description: 'Arquipélago paradisíaco com praias virgens e vida marinha exuberante',
      visitors: '15K+',
    },
    {
      id: 2,
      name: 'Bali',
      country: 'Indonésia',
      category: 'beach',
      rating: 4.8,
      reviews: 2150,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      description: 'Templos antigos, praias de areia branca e cultura vibrante',
      visitors: '25K+',
    },
    {
      id: 3,
      name: 'Paris',
      country: 'França',
      category: 'city',
      rating: 4.7,
      reviews: 3890,
      popularity: 'Lendário',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      description: 'A cidade da luz, romance e arte. Museus, cafés e monumentos históricos',
      visitors: '40K+',
    },
    {
      id: 4,
      name: 'Tóquio',
      country: 'Japão',
      category: 'city',
      rating: 4.9,
      reviews: 2560,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      description: 'A metrópole que nunca dorme, onde arranha-céus neon encontram santuários serenos.',
      visitors: '30K+',
    },
    {
      id: 13,
      name: 'Roma',
      country: 'Itália',
      category: 'culture',
      rating: 4.9,
      reviews: 4120,
      popularity: 'Lendário',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
      description: 'O museu a céu aberto. Explore o Coliseu, o Vaticano e a culinária italiana autêntica.',
      visitors: '50K+',
    },
    {
      id: 5,
      name: 'Suíça - Alpes',
      country: 'Suíça',
      category: 'mountain',
      rating: 4.8,
      reviews: 1890,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      description: 'Montanhas majestosas, trilhas espetaculares e paisagens de tirar o fôlego',
      visitors: '18K+',
    },
    {
      id: 6,
      name: 'Nova Zelândia',
      country: 'Nova Zelândia',
      category: 'adventure',
      rating: 4.9,
      reviews: 2340,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
      description: 'Aventura pura: trilhas, montanhas, fiordes e atividades radicais',
      visitors: '22K+',
    },
    {
      id: 7,
      name: 'Egito - Giza',
      country: 'Egito',
      category: 'culture',
      rating: 4.6,
      reviews: 1650,
      popularity: 'Histórico',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      description: 'Pirâmides, templos antigos e história milenar em cada esquina',
      visitors: '28K+',
    },
    {
      id: 8,
      name: 'Tailândia - Phuket',
      country: 'Tailândia',
      category: 'beach',
      rating: 4.7,
      reviews: 2890,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
      description: 'Praias paradisíacas, templos budistas e vida noturna vibrante',
      visitors: '35K+',
    },
    {
      id: 9,
      name: 'Barcelona',
      country: 'Espanha',
      category: 'city',
      rating: 4.8,
      reviews: 2450,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
      description: 'Arquitetura de Gaudí, praias urbanas e energia catalã contagiante',
      visitors: '32K+',
    },
    {
      id: 10,
      name: 'Islândia',
      country: 'Islândia',
      category: 'adventure',
      rating: 4.9,
      reviews: 1780,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      description: 'Gêiseres, cachoeiras, geleiras e auroras boreais em paisagens alienígenas',
      visitors: '16K+',
    },
    {
      id: 11,
      name: 'Marrocos - Marrakech',
      country: 'Marrocos',
      category: 'culture',
      rating: 4.7,
      reviews: 1920,
      popularity: 'Popular',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80',
      description: 'Medinas coloridas, desertos do Saara e arquitetura islâmica fascinante',
      visitors: '20K+',
    },
    {
      id: 12,
      name: 'Canadá - Banff',
      country: 'Canadá',
      category: 'mountain',
      rating: 4.9,
      reviews: 1650,
      popularity: 'Muito Popular',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
      description: 'Parques nacionais com lagos turquesa, montanhas rochosas e trilhas épicas',
      visitors: '19K+',
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       dest.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

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
          <Link to="/destinos" style={styles.activeNavLink}>DESTINOS</Link>
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
          <h1 style={styles.heroTitle}>Explore Destinos Incríveis</h1>
          <p style={styles.heroSubtitle}>
            Descubra mais de 500 destinos curados em todo o mundo
          </p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <Search size={20} color="#94A3B8" />
            <input
              type="text"
              placeholder="Buscar destinos, países..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <button
            style={styles.filterBtn}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filtros
          </button>
        </div>

        {/* CATEGORIES */}
        <div style={styles.categoriesContainer}>
          {categories.map((cat) => (
              <button
              key={cat.id}
              style={{
                ...styles.categoryBtn,
                backgroundColor: selectedCategory === cat.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                borderColor: selectedCategory === cat.id ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                color: selectedCategory === cat.id ? '#FFF' : '#94A3B8',
                padding: '0.75rem 1.5rem',
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section style={styles.destinationsSection}>
        <div style={styles.resultsHeader}>
          <h2 style={styles.resultsTitle}>
            {filteredDestinations.length} destinos encontrados
          </h2>
        </div>

        <div style={styles.destinationsGrid}>
          {filteredDestinations.map((dest) => (
            <div key={dest.id} style={styles.destCard}>
              <div
                style={{
                  ...styles.destImage,
                  backgroundImage: `url('${dest.image}')`,
                }}
              >
                <div style={styles.destImageOverlay} />
                <div style={styles.destBadge}>{dest.popularity}</div>
              </div>

              <div style={styles.destCardContent}>
                <div style={styles.destHeader}>
                  <div>
                    <h3 style={styles.destName}>{dest.name}</h3>
                    <p style={styles.destCountry}>
                      <MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} />
                      {dest.country}
                    </p>
                  </div>
                  <div style={styles.destRating}>
                    <Star size={16} fill="var(--primary)" color="var(--primary)" />
                    <span style={styles.ratingValue}>{dest.rating}</span>
                  </div>
                </div>

                <p style={styles.destDescription}>{dest.description}</p>

                <div style={styles.destStats}>
                  <div style={styles.statItem}>
                    <Users size={14} color="var(--primary)" />
                    <span>{dest.visitors}</span>
                  </div>
                  <div style={styles.statItem}>
                    <TrendingUp size={14} color="var(--primary)" />
                    <span>{dest.reviews} avaliações</span>
                  </div>
                </div>

                <Link to="/register" style={styles.destCTA}>
                  Explorar <span style={{ marginLeft: '4px' }}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={styles.emptyState}>
            <p>Nenhum destino encontrado. Tente ajustar seus filtros.</p>
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Pronto para sua próxima aventura?</h2>
          <p style={styles.ctaDesc}>
            Crie sua conta e comece a planejar roteiros incríveis agora mesmo
          </p>
          <Link to="/register" className="btn btn-primary" style={styles.ctaBtn}>
            Começar Agora
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
  searchSection: {
    padding: '2rem 4rem 4rem',
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 2rem',
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 'var(--radius-md)',
    padding: '0.75rem 1rem',
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: '#FFF',
    fontSize: '1rem',
    outline: 'none',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    border: '1px solid rgba(37, 99, 235, 0.3)',
    color: 'var(--primary)',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    fontWeight: '600',
  },
  categoriesContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  categoryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-full)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  destinationsSection: {
    padding: '2rem 4rem 6rem',
  },
  resultsHeader: {
    marginBottom: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 2rem',
  },
  resultsTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: '#FFF',
  },
  destinationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  destCard: {
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'var(--transition)',
    display: 'flex',
    flexDirection: 'column',
  },
  destImage: {
    width: '100%',
    height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: '1rem',
  },
  destImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  destBadge: {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: '700',
  },
  destCardContent: {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  destHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  },
  destName: {
    fontSize: '1.3rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
  },
  destCountry: {
    fontSize: '0.9rem',
    color: '#94A3B8',
    display: 'flex',
    alignItems: 'center',
  },
  destRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-md)',
  },
  ratingValue: {
    fontSize: '0.9rem',
    fontWeight: '700',
  },
  destDescription: {
    fontSize: '0.95rem',
    color: '#94A3B8',
    lineHeight: '1.5',
    marginBottom: '1rem',
    flex: 1,
  },
  destStats: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#94A3B8',
  },
  destCTA: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--primary)',
    color: '#FFF',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    fontWeight: '700',
    transition: 'var(--transition-fast)',
    textDecoration: 'none',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    color: '#94A3B8',
  },
  ctaSection: {
    padding: '4rem 4rem',
    textAlign: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
  },
  ctaContent: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #FFF 40%, #93C5FD 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  ctaDesc: {
    fontSize: '1rem',
    color: '#94A3B8',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  ctaBtn: {
    padding: '0.9rem 2.5rem',
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
