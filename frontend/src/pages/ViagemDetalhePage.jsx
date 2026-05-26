import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import ActivityItem from '../components/ActivityItem';
import GastoItem from '../components/GastoItem';
import FavoritoCard from '../components/FavoritoCard';
import Modal from '../components/Modal';
import { 
  Calendar, MapPin, DollarSign, ListTodo, Star, ArrowLeft, Plus, 
  Home, Car, Coffee, Landmark, ShoppingBag, Info, Loader2, AlertCircle, Percent
} from 'lucide-react';

export default function ViagemDetalhePage() {
  const { id } = useParams(); // ID da viagem
  const [viagem, setViagem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('roteiro'); // 'roteiro' | 'financeiro' | 'favoritos'

  // Estados dos Dados das Abas
  const [roteiro, setRoteiro] = useState([]);
  const [financeiro, setFinanceiro] = useState({ gastos: [], orcamento: 0, totalGasto: 0, saldoRestante: 0, gastosPorCategoria: {} });
  const [favoritos, setFavoritos] = useState([]);

  // Estado para abertura de Modais de Inserção
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isGastoModalOpen, setIsGastoModalOpen] = useState(false);
  const [isFavoritoModalOpen, setIsFavoritoModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Campos dos Formulários
  // 1. Atividade Roteiro
  const [actTitulo, setActTitulo] = useState('');
  const [actDescricao, setActDescricao] = useState('');
  const [actData, setActData] = useState('');
  const [actHorario, setActHorario] = useState('');
  // 2. Gasto Financeiro
  const [gasDescricao, setGasDescricao] = useState('');
  const [gasCategoria, setGasCategoria] = useState('outro');
  const [gasValor, setGasValor] = useState('');
  const [gasData, setGasData] = useState('');
  // 3. Local Favoritado
  const [favNome, setFavNome] = useState('');
  const [favTipo, setFavTipo] = useState('restaurante');
  const [favEndereco, setFavEndereco] = useState('');
  const [favObservacoes, setFavObservacoes] = useState('');
  const [favAvaliacao, setFavAvaliacao] = useState('5');

  // Carregar dados iniciais da viagem e das abas
  useEffect(() => {
    loadViagemDados();
  }, [id]);

  const loadViagemDados = async () => {
    try {
      setLoading(true);
      const resViagem = await api.get(`/viagens/${id}`);
      setViagem(resViagem.data);

      // Carregar todas as abas
      await Promise.all([
        fetchRoteiro(),
        fetchGastos(),
        fetchFavoritos()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados da viagem:', error);
    } finally {
      setLoading(false);
    }
  };

  // FETCHS E OPERAÇÕES DA ABA ROTEIRO
  const fetchRoteiro = async () => {
    const res = await api.get(`/viagens/${id}/roteiro`);
    setRoteiro(res.data);
  };

  const handleToggleActivity = async (atividade) => {
    try {
      await api.put(`/roteiro/${atividade.id}`, {
        ...atividade,
        concluida: !atividade.concluida
      });
      fetchRoteiro();
    } catch (error) {
      console.error('Erro ao alternar status da atividade:', error);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!actTitulo) {
      setErrorMsg('O título da atividade é obrigatório.');
      return;
    }
    try {
      await api.post(`/viagens/${id}/roteiro`, {
        titulo: actTitulo,
        descricao: actDescricao,
        data_atividade: actData || null,
        horario: actHorario || null
      });
      setIsActivityModalOpen(false);
      setActTitulo('');
      setActDescricao('');
      setActData('');
      setActHorario('');
      fetchRoteiro();
    } catch (error) {
      console.error('Erro ao criar atividade:', error);
      setErrorMsg('Erro ao adicionar atividade.');
    }
  };

  const handleDeleteActivity = async (actId) => {
    if (window.confirm('Excluir esta atividade do roteiro?')) {
      try {
        await api.delete(`/roteiro/${actId}`);
        fetchRoteiro();
      } catch (error) {
        console.error('Erro ao deletar atividade:', error);
      }
    }
  };

  // FETCHS E OPERAÇÕES DA ABA GASTOS
  const fetchGastos = async () => {
    const res = await api.get(`/viagens/${id}/gastos`);
    setFinanceiro(res.data);
  };

  const handleCreateGasto = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!gasDescricao || !gasValor) {
      setErrorMsg('Descrição e valor do gasto são obrigatórios.');
      return;
    }
    try {
      await api.post(`/viagens/${id}/gastos`, {
        descricao: gasDescricao,
        categoria: gasCategoria,
        valor: Number(gasValor),
        data_gasto: gasData || null
      });
      setIsGastoModalOpen(false);
      setGasDescricao('');
      setGasCategoria('outro');
      setGasValor('');
      setGasData('');
      fetchGastos();
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
      setErrorMsg('Erro ao registrar gasto.');
    }
  };

  const handleDeleteGasto = async (gastoId) => {
    if (window.confirm('Remover este registro de despesa?')) {
      try {
        await api.delete(`/gastos/${gastoId}`);
        fetchGastos();
      } catch (error) {
        console.error('Erro ao deletar gasto:', error);
      }
    }
  };

  // FETCHS E OPERAÇÕES DA ABA FAVORITOS
  const fetchFavoritos = async () => {
    const res = await api.get(`/viagens/${id}/favoritos`);
    setFavoritos(res.data);
  };

  const handleCreateFavorito = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!favNome) {
      setErrorMsg('O nome do local é obrigatório.');
      return;
    }
    try {
      await api.post(`/viagens/${id}/favoritos`, {
        nome: favNome,
        tipo: favTipo,
        endereco: favEndereco,
        observacoes: favObservacoes,
        avaliacao: Number(favAvaliacao)
      });
      setIsFavoritoModalOpen(false);
      setFavNome('');
      setFavTipo('restaurante');
      setFavEndereco('');
      setFavObservacoes('');
      setFavAvaliacao('5');
      fetchFavoritos();
    } catch (error) {
      console.error('Erro ao favoritar local:', error);
      setErrorMsg('Erro ao favoritar local.');
    }
  };

  const handleDeleteFavorito = async (favId) => {
    if (window.confirm('Remover este local dos favoritos?')) {
      try {
        await api.delete(`/favoritos/${favId}`);
        fetchFavoritos();
      } catch (error) {
        console.error('Erro ao deletar favorito:', error);
      }
    }
  };

  // AUXILIARES
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

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
        <span style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando detalhes da viagem...</span>
      </div>
    );
  }

  if (!viagem) {
    return (
      <div style={styles.errorContainer}>
        <AlertCircle size={40} color="var(--danger)" />
        <h4>Viagem não encontrada</h4>
        <Link to="/viagens" className="btn btn-outline" style={{ marginTop: '1rem' }}>
          Voltar para Minhas Viagens
        </Link>
      </div>
    );
  }

  // Cálculos financeiros de porcentagem spent
  const orcamentoTotal = financeiro.orcamento || 0;
  const gastoTotal = financeiro.totalGasto || 0;
  const pctGasto = orcamentoTotal > 0 ? Math.min(Math.round((gastoTotal / orcamentoTotal) * 100), 100) : 0;
  
  // Imagem do header
  const coverImg = viagem.imagem_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="fade-in" style={styles.page}>
      {/* Botão de Voltar */}
      <Link to="/viagens" style={styles.backBtn}>
        <ArrowLeft size={16} /> Voltar para Viagens
      </Link>

      {/* 1. HEADER HERO DA VIAGEM */}
      <div className="glass" style={{ ...styles.heroHeader, backgroundImage: `url(${coverImg})` }}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <div style={styles.heroMetaRow}>
            <span style={styles.heroDest}>
              <MapPin size={18} style={{ marginRight: '4px' }} />
              {viagem.destino}
            </span>
            <span style={styles.heroDates}>
              <Calendar size={18} style={{ marginRight: '4px' }} />
              {formatDate(viagem.data_ida)} a {formatDate(viagem.data_volta)}
            </span>
          </div>
          <h1 style={styles.heroTitle}>{viagem.nome}</h1>
          {viagem.descricao && <p style={styles.heroDesc}>{viagem.descricao}</p>}
        </div>
      </div>

      {/* 2. ABAS DE NAVEGAÇÃO INTERNA */}
      <div className="glass" style={styles.tabsContainer}>
        <button 
          onClick={() => setActiveTab('roteiro')}
          style={{ ...styles.tabBtn, 
            color: activeTab === 'roteiro' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottomColor: activeTab === 'roteiro' ? 'var(--primary)' : 'transparent' 
          }}
        >
          <ListTodo size={18} /> Roteiro de Atividades
        </button>
        <button 
          onClick={() => setActiveTab('financeiro')}
          style={{ ...styles.tabBtn, 
            color: activeTab === 'financeiro' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottomColor: activeTab === 'financeiro' ? 'var(--primary)' : 'transparent' 
          }}
        >
          <DollarSign size={18} /> Controle Financeiro
        </button>
        <button 
          onClick={() => setActiveTab('favoritos')}
          style={{ ...styles.tabBtn, 
            color: activeTab === 'favoritos' ? 'var(--primary)' : 'var(--text-secondary)',
            borderBottomColor: activeTab === 'favoritos' ? 'var(--primary)' : 'transparent' 
          }}
        >
          <Star size={18} /> Locais Favoritos
        </button>
      </div>

      {/* 3. CONTEÚDO DAS ABAS */}
      <div style={styles.tabContent}>
        
        {/* ABA ROTEIRO */}
        {activeTab === 'roteiro' && (
          <div className="fade-in">
            <div style={styles.tabSectionHeader}>
              <div>
                <h3 style={styles.tabSectionTitle}>Roteiro Diário</h3>
                <p style={styles.tabSectionSub}>Organize o seu cronograma e marque o que já concluiu.</p>
              </div>
              <button onClick={() => setIsActivityModalOpen(true)} className="btn btn-primary btn-sm" style={styles.actionBtn}>
                <Plus size={16} /> Adicionar Atividade
              </button>
            </div>

            {roteiro.length === 0 ? (
              <div className="glass" style={styles.emptyTab}>
                <ListTodo size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h4 style={styles.emptyTabTitle}>Nenhuma atividade no cronograma</h4>
                <p style={styles.emptyTabText}>Adicione visitas, vôos, reservas e passeios ao seu roteiro.</p>
                <button onClick={() => setIsActivityModalOpen(true)} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                  Planejar Nova Atividade
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {roteiro.map((atividade) => (
                  <ActivityItem
                    key={atividade.id}
                    atividade={atividade}
                    onToggleComplete={handleToggleActivity}
                    onDelete={handleDeleteActivity}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABA FINANCEIRO */}
        {activeTab === 'financeiro' && (
          <div className="fade-in">
            <div style={styles.tabSectionHeader}>
              <div>
                <h3 style={styles.tabSectionTitle}>Gestão de Gastos</h3>
                <p style={styles.tabSectionSub}>Mantenha o seu mochilão saudável e dentro do limite ideal.</p>
              </div>
              <button onClick={() => setIsGastoModalOpen(true)} className="btn btn-primary btn-sm" style={styles.actionBtn}>
                <Plus size={16} /> Registrar Gasto
              </button>
            </div>

            {/* Cards Financeiros Rápidos */}
            <div style={styles.financeMetricsGrid}>
              <div className="glass" style={{ ...styles.financeMetricCard, borderLeft: '4px solid var(--primary)' }}>
                <span style={styles.metricLabel}>Orçamento Inicial</span>
                <span style={styles.metricVal}>{formatCurrency(orcamentoTotal)}</span>
              </div>
              <div className="glass" style={{ ...styles.financeMetricCard, borderLeft: '4px solid var(--secondary)' }}>
                <span style={styles.metricLabel}>Total Despendido</span>
                <span style={styles.metricVal}>{formatCurrency(gastoTotal)}</span>
              </div>
              <div className="glass" style={{ 
                ...styles.financeMetricCard, 
                borderLeft: financeiro.saldoRestante >= 0 ? '4px solid var(--success)' : '4px solid var(--danger)' 
              }}>
                <span style={styles.metricLabel}>Saldo Restante</span>
                <span style={{ ...styles.metricVal, color: financeiro.saldoRestante >= 0 ? 'var(--text-primary)' : '#EF4444' }}>
                  {formatCurrency(financeiro.saldoRestante)}
                </span>
              </div>
            </div>

            {/* Barra de Progresso visual */}
            <div className="glass" style={styles.progressCard}>
              <div style={styles.progressHeader}>
                <span style={styles.progressTitle}>Meta Financeira Consumida</span>
                <span style={styles.progressPercentage}>{pctGasto}%</span>
              </div>
              <div style={styles.progressBarTrack}>
                <div style={{ ...styles.progressBarFill, width: `${pctGasto}%`, 
                  backgroundColor: pctGasto > 85 ? 'var(--danger)' : pctGasto > 60 ? 'var(--warning)' : 'var(--success)' 
                }} />
              </div>
            </div>

            {/* Layout em Colunas: Divisão por categoria no lado esquerdo, lista no direito */}
            <div style={styles.financeColumns}>
              {/* Esquerda: Agrupamento por Categoria */}
              <div className="glass" style={styles.financeLeftCol}>
                <h4 style={styles.categoryTitle}>Distribuição das Despesas</h4>
                <div style={styles.categoryList}>
                  {Object.entries(financeiro.gastosPorCategoria).map(([cat, val]) => {
                    const pct = gastoTotal > 0 ? Math.round((val / gastoTotal) * 100) : 0;
                    return (
                      <div key={cat} style={styles.categoryRow}>
                        <div style={styles.categoryInfo}>
                          <span style={{ textTransform: 'capitalize', fontSize: '0.82rem', fontWeight: '600' }}>
                            {cat}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {formatCurrency(val)} ({pct}%)
                          </span>
                        </div>
                        <div style={styles.miniTrack}>
                          <div style={{ ...styles.miniFill, width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direita: Lista Individual de Gastos */}
              <div style={styles.financeRightCol}>
                <h4 style={styles.categoryTitle}>Registros Individuais</h4>
                {financeiro.gastos.length === 0 ? (
                  <div className="glass" style={{ ...styles.emptyTab, padding: '2rem' }}>
                    <DollarSign size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                    <h5 style={styles.emptyTabTitle}>Nenhuma despesa registrada</h5>
                    <p style={styles.emptyTabText}>Adicione os jantares, hotéis ou passagens da viagem.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {financeiro.gastos.map((gasto) => (
                      <GastoItem
                        key={gasto.id}
                        gasto={gasto}
                        onDelete={handleDeleteGasto}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ABA FAVORITOS */}
        {activeTab === 'favoritos' && (
          <div className="fade-in">
            <div style={styles.tabSectionHeader}>
              <div>
                <h3 style={styles.tabSectionTitle}>Locais Recomendados</h3>
                <p style={styles.tabSectionSub}>Lugares imperdíveis que você conheceu ou planeja visitar.</p>
              </div>
              <button onClick={() => setIsFavoritoModalOpen(true)} className="btn btn-primary btn-sm" style={styles.actionBtn}>
                <Plus size={16} /> Favoritar Local
              </button>
            </div>

            {favoritos.length === 0 ? (
              <div className="glass" style={styles.emptyTab}>
                <Star size={40} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h4 style={styles.emptyTabTitle}>Nenhum local favoritado</h4>
                <p style={styles.emptyTabText}>Salve e classifique os melhores hotéis, museus e restaurantes.</p>
                <button onClick={() => setIsFavoritoModalOpen(true)} className="btn btn-outline" style={{ marginTop: '0.5rem' }}>
                  Favoritar Primeiro Local
                </button>
              </div>
            ) : (
              <div style={styles.favoritosGrid}>
                {favoritos.map((favorito) => (
                  <div key={favorito.id} style={{ height: '100%' }}>
                    <FavoritoCard
                      favorito={favorito}
                      onDelete={handleDeleteFavorito}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAIS */}
      
      {/* 1. Modal Atividade Roteiro */}
      <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} title="Nova Atividade no Roteiro">
        {errorMsg && <div style={styles.formErrorBox}><AlertCircle size={14} />{errorMsg}</div>}
        <form onSubmit={handleCreateActivity}>
          <div className="form-group">
            <label className="form-label">TÍTULO DA ATIVIDADE *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Check-in no hotel, Visita ao Museu, Jantar"
              value={actTitulo}
              onChange={(e) => setActTitulo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">DESCRIÇÃO</label>
            <textarea
              className="form-input"
              placeholder="Ex: Detalhes, código de reserva, transporte..."
              value={actDescricao}
              onChange={(e) => setActDescricao(e.target.value)}
            />
          </div>
          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">DATA DA ATIVIDADE</label>
              <input
                type="date"
                className="form-input"
                value={actData}
                onChange={(e) => setActData(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">HORÁRIO</label>
              <input
                type="time"
                className="form-input"
                value={actHorario}
                onChange={(e) => setActHorario(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.modalFooter}>
            <button type="button" className="btn btn-outline" onClick={() => setIsActivityModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Adicionar Atividade</button>
          </div>
        </form>
      </Modal>

      {/* 2. Modal Gasto Financeiro */}
      <Modal isOpen={isGastoModalOpen} onClose={() => setIsGastoModalOpen(false)} title="Registrar Nova Despesa">
        {errorMsg && <div style={styles.formErrorBox}><AlertCircle size={14} />{errorMsg}</div>}
        <form onSubmit={handleCreateGasto}>
          <div className="form-group">
            <label className="form-label">DESCRIÇÃO DA DESPESA *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Passagem de trem, Jantar Italiano, Diárias Hotel"
              value={gasDescricao}
              onChange={(e) => setGasDescricao(e.target.value)}
              required
            />
          </div>
          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">VALOR DO GASTO (R$) *</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                placeholder="Ex: 120.50"
                value={gasValor}
                onChange={(e) => setGasValor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">CATEGORIA</label>
              <select
                className="form-input form-select"
                value={gasCategoria}
                onChange={(e) => setGasCategoria(e.target.value)}
              >
                <option value="hospedagem">Hospedagem</option>
                <option value="transporte">Transporte</option>
                <option value="alimentacao">Alimentação</option>
                <option value="passeio">Passeio</option>
                <option value="compras">Compras</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">DATA DO GASTO</label>
            <input
              type="date"
              className="form-input"
              value={gasData}
              onChange={(e) => setGasData(e.target.value)}
            />
          </div>
          <div style={styles.modalFooter}>
            <button type="button" className="btn btn-outline" onClick={() => setIsGastoModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Registrar Despesa</button>
          </div>
        </form>
      </Modal>

      {/* 3. Modal Local Favoritado */}
      <Modal isOpen={isFavoritoModalOpen} onClose={() => setIsFavoritoModalOpen(false)} title="Favoritar Novo Local">
        {errorMsg && <div style={styles.formErrorBox}><AlertCircle size={14} />{errorMsg}</div>}
        <form onSubmit={handleCreateFavorito}>
          <div className="form-group">
            <label className="form-label">NOME DO LOCAL *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Pizzaria da Praça, Hotel Hilton, Torre Eiffel"
              value={favNome}
              onChange={(e) => setFavNome(e.target.value)}
              required
            />
          </div>
          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">TIPO</label>
              <select
                className="form-input form-select"
                value={favTipo}
                onChange={(e) => setFavTipo(e.target.value)}
              >
                <option value="restaurante">Restaurante</option>
                <option value="hotel">Hospedagem</option>
                <option value="ponto_turistico">Ponto Turístico</option>
                <option value="local_interessante">Local de Interesse</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">AVALIAÇÃO DE 1 A 5</label>
              <select
                className="form-input form-select"
                value={favAvaliacao}
                onChange={(e) => setFavAvaliacao(e.target.value)}
              >
                <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                <option value="4">⭐⭐⭐⭐ (Muito Bom)</option>
                <option value="3">⭐⭐⭐ (Regular)</option>
                <option value="2">⭐⭐ (Ruim)</option>
                <option value="1">⭐ (Péssimo)</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">ENDEREÇO COMPLETO</label>
            <input
              type="text"
              className="form-input"
              placeholder="Rua, Número, Bairro, Cidade..."
              value={favEndereco}
              onChange={(e) => setFavEndereco(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">OBSERVAÇÕES / REVIEW</label>
            <textarea
              className="form-input"
              placeholder="O que achou do prato? Como era o serviço? Detalhes..."
              value={favObservacoes}
              onChange={(e) => setFavObservacoes(e.target.value)}
            />
          </div>
          <div style={styles.modalFooter}>
            <button type="button" className="btn btn-outline" onClick={() => setIsFavoritoModalOpen(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar Favorito</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
  },
  loadingContainer: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginBottom: '1.25rem',
    transition: 'var(--transition-fast)',
    alignSelf: 'flex-start',
    ':hover': {
      color: 'var(--text-primary)',
    },
  },
  heroHeader: {
    height: '240px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '2.5rem',
    marginBottom: '2rem',
    border: '1px solid var(--border-color)',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(5,8,16,0.1) 0%, rgba(5,8,16,0.85) 100%)',
    zIndex: 1,
  },
  heroContent: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    width: '100%',
  },
  heroMetaRow: {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '0.85rem',
    color: '#D1D5DB',
  },
  heroDest: {
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: '600',
    color: 'var(--primary)',
  },
  heroDates: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: '-0.03em',
  },
  heroDesc: {
    fontSize: '0.88rem',
    color: '#94A3B8',
    marginTop: '0.25rem',
    maxWidth: '800px',
    lineHeight: '1.5',
  },
  tabsContainer: {
    display: 'flex',
    gap: '1.5rem',
    padding: '0 1.5rem',
    borderRadius: 'var(--radius-md)',
    marginBottom: '2rem',
    backgroundColor: 'var(--bg-card)',
  },
  tabBtn: {
    padding: '1.25rem 0.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    borderBottom: '3px solid transparent',
    transition: 'var(--transition)',
  },
  tabContent: {
    minHeight: '200px',
  },
  tabSectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  tabSectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '0.25rem',
  },
  tabSectionSub: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  actionBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 1.25rem',
    fontSize: '0.85rem',
  },
  emptyTab: {
    padding: '4rem 2rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'var(--bg-card)',
  },
  emptyTabTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '0.35rem',
  },
  emptyTabText: {
    fontSize: '0.82rem',
    color: 'var(--text-secondary)',
    maxWidth: '380px',
    lineHeight: '1.5',
    marginBottom: '1rem',
  },
  financeMetricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  },
  financeMetricCard: {
    padding: '1.25rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  metricLabel: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  metricVal: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  progressCard: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    marginBottom: '2rem',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  progressTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  progressPercentage: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  progressBarTrack: {
    height: '10px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 'var(--radius-full)',
    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  financeColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '1.5rem',
    alignItems: 'flex-start',
  },
  financeLeftCol: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
  },
  categoryTitle: {
    fontSize: '1rem',
    fontWeight: '650',
    color: 'var(--text-primary)',
    marginBottom: '1.25rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  categoryRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  categoryInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniTrack: {
    height: '6px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  miniFill: {
    height: '100%',
    backgroundColor: 'var(--primary)',
    borderRadius: 'var(--radius-full)',
  },
  financeRightCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  favoritosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formErrorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#FC8181',
    fontSize: '0.78rem',
    border: '1px solid var(--danger)',
    marginBottom: '1rem',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
};
