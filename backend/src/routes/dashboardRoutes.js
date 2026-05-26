const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar o middleware de autenticação à rota do dashboard
router.use(authMiddleware);

// Endpoint de estatísticas do dashboard
router.get('/', dashboardController.getDashboardStats);

module.exports = router;
