import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TripCard from '../components/TripCard';
import Modal from '../components/Modal';
import { Plus, Calendar, DollarSign, Image, MapPin, Loader2, AlertCircle } from 'lucide-react';

export default function ViagensPage() {
  const [viagens, setViagens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para modal de formulário
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  
  // Campos do Formulário
  const [nome, setNome] = useState('');
  const [destino, setDestino] = useState('');
  const [descricao, setDescricao] = useState('');
  const [orcamento, setOrcamento] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [status, setStatus] = useState('planejada');
  const [formError, setFormError] = useState('');

  // Carregar viagens na montagem
  useEffect(() => {
    loadViagens();
  }, []);

  const loadViagens = async () => {
    try {
      setLoading(true);
      const response = await api.get('/viagens');
      setViagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal para adicionar
  const handleOpenAdd = () => {
    setEditingTrip(null);
    setNome('');
    setDestino('');
    setDescricao('');
    setOrcamento('');
    setDataIda('');
    setDataVolta('');
    setImagemUrl('');
    setStatus('planejada');
    setFormError('');
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleOpenEdit = (viagem) => {
    setEditingTrip(viagem);
    setNome(viagem.nome);
    setDestino(viagem.destino);
    setDescricao(viagem.descricao || '');
    setOrcamento(viagem.orcamento || '');
    // Formatar datas para YYYY-MM-DD
    setDataIda(viagem.data_ida ? viagem.data_ida.split('T')[0] : '');
    setDataVolta(viagem.data_volta ? viagem.data_volta.split('T')[0] : '');
    setImagemUrl(viagem.imagem_url || '');
    setStatus(viagem.status);
    setFormError('');
    setIsModalOpen(true);
  };

  // Salvar (Adicionar ou Editar)
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
      if (editingTrip) {
        // Atualizar
        await api.put(`/viagens/${editingTrip.id}`, payload);
      } else {
        // Criar
        await api.post('/viagens', payload);
      }
      setIsModalOpen(false);
      loadViagens();
    } catch (error) {
      console.error('Erro ao salvar viagem:', error);
      setFormError(error.response?.data?.error || 'Erro ao salvar a viagem. Verifique as datas.');
    }
  };

  // Excluir
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza absoluta que deseja excluir esta viagem? Isso apagará todos os roteiros, gastos e favoritos atrelados a ela em cascata.')) {
      try {
        await api.delete(`/viagens/${id}`);
        loadViagens();
      } catch (error) {
        console.error('Erro ao deletar viagem:', error);
        alert('Erro ao excluir viagem.');
      }
    }
  };

  return (
    <div className="fade-in">
      {/* Cabeçalho da Lista */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Minhas Viagens</h1>
          <p style={styles.subtitle}>Gerencie todos os planejamentos de rotas do Rosa dos Ventos.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn btn-primary" style={styles.addBtn}>
          <Plus size={18} /> Nova Viagem
        </button>
      </div>

      {loading ? (
        <div style={styles.loadingContainer}>
          <Loader2 size={40} className="spin" color="var(--primary)" />
          <span style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando suas viagens...</span>
        </div>
      ) : viagens.length === 0 ? (
        <div className="glass" style={styles.emptyContainer}>
          <MapPin size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
          <h4 style={styles.emptyTitle}>Nenhuma viagem cadastrada</h4>
          <p style={styles.emptyText}>
            Comece a planejar os seus destinos adicionando a sua primeira viagem! Insira metas de orçamento e cronogramas.
          </p>
          <button onClick={handleOpenAdd} className="btn btn-primary">
            Planejar Minha Primeira Viagem
          </button>
        </div>
      ) : (
        <div style={styles.grid}>
          {viagens.map((viagem) => (
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

      {/* Modal de Formulário */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTrip ? 'Editar Detalhes da Viagem' : 'Planejar Nova Viagem'}
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
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Férias de Verão, Mochilão Europeu"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">DESTINO *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: Rio de Janeiro - RJ, Paris - França"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              required
            />
          </div>

          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">DATA DE IDA *</label>
              <input
                type="date"
                className="form-input"
                value={dataIda}
                onChange={(e) => setDataIda(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">DATA DE VOLTA *</label>
              <input
                type="date"
                className="form-input"
                value={dataVolta}
                onChange={(e) => setDataVolta(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={styles.formRow}>
            <div className="form-group">
              <label className="form-label">ORÇAMENTO PLANEJADO (R$)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                placeholder="Ex: 5000.00"
                value={orcamento}
                onChange={(e) => setOrcamento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">STATUS</label>
              <select
                className="form-input form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="planejada">Planejada</option>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL DA IMAGEM DA CAPA (OPCIONAL)</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://exemplo.com/imagem-da-cidade.jpg"
              value={imagemUrl}
              onChange={(e) => setImagemUrl(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">DESCRIÇÃO DA VIAGEM</label>
            <textarea
              className="form-input"
              placeholder="Notas gerais, observações importantes, quem vai viajar com você..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              style={{ minHeight: '80px', resize: 'vertical' }}
            />
          </div>

          <div style={styles.modalFooter}>
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTrip ? 'Atualizar Viagem' : 'Salvar Viagem'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  loadingContainer: {
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: '4rem 2rem',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid var(--danger)',
    color: '#FC8181',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.82rem',
    marginBottom: '1.25rem',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
    marginTop: '1.5rem',
    paddingTop: '1.25rem',
    borderTop: '1px solid var(--border-color)',
  },
};
