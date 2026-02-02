import express from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const analyzeLeadWithAI = async (leadData: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Analise este Lead B2B: ${JSON.stringify(leadData)}. 
    Retorne APENAS um objeto JSON com as chaves: 
    "sentiment_analysis" (string), 
    "suggested_approach" (string), 
    "priority_score" (número de 0 a 100).`;

    const result = await model.generateContent(prompt);
    
    const text = result.response.text().replace(/```json|```/g, "").trim();
    
    console.log("IA respondeu com sucesso!");
    return JSON.parse(text);
  } catch (error: any) {
    console.error("ERRO NA IA (Versão 2.0):", error.message);
    return null;
  }
};

// 1. Health Check
app.get('/health', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'Online', database: 'Connected' });
  } catch (error: any) {
    res.status(500).json({ status: 'Offline', error: error.message });
  }
});

// 2. Leads (Listagem Completa)
app.get('/leads-complete', async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({ include: { company: true } });
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Companies (Criação e Listagem)
app.get('/companies', async (_req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany();
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/companies', async (req: Request, res: Response) => {
  try {
    const company = await prisma.company.create({ data: req.body });
    res.status(201).json(company);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Leads (Criação)
app.post('/leads', async (req: Request, res: Response) => {
  try {
    const lead = await prisma.lead.create({ data: req.body });
    res.status(201).json(lead);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Filtro por Indústria
app.get('/companies/by-industry/:industry', async (req: Request, res: Response) => {
  try {
    const industry = req.params.industry as string; // Forçamos como string
    const companies = await prisma.company.findMany({
      where: { 
        industry: { 
          contains: industry, 
          mode: 'insensitive' 
        } 
      },
      include: { leads: true }
    });
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Estatísticas
app.get('/stats/summary', async (_req: Request, res: Response) => {
  try {
    const [leads, companies] = await Promise.all([prisma.lead.count(), prisma.company.count()]);
    res.json({ totals: { leads, companies } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 7. A ROTA DE ANÁLISE COM IA
app.post('/leads/:id/analyze', async (req: any, res: any) => {
  try {
    const leadId = Number(req.params.id);
    if (isNaN(leadId)) return res.status(400).json({ error: "ID do lead inválido" });

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { company: true }
    });

    if (!lead) return res.status(404).json({ error: "Lead não encontrado" });

    const analysis = await analyzeLeadWithAI(lead);
    if (!analysis) return res.status(500).json({ error: "Falha na análise da IA" });

    const saved = await prisma.aiAnalysis.create({
      data: {
        lead_id: lead.id,
        sentiment_analysis: analysis.sentiment_analysis,
        suggested_approach: analysis.suggested_approach,
        priority_score: analysis.priority_score
      }
    });

    res.json(saved);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Listar todos os leads simples
app.get('/leads', async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany();
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Leads com Score Alto (Prioridade)
app.get('/leads/priority', async (_req: Request, res: Response) => {
  try {
    const highValueLeads = await prisma.lead.findMany({
      where: {
        lead_score: { gte: 80 }
      },
      include: { company: true },
      orderBy: { lead_score: 'desc' }
    });
    res.json(highValueLeads);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor voando na porta http://localhost:3000/`);
});