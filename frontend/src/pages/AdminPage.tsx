import { useState, useEffect } from 'react';
import api from '../services/api';
import { Building2, UserPlus, Save, CheckCircle, Globe, Users } from 'lucide-react';

export function AdminPage() {
  // --- ESTADOS PARA EMPRESA ---
  const [compName, setCompName] = useState('');
  const [industry, setIndustry] = useState('');
  const [revenue, setRevenue] = useState('');
  const [website, setWebsite] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');

  // --- ESTADOS PARA LEAD ---
  const [leadName, setLeadName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [score, setScore] = useState(50);
  const [companyId, setCompanyId] = useState('');

  // --- LISTA DE EMPRESAS ---
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await api.get('/companies');
      setCompanies(res.data);
    } catch (error) {
      console.error("Erro ao carregar empresas:", error);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { 
        name: compName, 
        industry, 
        revenue_estimate: revenue,
        website: website || null,
        employee_count: employeeCount ? Number(employeeCount) : null 
      };
      
      await api.post('/companies', payload);
      alert("Empresa cadastrada com sucesso!");
      
      setCompName(''); setIndustry(''); setRevenue(''); setWebsite(''); setEmployeeCount('');
      loadCompanies();
    } catch (error) {
      console.error("Erro no cadastro de empresa:", error);
      alert("Erro ao criar empresa. Verifique se o servidor está online.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyId) {
      alert("Por favor, selecione uma empresa para vincular o lead.");
      return;
    }

    setLoading(true);
    try {
      const payload = { 
        contact_email: email, 
        contact_name: leadName,
        contact_role: role, 
        lead_score: Number(score),
        company_id: (companyId)
      };

      console.log("Payload enviado para /leads:", payload);
      
      await api.post('/leads', payload);
      alert("Lead cadastrado e vinculado com sucesso!");
      
      setLeadName(''); setEmail(''); setRole(''); setCompanyId(''); setScore(50);
    } catch (error: any) {
      console.error("Erro no cadastro de lead:", error.response?.data || error.message);
      alert(`Erro ao criar lead: ${error.response?.data?.error || "Verifique o console"}`);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle: React.CSSProperties = { 
    flex: 1, 
    minWidth: '380px', 
    backgroundColor: 'white', 
    padding: '2rem', 
    borderRadius: '12px', 
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
    border: '1px solid #e2e8f0'
  };

  const inputStyle: React.CSSProperties = { 
    width: '100%', 
    padding: '12px', 
    marginBottom: '15px', 
    borderRadius: '8px', 
    border: '1px solid #cbd5e1',
    boxSizing: 'border-box'
  };

  const labelStyle: React.CSSProperties = { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '6px',
    marginBottom: '8px', 
    fontWeight: 600, 
    fontSize: '0.85rem', 
    color: '#475569' 
  };

  const btnStyle = (color: string): React.CSSProperties => ({
    width: '100%', 
    padding: '14px', 
    backgroundColor: color, 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: loading ? 'not-allowed' : 'pointer', 
    fontWeight: 'bold', 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '10px',
    marginTop: '10px',
    opacity: loading ? 0.7 : 1
  });

  return (
    <div style={{ flex: 1, display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      
      {/* CRUD EMPRESA */}
      <div style={cardStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1e293b', marginTop: 0, marginBottom: '2rem' }}>
          <Building2 size={28} color="#6366f1" /> Gerenciar Empresas
        </h2>
        
        <form onSubmit={handleCreateCompany}>
          <label style={labelStyle}>Nome da Organização *</label>
          <input style={inputStyle} value={compName} onChange={e => setCompName(e.target.value)} placeholder="Ex: Wayne Enterprises" required />
          
          <label style={labelStyle}><Globe size={14}/> Website</label>
          <input style={inputStyle} value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://www.exemplo.com" />

          <label style={labelStyle}>Indústria *</label>
          <input style={inputStyle} value={industry} onChange={e => setIndustry(e.target.value)} placeholder="Ex: Defesa & Tecnologia" required />
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Receita Anual</label>
              <input style={inputStyle} value={revenue} onChange={e => setRevenue(e.target.value)} placeholder="$500M" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Users size={14}/> Funcionários</label>
              <input style={inputStyle} type="number" value={employeeCount} onChange={e => setEmployeeCount(e.target.value)} placeholder="1500" />
            </div>
          </div>
          
          <button type="submit" disabled={loading} style={btnStyle('#6366f1')}>
            <Save size={20} /> {loading ? 'Processando...' : 'Salvar Empresa'}
          </button>
        </form>
      </div>

      {/* CRUD LEAD */}
      <div style={cardStyle}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1e293b', marginTop: 0, marginBottom: '2rem' }}>
          <UserPlus size={28} color="#10b981" /> Adicionar Lead
        </h2>
        
        <form onSubmit={handleCreateLead}>
          <label style={labelStyle}>Nome Completo *</label>
          <input style={inputStyle} value={leadName} onChange={e => setLeadName(e.target.value)} placeholder="Ex: Bruce Wayne" required />
          
          <label style={labelStyle}>Email Corporativo *</label>
          <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="bruce@wayne.com" required />
          
          <label style={labelStyle}>Cargo / Título</label>
          <input style={inputStyle} value={role} onChange={e => setRole(e.target.value)} placeholder="Ex: Diretor Executivo" />
          
          <label style={labelStyle}>Vincular a uma Empresa *</label>
          <select 
            style={inputStyle} 
            value={companyId} 
            onChange={e => setCompanyId(e.target.value)} 
            required
          >
            <option value="">Selecione na lista...</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Score de Qualificação: <span style={{ color: '#10b981', marginLeft: '5px' }}>{score}</span></label>
            <input 
              type="range" 
              style={{ width: '100%', accentColor: '#10b981' }} 
              value={score} 
              onChange={e => setScore(Number(e.target.value))} 
            />
          </div>
          
          <button type="submit" disabled={loading} style={btnStyle('#10b981')}>
            <CheckCircle size={20} /> {loading ? 'Processando...' : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}