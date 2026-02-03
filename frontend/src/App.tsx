import { useState } from 'react';
import { LeadsPage } from './pages/LeadsPage';
import { CompaniesPage } from './pages/CompaniesPage';
import { StatsPage } from './pages/StatsPage';
import { PriorityPage } from './pages/PriorityPage';
import { AdminPage } from './pages/AdminPage';
import { ChartNoAxesCombined, Menu, X, Star, BarChart3, LayoutDashboard, Building, UserPlus } from 'lucide-react';

// Tipos de visualização possíveis
type View = 'leads' | 'companies' | 'stats' | 'priority' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<View>('leads');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any | null>(null);

  // Função de navegação atualizada para aceitar todas as rotas
  const navigateTo = (view: View) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    setLastAnalysis(null); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      {/* NAVBAR SUPERIOR */}
      <nav style={{ height: '60px', backgroundColor: '#1e293b', color: 'white', display: 'flex', alignItems: 'center', padding: '0 1.5rem', position: 'sticky', top: 0, zIndex: 100 }}>
        <button onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          <Menu size={28} />
        </button>
        <div style={{ marginLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ChartNoAxesCombined size={24} color="#818cf8" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Central Inteligente de Leads com IA</span>
        </div>
      </nav>

      {/* SIDEBAR - Oculto por padrão, abre no clique do hambúrguer */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200 }}>
          <div style={{ width: '280px', height: '100%', backgroundColor: 'white', padding: '1.5rem', position: 'relative', boxShadow: '4px 0 10px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setIsMenuOpen(false)} style={{ position: 'absolute', right: '1rem', top: '1rem', border: 'none', background: 'none', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            
            <h2 style={{ color: '#1e293b', marginBottom: '2rem', fontSize: '1.5rem' }}>Menu</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => navigateTo('leads')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: currentView === 'leads' ? '#f1f5f9' : 'transparent', color: currentView === 'leads' ? '#6366f1' : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
              >
                <LayoutDashboard size={20} /> Leads
              </button>

              <button 
                onClick={() => navigateTo('companies')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: currentView === 'companies' ? '#f1f5f9' : 'transparent', color: currentView === 'companies' ? '#6366f1' : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
              >
                <Building size={20} /> Empresas
              </button>

              <button 
                onClick={() => navigateTo('priority')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: currentView === 'priority' ? '#f1f5f9' : 'transparent', color: currentView === 'priority' ? '#6366f1' : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
              >
                <Star size={20} /> Prioridades
              </button>

              <button 
                onClick={() => navigateTo('stats')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: currentView === 'stats' ? '#f1f5f9' : 'transparent', color: currentView === 'stats' ? '#6366f1' : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
              >
                <BarChart3 size={20} /> Estatísticas
              </button>

              <button 
                onClick={() => navigateTo('admin')}
                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: currentView === 'stats' ? '#f1f5f9' : 'transparent', color: currentView === 'stats' ? '#6366f1' : '#64748b', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold' }}
              >
                <UserPlus size={20} /> Administração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MENU PRINCIPAL */}
      <main style={{ display: 'flex', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>
        
        <div style={{ flex: '1', minWidth: '450px' }}>
          {currentView === 'leads' && <LeadsPage onAnalyze={setLastAnalysis} />}
          {currentView === 'companies' && <CompaniesPage />}
          {currentView === 'priority' && <PriorityPage />}
          {currentView === 'stats' && <StatsPage />}
          {currentView === 'admin' && <AdminPage />}
        </div>

        {/* PAINEL DE IA - rota Leads/Prioridade */}
        {(currentView === 'leads') && (
          <div style={{ flex: '0.8', minWidth: '350px' }}>
            <h2 style={{ color: '#334155', marginBottom: '1.5rem' }}>Estratégia Gerada</h2>
            {lastAnalysis ? (
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', borderTop: '8px solid #6366f1', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <h4 style={{ color: '#6366f1', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Abordagem Recomendada</h4>
                <p style={{ fontSize: '1.2rem', color: '#1e293b', lineHeight: '1.6', margin: '1rem 0 1.5rem 0' }}>"{lastAnalysis.suggested_approach}"</p>
                
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                  <h4 style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px' }}>SENTIMENTO</h4>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>{lastAnalysis.sentiment_analysis}</p>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>PRIORIDADE</h4>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1', margin: 0 }}>{lastAnalysis.priority_score}/100</p>
                </div>
              </div>
            ) : (
              <div style={{ height: '200px', border: '2px dashed #cbd5e1', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', textAlign: 'center', padding: '20px' }}>
                Selecione "Ver Análise" em um lead para visualizar os insights aqui.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;