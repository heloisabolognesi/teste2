import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, MapPin, Trash2, Edit } from 'lucide-react';

export default function TripCard({ viagem, onEdit, onDelete }) {
  // Formatar datas para o padrão brasileiro DD/MM/AAAA
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  // Formatar valor financeiro para R$
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Cores dos badges de status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'em_andamento':
        return { bg: 'rgba(249, 115, 22, 0.15)', text: '#F97316', label: 'Em Andamento' };
      case 'concluida':
        return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', label: 'Concluída' };
      case 'cancelada':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', label: 'Cancelada' };
      case 'planejada':
      default:
        return { bg: 'rgba(37, 99, 235, 0.15)', text: '#2563EB', label: 'Planejada' };
    }
  };

  const statusStyle = getStatusStyle(viagem.status);

  // Imagem padrão caso o usuário não informe uma URL válida
  const defaultImage = `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80`;
  const bgImage = viagem.imagem_url || defaultImage;

  return (
    <div className="glass glass-hover fade-in" style={styles.card}>
      {/* Banner da Imagem */}
      <div style={{ ...styles.imageSection, backgroundImage: `url(${bgImage})` }}>
        <div style={styles.gradientOverlay} />
        
        {/* Badge de Status */}
        <span style={{ ...styles.statusBadge, backgroundColor: statusStyle.bg, color: statusStyle.text }}>
          {statusStyle.label}
        </span>

        {/* Nome da Viagem */}
        <div style={styles.imageText}>
          <h4 style={styles.tripName}>{viagem.nome}</h4>
          <span style={styles.tripDest}>
            <MapPin size={14} style={{ marginRight: '4px' }} />
            {viagem.destino}
          </span>
        </div>
      </div>

      {/* Detalhes da Viagem */}
      <div style={styles.detailsSection}>
        {/* Datas */}
        <div style={styles.detailRow}>
          <Calendar size={16} color="var(--text-muted)" />
          <span style={styles.detailText}>
            {formatDate(viagem.data_ida)} até {formatDate(viagem.data_volta)}
          </span>
        </div>

        {/* Orçamento */}
        <div style={styles.detailRow}>
          <DollarSign size={16} color="var(--success)" />
          <span style={styles.detailText}>
            Orçamento: <strong style={styles.budgetVal}>{formatCurrency(viagem.orcamento)}</strong>
          </span>
        </div>

        {/* Descrição curta */}
        {viagem.descricao && (
          <p style={styles.descText}>{viagem.descricao}</p>
        )}

        {/* Ações */}
        <div style={styles.actions}>
          <Link to={`/viagem/${viagem.id}`} className="btn btn-outline" style={styles.viewBtn}>
            Gerenciar Viagem
          </Link>
          
          <div style={styles.adminButtons}>
            <button onClick={() => onEdit(viagem)} style={styles.actionIconBtn} title="Editar Viagem">
              <Edit size={16} color="var(--text-secondary)" />
            </button>
            <button onClick={() => onDelete(viagem.id)} style={{ ...styles.actionIconBtn, backgroundColor: 'rgba(239, 68, 68, 0.08)' }} title="Excluir Viagem">
              <Trash2 size={16} color="var(--danger)" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'var(--transition)',
  },
  imageSection: {
    height: '180px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1.25rem',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.85) 100%)',
    zIndex: 1,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    padding: '0.35rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.03em',
    zIndex: 2,
    backdropFilter: 'blur(4px)',
  },
  imageText: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  tripName: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#FFF',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  },
  tripDest: {
    fontSize: '0.8rem',
    color: '#D1D5DB',
    display: 'inline-flex',
    alignItems: 'center',
    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
  },
  detailsSection: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flexGrow: 1,
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  detailText: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
  },
  budgetVal: {
    color: 'var(--text-primary)',
  },
  descText: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0.25rem 0',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
    gap: '0.75rem',
  },
  viewBtn: {
    flexGrow: 1,
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
  },
  adminButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionIconBtn: {
    width: '34px',
    height: '34px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    transition: 'var(--transition)',
    ':hover': {
      borderColor: 'var(--text-secondary)',
    },
  },
};
