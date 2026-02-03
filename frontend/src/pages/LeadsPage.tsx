import { useEffect, useState } from 'react';
import api from '../services/api'; // Ajustado o caminho
import { Brain, Building2, Loader2, Users, Briefcase, DollarSign, RotateCcw, FileChartColumn } from 'lucide-react';

interface LeadsPageProps {
  onAnalyze: (analysis: any) => void;
}

export function LeadsPage({ onAnalyze }: LeadsPageProps) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.get('/leads-complete');
      setLeads(response.data);
    } catch (error) { console.error(error); }
  };

  const handleAnalyze = async (id: number, forceNew = false, existingAnalysis = null) => {
    if (existingAnalysis && !forceNew) {
      onAnalyze(existingAnalysis);
      return;
    }

    setLoadingId(id);
    try {
      const response = await api.post(`/leads/${id}/analyze`);
      onAnalyze(response.data);
      fetchLeads();
    } catch (error) {
      alert("Erro na IA.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ flex: '1', minWidth: '450px' }}>
      <h2 style={{ color: '#334155', marginBottom: '1.5rem' }}>Pipeline de Leads</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {leads.map((lead) => {
          const hasAnalysis = lead.ai_analyses && lead.ai_analyses.length > 0;
          const analysisData = hasAnalysis ? lead.ai_analyses[0] : null;

          return (
            <div key={lead.id} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>{lead.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem' }}>
                    <Users size={14} /> {lead.contact_name} • <Briefcase size={14} /> {lead.contact_role}
                  </div>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: '#f1f5f9', color: '#475569' }}>
                  {lead.status}
                </span>
              </div>

              <div style={{ padding: '0.8rem', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155', fontWeight: 600 }}>
                  <Building2 size={16} color="#6366f1" /> {lead.company?.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
                  <DollarSign size={14} /> Receita Est.: {lead.company?.revenue_estimate || 'N/A'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleAnalyze(lead.id, false, analysisData)}
                  style={{ flex: 2, padding: '10px', backgroundColor: hasAnalysis ? '#10b981' : '#6366f1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}
                >
                {loadingId === lead.id ? (
                <Loader2 className="animate-spin" size={18} />
                ) : hasAnalysis ? (
                <FileChartColumn size={18} />
                ) : (
                <Brain size={18} />
                )}

                {hasAnalysis ? "Ver Análise Salva" : "Analisar com IA"}
                </button>
                
                {hasAnalysis && (
                  <button 
                    onClick={() => handleAnalyze(lead.id, true)}
                    style={{ flex: 1, padding: '10px', backgroundColor: 'white', color: '#6366f1', border: '1px solid #6366f1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    <RotateCcw size={16} /> Refazer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}