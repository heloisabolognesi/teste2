const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware de autenticação
router.use(authMiddleware);

// Endpoints diretos de gastos/despesas
router.put('/:id', gastosController.updateGasto);
router.delete('/:id', gastosController.deleteGasto);

module.exports = router;
