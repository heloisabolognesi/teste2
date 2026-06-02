const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const authRoutes = require('../backend/src/routes/authRoutes');
const viagensRoutes = require('../backend/src/routes/viagensRoutes');
const roteiroRoutes = require('../backend/src/routes/roteiroRoutes');
const gastosRoutes = require('../backend/src/routes/gastosRoutes');
const favoritosRoutes = require('../backend/src/routes/favoritosRoutes');
const dashboardRoutes = require('../backend/src/routes/dashboardRoutes');
const errorMiddleware = require('../backend/src/middlewares/errorMiddleware');

const app = express();

// Configurar Middlewares Globais
app.use(cors());
app.use(express.json());

// Log básico de requisições
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

// Handler para rotas 404
app.use((req, res, next) => {
  res.status(404).json({ error: 'Endpoint não encontrado no servidor.' });
});

// Middleware Global de Tratamento de Erros
app.use(errorMiddleware);

module.exports = app;
