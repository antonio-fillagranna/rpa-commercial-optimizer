import { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, Building, Percent } from 'lucide-react';

export function StatsPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get('/stats/summary').then(res => setStats(res.data));
  }, []);

  if (!stats) return <div style={{ padding: '20px' }}>Carregando métricas...</div>;

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    flex: 1,
    minWidth: '250px',
    border: '1px solid #e2e8f0'
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#334155', marginBottom: '2rem' }}>Resumo Executivo</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* stats.totals.leads */}
        <div style={cardStyle}>
          <Users size={32} color="#6366f1" />
          <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#1e293b' }}>
            {stats.totals?.leads || 0}
          </h1>
          <span style={{ color: '#64748b', fontWeight: 'bold' }}>Total de Leads</span>
        </div>

        <div style={cardStyle}>
          <Building size={32} color="#10b981" />
          <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#1e293b' }}>
            {stats.totals?.companies || 0}
          </h1>
          <span style={{ color: '#64748b', fontWeight: 'bold' }}>Empresas Cadastradas</span>
        </div>

        <div style={cardStyle}>
          <Percent size={32} color="#f59e0b" />
          <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#1e293b' }}>            
            {stats.averageScore ? stats.averageScore.toFixed(0) : 'N/A'}
          </h1>
          <span style={{ color: '#64748b', fontWeight: 'bold' }}>Média de Score</span>
        </div>

      </div>
    </div>
  );
}