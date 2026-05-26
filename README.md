# 🧭 Rosa dos Ventos - Planejador de Viagens

A **Rosa dos Ventos** é uma plataforma completa e imersiva para o planejamento e gestão de viagens. Desenvolvida como um projeto integrador, a aplicação permite que usuários organizem roteiros detalhados, controlem gastos financeiros por categoria e gerenciem seus locais favoritos, tudo em uma interface moderna e intuitiva.

---

## 🚀 Funcionalidades Principais

-   **Gestão de Viagens**: Criação, edição e acompanhamento de viagens com status (planejada, em andamento, concluída).
-   **Roteiro Inteligente**: Planejamento cronológico de atividades para cada dia da viagem.
-   **Controle Financeiro**: Gestão de despesas com categorias (alimentação, transporte, etc.) e acompanhamento de orçamento.
-   **Favoritos & Avaliações**: Salve hotéis, restaurantes e pontos turísticos com notas e observações.
-   **Dashboard Imersivo**: Visualização geral de estatísticas e próximas aventuras.
-   **Autenticação Segura**: Sistema de login e cadastro com proteção de rotas e senhas criptografadas.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
-   **React 19**: Biblioteca principal para construção da interface.
-   **Vite**: Ferramenta de build ultra-rápida.
-   **React Router Dom**: Gestão de rotas e navegação.
-   **Lucide React**: Biblioteca de ícones modernos.
-   **Axios**: Cliente HTTP para consumo da API.
-   **CSS3**: Estilização personalizada com variáveis e design responsivo.

### Backend
-   **Node.js**: Ambiente de execução Javascript no servidor.
-   **Express**: Framework web para criação da API REST.
-   **MySQL**: Banco de dados relacional para persistência de dados.
-   **JWT (JSON Web Token)**: Autenticação baseada em tokens.
-   **BcryptJS**: Criptografia de senhas para segurança.
-   **Dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📂 Estrutura do Projeto

```text
teste2/
├── backend/            # Servidor Express e lógica de negócio
│   ├── src/
│   │   ├── config/     # Configuração de banco de dados
│   │   ├── controllers/# Lógica das rotas
│   │   ├── middlewares/# Autenticação e erros
│   │   ├── routes/     # Definição dos endpoints
│   │   └── app.js      # Arquivo principal
│   └── .env            # Variáveis de ambiente (DB, JWT)
├── frontend/           # Aplicação React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── pages/      # Páginas da aplicação
│   │   ├── context/    # Gestão de estado global (Auth)
│   │   └── services/   # Configuração do Axios
│   └── index.html      # Entrada do frontend
└── schema.sql          # Script de criação do banco de dados
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
-   **Node.js** instalado (v18+ recomendado).
-   **MySQL** rodando localmente.

### 1. Configuração do Banco de Dados
Execute o script `schema.sql` no seu terminal MySQL ou ferramenta de gestão (como MySQL Workbench):
```sql
SOURCE path/to/schema.sql;
```
Isso criará o banco `rosa_dos_ventos` e todas as tabelas necessárias (`usuarios`, `viagens`, `roteiro_atividades`, `gastos`, `favoritos`).

### 2. Configuração do Backend
Navegue até a pasta `backend`, instale as dependências e configure o ambiente:
```bash
cd backend
npm install
```
Crie um arquivo `.env` na raiz da pasta `backend` seguindo este modelo:
```env
PORT=5000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=rosa_dos_ventos
JWT_SECRET=sua_chave_secreta_aqui
```
Inicie o servidor:
```bash
npm run dev
```

### 3. Configuração do Frontend
Em um novo terminal, navegue até a pasta `frontend` e instale as dependências:
```bash
cd frontend
npm install
```
Inicie a aplicação:
```bash
npm run dev
```
O projeto estará disponível em `http://localhost:5173`.

---

## 📊 Modelo de Dados
O sistema utiliza um modelo relacional robusto com integridade referencial (`ON DELETE CASCADE`):
-   **Usuários** possuem muitas **Viagens**.
-   **Viagens** possuem muitos **Gastos**, **Atividades** e **Favoritos**.
-   Valores financeiros utilizam o tipo `DECIMAL(10,2)` para precisão absoluta.

---

## 👨‍💻 Autor
Projeto desenvolvido para fins acadêmicos e práticos de Desenvolvimento de Sistemas com Banco de Dados.
