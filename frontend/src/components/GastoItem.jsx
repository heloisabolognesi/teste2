import React from 'react';
import { Coffee, Home, Car, Landmark, ShoppingBag, DollarSign, Trash2, Calendar } from 'lucide-react';

export default function GastoItem({ gasto, onDelete }) {
  // Mapear ícones por categoria
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'hospedagem':
        return { icon: Home, color: '#3B82F6', label: 'Hospedagem' };
      case 'transporte':
        return { icon: Car, color: '#8B5CF6', label: 'Transporte' };
      case 'alimentacao':
        return { icon: Coffee, color: '#10B981', label: 'Alimentação' };
      case 'passeio':
        return { icon: Landmark, color: '#F59E0B', label: 'Passeio' };
      case 'compras':
        return { icon: ShoppingBag, color: '#EC4899', label: 'Compras' };
      case 'outro':
      default:
        return { icon: DollarSign, color: '#64748B', label: 'Outro' };
    }
  };

  const catMeta = getCategoryIcon(gasto.categoria);
  const Icon = catMeta.icon;

  // Formatar moeda brasileira
  const formatCurrency = (value) => {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Formatar data
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div className="glass fade-in" style={styles.item}>
      {/* Categoria Icon */}
      <div style={{ ...styles.iconBadge, backgroundColor: `${catMeta.color}15`, color: catMeta.color }}>
        <Icon size={18} />
      </div>

      {/* Info Gasto */}
      <div style={styles.infoSection}>
        <h4 style={styles.desc}>{gasto.descricao}</h4>
        
        {/* Subtitle / Categoria & Data */}
        <div style={styles.metaRow}>
          <span style={{ ...styles.categoryPill, backgroundColor: `${catMeta.color}15`, color: catMeta.color }}>
            {catMeta.label}
          </span>
          {gasto.data_gasto && (
            <span style={styles.date}>
              <Calendar size={12} style={{ marginRight: '3px' }} />
              {formatDate(gasto.data_gasto)}
            </span>
          )}
        </div>
      </div>

      {/* Valor do Gasto */}
      <div style={styles.valueSection}>
        <span style={styles.value}>{formatCurrency(gasto.valor)}</span>
      </div>

      {/* Ações */}
      <button onClick={() => onDelete(gasto.id)} style={styles.deleteBtn} title="Remover despesa">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.85rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    marginBottom: '0.5rem',
    border: '1px solid var(--border-color)',
    transition: 'var(--transition)',
  },
  iconBadge: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
    flexGrow: 1,
  },
  desc: {
    fontSize: '0.92rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  categoryPill: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.15rem 0.5rem',
    borderRadius: 'var(--radius-full)',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },
  date: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    display: 'inline-flex',
    alignItems: 'center',
  },
  valueSection: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  value: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  deleteBtn: {
    padding: '0.5rem',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-muted)',
    transition: 'var(--transition)',
    backgroundColor: 'transparent',
    ':hover': {
      color: 'var(--danger)',
      backgroundColor: 'rgba(239, 68, 68, 0.08)',
    },
  },
};
