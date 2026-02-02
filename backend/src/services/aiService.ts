import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const analyzeLeadWithAI = async (leadData: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Você é um consultor de vendas especializado em B2B. 
      Analise o seguinte Lead e sua Empresa:
      
      Lead: ${leadData.contact_name} (${leadData.contact_role})
      Empresa: ${leadData.company?.name || "Não informada"}
      Indústria: ${leadData.company?.industry || "Não informada"}
      Score Atual: ${leadData.lead_score}
      Status: ${leadData.status}

      Com base nisso, retorne um objeto JSON com:
      1. sentiment_analysis: Um resumo do potencial (curto).
      2. suggested_approach: Uma frase de abordagem personalizada.
      3. priority_score: Um novo score de 0 a 100 baseado no fit cultural/setorial.
      
      Responda APENAS o JSON, sem textos explicativos.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Erro na análise da IA:", error);
    return null;
  }
};