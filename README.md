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

## 📂 Estrutura Detalhada do Projeto

A arquitetura do projeto segue o padrão **Client-Server**, separando claramente as responsabilidades de interface e lógica de dados.

### 🖥️ Frontend (`/frontend`)
O frontend foi desenvolvido com **React** e **Vite**, focado em componentes modulares e alta performance.

*   **`src/components/`**: Contém os blocos de construção da interface.
    *   `TripCard.jsx`: Gerencia a exibição individual de cada viagem e os gatilhos de edição/exclusão.
    *   `StatCard.jsx`: Componente visual para exibição de métricas numéricas no Dashboard.
    *   `Modal.jsx`: Estrutura base para todos os formulários pop-up do sistema.
*   **`src/pages/`**: Define as visualizações completas da aplicação.
    *   `DashboardPage.jsx`: A tela mais complexa, onde os dados do banco são transformados em gráficos e listas consolidadas.
    *   `ViagensPage.jsx`: Centraliza a gestão de viagens do usuário.
    *   `HomePage.jsx` & `AboutPage.jsx`: Páginas institucionais com foco em design e experiência do usuário.
*   **`src/services/api.js`**: Centraliza a configuração do **Axios**, definindo a URL base do backend e interceptadores para autenticação JWT.
*   **`src/context/AuthContext.jsx`**: Gerencia o estado global de login do usuário, permitindo que as credenciais persistam entre as páginas.

### ⚙️ Backend (`/backend`)
O backend utiliza **Node.js** com **Express**, servindo como uma API REST que interage diretamente com o MySQL.

*   **`src/config/db.js`**: Gerencia o **Pool de Conexões** com o MySQL. Utilizar um pool é uma boa prática para evitar sobrecarga no banco de dados.
*   **`src/controllers/`**: Onde reside a lógica de negócio.
    *   `dashboardController.js`: Executa queries SQL complexas (com `SUM`, `COUNT` e `GROUP BY`) para alimentar os gráficos do frontend.
    *   `viagensController.js`: Gerencia o ciclo de vida das viagens (CRUD).
*   **`src/routes/`**: Mapeia os caminhos da URL para seus respectivos controladores.
*   **`src/middlewares/auth.js`**: Protege as rotas do sistema, garantindo que apenas usuários logados possam acessar seus próprios dados.

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

## 👨‍💻 Autora
**Heloisa Bolognesi** - Projeto Integrador: Desenvolvimento de Sistemas com Banco de Dados.


