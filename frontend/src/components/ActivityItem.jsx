import React from 'react';
import { Calendar, Clock, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function ActivityItem({ atividade, onToggleComplete, onDelete }) {
  // Formatar hora para formato legível HH:MM
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return timeStr.substring(0, 5); // Retorna "HH:MM" de "HH:MM:SS"
  };

  // Formatar data
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  return (
    <div
      className="glass"
      style={{
        ...styles.item,
        borderLeft: atividade.concluida ? '4px solid var(--success)' : '4px solid var(--text-muted)',
        opacity: atividade.concluida ? 0.75 : 1,
      }}
    >
      {/* Checkbox de Conclusão */}
      <button onClick={() => onToggleComplete(atividade)} style={styles.checkBtn}>
        {atividade.concluida ? (
          <CheckCircle2 size={22} color="var(--success)" style={styles.iconAnimation} />
        ) : (
          <Circle size={22} color="var(--text-muted)" />
        )}
      </button>

      {/* Detalhes do Roteiro */}
      <div style={styles.content}>
        <h4 style={{ ...styles.title, textDecoration: atividade.concluida ? 'line-through' : 'none' }}>
          {atividade.titulo}
        </h4>
        {atividade.descricao && (
          <p style={styles.desc}>{atividade.descricao}</p>
        )}

        {/* Metadados: Data e Hora */}
        <div style={styles.meta}>
          {atividade.data_atividade && (
            <div style={styles.metaItem}>
              <Calendar size={14} />
              <span>{formatDate(atividade.data_atividade)}</span>
            </div>
          )}
          {atividade.horario && (
            <div style={styles.metaItem}>
              <Clock size={14} />
              <span>{formatTime(atividade.horario)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Botão de Excluir */}
      <button onClick={() => onDelete(atividade.id)} style={styles.deleteBtn} title="Remover atividade">
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
    padding: '1rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-card)',
    transition: 'var(--transition)',
    marginBottom: '0.75rem',
  },
  checkBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    borderRadius: '50%',
    transition: 'var(--transition-fast)',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    flexGrow: 1,
  },
  title: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
    transition: 'var(--transition-fast)',
  },
  desc: {
    fontSize: '0.82rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.25rem',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
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
