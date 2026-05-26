const express = require('express');
const cors = require('cors');
const path = require('path');

// Carregar o arquivo .env de forma robusta
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const viagensRoutes = require('./routes/viagensRoutes');
const roteiroRoutes = require('./routes/roteiroRoutes');
const gastosRoutes = require('./routes/gastosRoutes');
const favoritosRoutes = require('./routes/favoritosRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar Middlewares Globais
app.use(cors());
app.use(express.json());

// Log básico de requisições (útil para apresentação ao professor)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/viagens', viagensRoutes);
app.use('/api/roteiro', roteiroRoutes);
app.use('/api/gastos', gastosRoutes);
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Rota padrão simples (Healthcheck)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Bem-vindo ao Backend do sistema Rosa dos Ventos!',
    status: 'online',
    timestamp: new Date()
  });
});

// Handler para rotas 404 (Não encontradas)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado no servidor.' });
});

// Middleware Global de Tratamento de Erros
app.use(errorMiddleware);

// Iniciar Servidor Express
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}!`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}`);
});

module.exports = app;
