import { useEffect, useState } from 'react';
import api from '../services/api';
import { Building2, Factory, TrendingUp, Users } from 'lucide-react';

export function CompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get('/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#334155', marginBottom: '1.5rem' }}>Gestão de Empresas</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {companies.map((company) => (
          <div key={company.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ padding: '8px', backgroundColor: '#eef2ff', borderRadius: '8px' }}>
                <Building2 color="#6366f1" size={24} />
              </div>
              <h3 style={{ margin: 0, color: '#1e293b' }}>{company.name}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Factory size={16} /> <strong>Indústria:</strong> {company.industry}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} /> <strong>Receita:</strong> {company.revenue_estimate}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: '#6366f1', fontWeight: 'bold' }}>
                <Users size={16} /> {company.leads?.length || 0} Lead(s) vinculado(s)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}