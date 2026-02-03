import { useEffect, useState } from 'react';
import api from '../services/api';
import { Star, Phone } from 'lucide-react';

export function PriorityPage() {
  const [priorities, setPriorities] = useState<any[]>([]);

  useEffect(() => {
    api.get('/leads/priority').then(res => setPriorities(res.data));
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ color: '#b91c1c', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Star fill="#b91c1c" /> Leads de Alta Prioridade
      </h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {priorities.map(lead => (
          <div key={lead.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff1f2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecdd3' }}>
            <div>
              <h3 style={{ margin: 0, color: '#9f1239' }}>{lead.name}</h3>
              <p style={{ margin: '5px 0', color: '#be123c' }}>{lead.company?.name} • Score: <strong>{lead.lead_score}</strong></p>
            </div>
            <button style={{ backgroundColor: '#be123c', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={18} /> Contatar Agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}