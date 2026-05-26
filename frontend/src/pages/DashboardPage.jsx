import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatCard from '../components/StatCard';
import TripCard from '../components/TripCard';
import { Compass, Calendar, DollarSign, ListTodo, MapPin, Landmark, ArrowRight, Loader2 } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [proximas, setProximas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados agregados do backend
  useEffect(() => {
    async function loadStats() {
      try {
        const response = await api.get('/dashboard');
        setStats(response.data.stats);
        setProximas(response.data.proximasViagens);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  // Formatar moeda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 size={40} className="spin" color="var(--primary)" />
        <span style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando estatísticas...</span>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Cabeçalho de Introdução */}
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Controle</h1>
        <p style={styles.subtitle}>Resumo completo do planejamento das suas próximas aventuras.</p>
      </div>

      {/* Cartões de Indicadores */}
      <div style={styles.statsGrid}>
        <StatCard
          title="Total de Viagens"
          value={stats?.totalViagens || 0}
          icon={Compass}
          color="#3B82F6"
          subtitle="Aventuras planejadas no total"
        />
        <StatCard
          title="Destinos Salvos"
          value={stats?.totalDestinos || 0}
          icon={Landmark}
          color="#8B5CF6"
          subtitle="Locais diferentes explorados"
        />
        <StatCard
          title="Investimento Total"
          value={formatCurrency(stats?.totalGastos || 0)}
          icon={DollarSign}
          color="#10B981"
          subtitle="Valor consolidado em despesas"
        />
        <StatCard
          title="Atividades Concluídas"
          value={
            stats?.totalAtividades > 0
              ? `${stats.atividadesConcluidas}/${stats.totalAtividades}`
              : '0/0'
          }
          icon={ListTodo}
          color="#F97316"
          subtitle={
            stats?.totalAtividades > 0
              ? `${Math.round((stats.atividadesConcluidas / stats.totalAtividades) * 100)}% das metas realizadas`
              : 'Nenhuma tarefa pendente'
          }
        />
      </div>

      {/* Próximas Viagens */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>📅 Suas Próximas Viagens</h2>
          {proximas.length > 0 && (
            <Link to="/viagens" style={styles.seeAllLink}>
              Ver todas <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </Link>
          )}
        </div>

        {proximas.length === 0 ? (
          <div className="glass" style={styles.emptyContainer}>
            <Calendar size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h4 style={styles.emptyTitle}>Nenhuma viagem futura agendada</h4>
            <p style={styles.emptyText}>
              Você não tem viagens programadas com data de ida posterior a hoje. Crie uma agora mesmo!
            </p>
            <Link to="/viagens" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Planejar Minha Primeira Viagem
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {proximas.map((viagem) => (
              <div key={viagem.id} style={styles.gridItem}>
                {/* Usando o TripCard básico com ações simuladas leves ou apenas link direto */}
                <TripCard
                  viagem={viagem}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  style={{ height: '100%' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: '2rem',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
    marginBottom: '0.35rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  section: {
    marginTop: '2rem',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: '650',
    color: 'var(--text-primary)',
  },
  seeAllLink: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--primary)',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-fast)',
    ':hover': {
      color: 'var(--primary-hover)',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  gridItem: {
    height: '100%',
  },
  emptyContainer: {
    padding: '3rem 2rem',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'var(--bg-card)',
  },
  emptyTitle: {
    fontSize: '1.05rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.5rem',
  },
  emptyText: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    maxWidth: '450px',
    lineHeight: '1.5',
    marginBottom: '1.25rem',
  },
};
