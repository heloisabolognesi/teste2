import React from 'react';
import { Star, MapPin, Utensils, Hotel, Compass, Info, Trash2 } from 'lucide-react';

export default function FavoritoCard({ favorito, onDelete }) {
  // Renderizar estrelas de avaliação (1 a 5)
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= rating ? 'var(--secondary)' : 'transparent'}
          color={i <= rating ? 'var(--secondary)' : 'var(--text-muted)'}
          style={{ marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  // Mapear ícones e descrições do tipo de favorito
  const getTipoMeta = (tipo) => {
    switch (tipo) {
      case 'restaurante':
        return { icon: Utensils, label: 'Restaurante', color: '#10B981' };
      case 'hotel':
        return { icon: Hotel, label: 'Hospedagem', color: '#3B82F6' };
      case 'ponto_turistico':
        return { icon: Compass, label: 'Ponto Turístico', color: '#F97316' };
      case 'local_interessante':
      default:
        return { icon: Info, label: 'Local de Interesse', color: '#8B5CF6' };
    }
  };

  const meta = getTipoMeta(favorito.tipo);
  const Icon = meta.icon;

  return (
    <div className="glass fade-in" style={styles.card}>
      {/* Header do Card: Tipo & Estrelas */}
      <div style={styles.header}>
        <div style={{ ...styles.typePill, backgroundColor: `${meta.color}15`, color: meta.color }}>
          <Icon size={14} style={{ marginRight: '4px' }} />
          <span>{meta.label}</span>
        </div>
        
        {/* Estrelas */}
        {favorito.avaliacao && (
          <div style={styles.starsContainer}>
            {renderStars(favorito.avaliacao)}
          </div>
        )}
      </div>

      {/* Título / Nome */}
      <h4 style={styles.name}>{favorito.nome}</h4>

      {/* Endereço */}
      {favorito.endereco && (
        <div style={styles.addressRow}>
          <MapPin size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          <span style={styles.address}>{favorito.endereco}</span>
        </div>
      )}

      {/* Observações */}
      {favorito.observacoes && (
        <p style={styles.notes}>{favorito.observacoes}</p>
      )}

      {/* Rodapé / Ações */}
      <div style={styles.footer}>
        <button onClick={() => onDelete(favorito.id)} style={styles.deleteBtn} title="Remover dos favoritos">
          <Trash2 size={16} style={{ marginRight: '4px' }} />
          <span>Remover</span>
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    padding: '1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    height: '100%',
    transition: 'var(--transition)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  typePill: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.2rem 0.6rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.72rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  starsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontSize: '1rem',
    fontWeight: '650',
    color: 'var(--text-primary)',
    lineHeight: '1.3',
  },
  addressRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.35rem',
  },
  address: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  notes: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
    backgroundColor: 'rgba(255,255,255,0.01)',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '2px solid var(--border-color)',
    fontStyle: 'italic',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    paddingTop: '0.75rem',
    borderTop: '1px solid var(--border-color)',
  },
  deleteBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    transition: 'var(--transition)',
    ':hover': {
      color: 'var(--danger)',
    },
  },
};
