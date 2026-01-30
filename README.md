# 🚀 RPA Commercial Optimizer - Stack PERN & IA

Este projeto consiste em uma ferramenta de **RPA (Robotic Process Automation)** voltada para a otimização do fluxo de vendas entre times de prospecção (BDR) e executivos de conta (Sales).

O objetivo é automatizar o enriquecimento de leads e a priorização de oportunidades utilizando Inteligência Artificial, reduzindo o trabalho manual e aumentando a taxa de conversão.

---

## 🛠️ Stack Tecnológica

* **Frontend:** React (TypeScript), Tailwind CSS.
* **Backend:** Node.js, Express (TypeScript).
* **Banco de Dados:** PostgreSQL.
* **Infraestrutura:** Docker, Docker Compose.
* **IA:** Integração com OpenAI API para análise preditiva.

---

## 📋 Requisitos do Projeto

### 1. Ingestão de Dados (Simulação de CRM)
> **Nota Importante:** Em um cenário real, os dados seriam consumidos via Webhooks ou APIs de CRMs. Para este projeto, as entradas são simuladas manualmente via API para demonstrar o processamento dos dados.

**Dados Recebidos (SQL Lead):**
- Nome da Empresa e Setor.
- BANT (Budget, Authority, Need, Timeline).
- Lead Scoring inicial.

### 2. Processamento RPA & IA
- **Enriquecimento:** O sistema simula a busca de dados complementares (firmografia).
- **Análise de IA:** O modelo de linguagem processa a "Necessidade" e a "Urgência" para gerar um resumo executivo e uma sugestão de abordagem para o vendedor.

### 3. Visualização (Dashboard)
- Painel para o time comercial visualizar leads priorizados.
- Indicadores de saúde do pipeline.

---

## 🏗️ Arquitetura e Modelagem de Dados

O banco de dados foi modelado para suportar o histórico de interações e o estado atual de cada lead no pipeline.



### Entidades Principais:
1.  **Leads:** Dados de contato e status.
2.  **Companies:** Informações firmográficas (tamanho, setor).
3.  **Analysis_Logs:** Resultado do processamento da IA e RPA.

---

## 🚀 Como Executar (Roadmap de Desenvolvimento)

1.  **Setup de Ambiente:** Configuração do Docker e instâncias do PostgreSQL.
2.  **API Core:** Desenvolvimento do CRUD de leads e integração com DB.
3.  **RPA Engine:** Implementação do serviço que processa os leads com IA.
4.  **Frontend:** Dashboard de visualização em React.

---

## 📈 Diferenciais Demonstrados
- **Organização:** Estrutura de pastas escalável.
- **Negócio:** Foco em vendas complexas e negociação.
- **Futuro:** Implementação de pipelines de CI/CD e testes unitários.

---

## 📁 Estrutura do Projeto
/rpa-commercial-optimizer
├── /backend            # Node.js + Express + TypeScript
│   ├── /src
│   │   ├── /config     # Configurações de DB e Variáveis de Ambiente
│   │   ├── /controllers# Lógica de entrada/saída das rotas
│   │   ├── /models     # Definições das tabelas (Sequelize ou Prisma)
│   │   ├── /services   # Lógica de negócio e RPA (Integração com IA)
│   │   ├── /routes     # Definição dos endpoints
│   │   └── server.ts
│   ├── dockerfile
│   └── tsconfig.json
├── /frontend           # React + TypeScript (Vite)
│   ├── /src
│   │   ├── /components # Componentes reutilizáveis
│   │   ├── /hooks      # Lógica de chamadas de API
│   │   ├── /pages      # Páginas principais (Dashboard, Leads)
│   │   └── App.tsx
│   ├── dockerfile
│   └── tailwind.config.js
├── /database           # Scripts SQL ou configurações de migração
├── docker-compose.yml  # Orquestração do App + DB
└── README.md           # Documentação do projeto

---

### 🗄️ Modelagem de Dados (PostgreSQL)

O projeto utiliza um schema dedicado `commercial_rpa` para organizar as seguintes entidades:

- **Companies:** Armazena dados firmográficos para análise de ICP (Ideal Customer Profile).
- **Leads:** Contém os dados de contato e os critérios BANT capturados pelo time de BDR.
- **AI_Analysis:** Registra os resultados do processamento via LLM, incluindo score de prioridade e sugestões de abordagem personalizada.