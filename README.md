# 🧭 Rosa dos Ventos - Planejador de Viagens Inteligente

![Versão](https://img.shields.io/badge/versão-2.0.0-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql)

A **Rosa dos Ventos** é uma plataforma Full Stack projetada para transformar a maneira como as pessoas planejam e gerenciam suas viagens. O sistema oferece desde uma landing page imersiva até um dashboard analítico para controle financeiro e de roteiros.

---

## 🚀 Funcionalidades Principais

### 🏠 Landing Page Premium
*   **Design Imersivo**: Fundo panorâmico com vídeo de destaque e tipografia moderna.
*   **Seção Sobre**: Redesenhada com carrossel dinâmico de imagens e seções de Missão e Experiência integradas.
*   **Destinos em Destaque**: Grid responsivo exibindo as melhores opções de viagem.

### 📊 Dashboard Analítico (Painel de Controle)
*   **Distribuição de Gastos Reais**: Gráfico dinâmico que calcula automaticamente as porcentagens por categoria (Hospedagem, Transporte, etc.) com base nos dados do banco.
*   **Progresso de Roteiros**: Gráfico circular que reflete a relação entre atividades concluídas e totais.
*   **Gastos Consolidados**: Visualização detalhada de gastos individuais (ex: jantares, passagens) de **todas** as viagens do usuário em uma única lista.
*   **Cards de Métricas**: Resumo de total de viagens, destinos, investimento total e atividades.

### ✈️ Gestão de Viagens (CRUD Completo)
*   **Planejamento**: Cadastro de novas viagens com orçamento, datas e imagem de capa.
*   **Edição e Exclusão**: Funcionalidades integradas tanto na página de viagens quanto no Dashboard.
*   **Roteiro e Gastos**: Gerenciamento individual de cada etapa da aventura.

---

## 🛠️ Stack Tecnológica

### Frontend
*   **React 19** (Vite)
*   **Tailwind CSS** & CSS Customizado
*   **Lucide React** (Ícones modernos)
*   **Axios** (Comunicação com API)
*   **React Router Dom** (Navegação SPA)

### Backend
*   **Node.js** & **Express**
*   **MySQL** (Banco de dados relacional)
*   **JWT (JSON Web Token)** (Autenticação segura)
*   **BcryptJS** (Criptografia de senhas)

---

## 📂 Estrutura do Projeto

```text
/
├── frontend/               # Interface do usuário (React)
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis (TripCard, Modal, StatCard)
│   │   ├── pages/          # Telas (Dashboard, Viagens, About, Home)
│   │   ├── services/       # Configuração do Axios (api.js)
│   │   └── App.jsx         # Rotas e estrutura principal
├── backend/                # Servidor API (Node/Express)
│   ├── src/
│   │   ├── config/         # Conexão com MySQL (db.js)
│   │   ├── controllers/    # Lógica de negócio (dashboard, viagens, auth)
│   │   ├── routes/         # Definição de Endpoints REST
│   │   └── app.js          # Ponto de entrada do servidor
└── schema.sql              # Script de criação e população do banco de dados
```

---

## 🗄️ Arquitetura do Banco de Dados (MySQL)

O sistema utiliza um modelo relacional robusto com integridade referencial.

### Relacionamentos:
*   **Usuários ↔ Viagens**: Relacionamento 1:N (Um usuário possui várias viagens).
*   **Viagens ↔ Gastos/Roteiros**: Relacionamento 1:N (Uma viagem possui múltiplos registros financeiros e de atividades).
*   **Integridade**: Uso de `ON DELETE CASCADE` para garantir que a exclusão de uma viagem limpe todos os dados relacionados.

### Tipos de Dados:
*   **`DECIMAL(10,2)`**: Para precisão em valores monetários.
*   **`ENUM`**: Para categorias fixas e status de viagem.
*   **`TIMESTAMP`**: Para auditoria e ordenação cronológica no Dashboard.

---

## 🔧 Como Rodar o Projeto Localmente

### 1. Banco de Dados
Execute o arquivo `schema.sql` no seu MySQL. Ele já contém **dados de exemplo** para você ver o Dashboard funcionando imediatamente.

### 2. Backend
```bash
cd backend
npm install
# Configure o arquivo .env com DB_USER, DB_PASS e JWT_SECRET
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Acesse: `http://localhost:5173`

---

## 👨‍💻 Autor
**Heloisa Bolognesi** - Projeto Integrador: Desenvolvimento de Sistemas com Banco de Dados.
