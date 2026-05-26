import React from 'react';

export default function StatCard({ title, value, icon: Icon, color = 'var(--primary)', subtitle }) {
  return (
    <div className="glass glass-hover fade-in" style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
      <div style={styles.cardHeader}>
        <div style={styles.textSection}>
          <span style={styles.title}>{title}</span>
          <h3 style={styles.value}>{value}</h3>
        </div>
        <div style={{ ...styles.iconContainer, backgroundColor: `${color}15`, color: color }}>
          <Icon size={24} style={{ filter: `drop-shadow(0 2px 8px ${color}30)` }} />
        </div>
      </div>
      {subtitle && <span style={styles.subtitle}>{subtitle}</span>}
    </div>
  );
}

const styles = {
  card: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'var(--transition)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  title: {
    fontSize: '0.85rem',
    fontWeight: '550',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  value: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    letterSpacing: '-0.02em',
  },
  iconContainer: {
    width: '46px',
    height: '46px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    marginTop: 'auto',
  },
};
