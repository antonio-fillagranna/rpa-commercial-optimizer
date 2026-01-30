import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    console.log('Checando prisma.lead:', !!prisma.lead);
    
    const count = await prisma.lead.count();
    res.json({ status: 'Online', leads_count: count });
  } catch (err: any) {
    res.status(500).json({ 
      status: 'Offline', 
      error: err.message,
      check: "Veja o console do VS Code" 
    });
  }
});

app.post('/leads', async (req, res) => {
  try {
    const lead = await prisma.lead.create({ data: req.body });
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('🚀 Server ON em http://localhost:3000'));