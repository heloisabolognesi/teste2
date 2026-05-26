import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StatCard from '../components/StatCard';
import TripCard from '../components/TripCard';
import Modal from '../components/Modal';
import { Compass, Calendar, DollarSign, ListTodo, Landmark, ArrowRight, Loader2, PieChart, TrendingUp, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [proximas, setProximas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para modal de edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [nome, setNome] = useState('');
  const [destino, setDestino] = useState('');
  const [descricao, setDescricao] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [status, setStatus] = useState('planejada');
  const [formError, setFormError] = useState('');

  // Carregar dados agregados do backend
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard');
      setStats(response.data.stats);
      setProximas(response.data.proximasViagens);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para editar
  const handleOpenEdit = (viagem) => {
    setEditingTrip(viagem);
    setNome(viagem.nome);
    setDestino(viagem.destino);
    setDescricao(viagem.descricao || '');
    setOrcamento(viagem.orcamento || '');
    setDataIda(viagem.data_ida ? viagem.data_ida.split('T')[0] : '');
    setDataVolta(viagem.data_volta ? viagem.data_volta.split('T')[0] : '');
    setImagemUrl(viagem.imagem_url || '');
    setStatus(viagem.status);
    setFormError('');
    setIsModalOpen(true);
  };

  // Salvar Edição
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!nome || !destino || !dataIda || !dataVolta) {
      setFormError('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    const payload = {
      nome,
      destino,
      descricao,
      orcamento: orcamento ? Number(orcamento) : 0,
      data_ida: dataIda,
      data_volta: dataVolta,
      imagem_url: imagemUrl,
      status
    };

    try {
      await api.put(`/viagens/${editingTrip.id}`, payload);
      setIsModalOpen(false);
      loadDashboardData();
    } catch (error) {
      console.error('Erro ao salvar viagem:', error);
      setFormError(error.response?.data?.error || 'Erro ao salvar a viagem.');
    }
  };

  // Excluir Viagem
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta viagem?')) {
      try {
        await api.delete(`/viagens/${id}`);
        loadDashboardData();
      } catch (error) {
        console.error('Erro ao deletar viagem:', error);
        alert('Erro ao excluir viagem.');
      }
    }
  };

  // Formatar moeda
  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Processar distribuição de gastos
  const getGastosData = () => {
    if (!stats || !stats.gastosPorCategoria || stats.gastosPorCategoria.length === 0) {
      return [];
    }

    const totalConsolidado = stats.gastosPorCategoria.reduce((acc, item) => acc + Number(item.total), 0);
    
    if (totalConsolidado === 0) return [];

    const categories = {
      hospedagem: { label: 'Hospedagem', color: '#3B82F6' },
      transporte: { label: 'Transporte', color: '#10B981' },
      alimentacao: { label: 'Alimentação', color: '#F97316' },
      passeio: { label: 'Passeios', color: '#06B6D4' },
      compras: { label: 'Compras', color: '#EC4899' },
      outro: { label: 'Outros', color: '#8B5CF6' }
    };

    return stats.gastosPorCategoria.map(item => ({
      label: categories[item.categoria]?.label || item.categoria,
      pct: Math.round((Number(item.total) / totalConsolidado) * 100),
      color: categories[item.categoria]?.color || '#64748B'
    })).sort((a, b) => b.pct - a.pct);
  };

  const progressoRoteiro = stats?.totalAtividades > 0 
    ? Math.round((Number(stats.atividadesConcluidas) / Number(stats.totalAtividades)) * 100)
    : 0;

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <Loader2 size={40} className="spin" color="var(--primary)" />
        <span style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando estatísticas...</span>
      </div>
    );
  }

  const gastosData = getGastosData();

  return (
    <div className="fade-in">
      <div style={styles.header}>
        <h1 style={styles.title}>Painel de Controle</h1>
        <p style={styles.subtitle}>Resumo completo do planejamento das suas próximas aventuras.</p>
      </div>

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
          value={formatCurrency(stats?.totalGastos)}
          icon={DollarSign}
          color="#10B981"
          subtitle="Valor consolidado em despesas"
        />
        <StatCard
          title="Atividades Concluídas"
          value={`${stats?.atividadesConcluidas || 0}/${stats?.totalAtividades || 0}`}
          icon={ListTodo}
          color="#F97316"
          subtitle={`${progressoRoteiro}% das metas realizadas`}
        />
      </div>

      <div style={styles.analyticsSection}>
        <div className="glass" style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div style={styles.chartIconWrapper}>
              <TrendingUp size={18} color="var(--primary)" />
            </div>
            <h3 style={styles.chartTitle}>Distribuição de Gastos Reais</h3>
          </div>
          <div style={styles.chartContent}>
            <div style={styles.barChart}>
              {gastosData.length === 0 ? (
                <div style={styles.emptyChartMessage}>
                  <p>Nenhum gasto registrado para exibir distribuição.</p>
                </div>
              ) : (
                gastosData.map((item, idx) => (
                  <div key={idx} style={styles.barItem}>
                    <div style={styles.barLabelContainer}>
                      <span style={styles.barLabel}>{item.label}</span>
                      <span style={styles.barValue}>{item.pct}%</span>
                    </div>
                    <div style={styles.barTrack}>
                      <div style={{ ...styles.barFill, width: `${item.pct}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="glass" style={styles.chartCard}>
          <div style={styles.chartHeader}>
            <div style={styles.chartIconWrapper}>
              <PieChart size={18} color="#8B5CF6" />
            </div>
            <h3 style={styles.chartTitle}>Progresso de Roteiros</h3>
          </div>
          <div style={styles.chartContent}>
             <div style={styles.progressCircleContainer}>
                <div style={{
                  ...styles.progressCircle,
                  background: `conic-gradient(var(--primary) 0%, var(--primary) ${progressoRoteiro}%, rgba(255,255,255,0.05) ${progressoRoteiro}%, rgba(255,255,255,0.05) 100%)`
                }}>
                  <div style={styles.progressInner}>
                    <span style={styles.progressText}>{progressoRoteiro}%</span>
                    <span style={styles.progressSubtext}>Concluído</span>
                  </div>
                </div>
                <div style={styles.progressInfo}>
                  <p style={styles.progressDesc}>
                    Você completou <strong>{stats?.atividadesConcluidas || 0}</strong> atividades de um total de <strong>{stats?.totalAtividades || 0}</strong> planejadas.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>

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
              Você não tem viagens programadas com data de ida posterior a hoje.
            </p>
            <Link to="/viagens" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              Planejar Minha Primeira Viagem
            </Link>
          </div>
        ) : (
          <div style={styles.grid}>
            {proximas.map((viagem) => (
              <div key={viagem.id} style={styles.gridItem}>
                <TripCard
                  viagem={viagem}
                  onEdit={handleOpenEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Editar Detalhes da Viagem"
      >
        {formError && (
          <div style={styles.errorBox}>
            <AlertCircle size={16} />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label className="form-label">NOME DA VIAGEM *</label>
            <input type="text" className="form-input" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">DESTINO *</label>
            <input type="text" className="form-input" value={destino} onChange={(e) => setDestino(e.target.value)} required />
          </div>
          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">DATA DE IDA *</label>
              <input type="date" className="form-input" value={dataIda} onChange={(e) => setDataIda(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">DATA DE VOLTA *</label>
              <input type="date" className="form-input" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} required />
            </div>
          </div>
          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">ORÇAMENTO PLANEJADO (R$)</label>
              <input type="number" step="0.01" className="form-input" value={orcamento} onChange={(e) => setOrcamento(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">STATUS</label>
              <select className="form-input form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="planejada">Planejada</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">URL DA IMAGEM DA CAPA</label>
            <input type="text" className="form-input" value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">DESCRIÇÃO DA VIAGEM</label>
            <textarea className="form-input" value={descricao} onChange={(e) => setDescricao(e.target.value)} style={{ minHeight: '80px', resize: 'vertical' }} />
          </div>
          <div style={styles.modalFooter}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Atualizar Viagem</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  loadingContainer: { height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  header: { marginBottom: '2rem' },
  title: { fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '0.35rem' },
  subtitle: { fontSize: '0.9rem', color: 'var(--text-secondary)' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' },
  analyticsSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
  chartCard: { padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--bg-card)' },
  chartHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' },
  chartIconWrapper: { width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  chartTitle: { fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' },
  chartContent: { minHeight: '180px', display: 'flex', alignItems: 'center' },
  barChart: { width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' },
  barItem: { width: '100%' },
  barLabelContainer: { display: 'flex', justifyContext: 'space-between', marginBottom: '0.4rem' },
  barLabel: { fontSize: '0.8rem', color: 'var(--text-secondary)' },
  barValue: { fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' },
  barTrack: { height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '10px', transition: 'width 1s ease-out' },
  emptyChartMessage: { width: '100%', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' },
  progressCircleContainer: { display: 'flex', alignItems: 'center', gap: '2rem', width: '100%' },
  progressCircle: { width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 1s ease-in-out' },
  progressInner: { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  progressText: { fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' },
  progressSubtext: { fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' },
  progressInfo: { flex: 1 },
  progressDesc: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' },
  section: { marginTop: '2rem' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: '650', color: 'var(--text-primary)' },
  seeAllLink: { fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', transition: 'var(--transition-fast)', textDecoration: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
  gridItem: { height: '100%' },
  emptyContainer: { padding: '3rem 2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', backgroundColor: 'var(--bg-card)' },
  emptyTitle: { fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' },
  emptyText: { fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '450px', lineHeight: '1.5', marginBottom: '1.25rem' },
  form: { display: 'flex', flexDirection: 'column' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  errorBox: { display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: '#FC8181', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.82rem', marginBottom: '1.25rem' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' },
};
