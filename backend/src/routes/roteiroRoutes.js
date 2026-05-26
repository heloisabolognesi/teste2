const express = require('express');
const router = express.Router();
const roteiroController = require('../controllers/roteiroController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware de autenticação
router.use(authMiddleware);

// Endpoints diretos de roteiro/atividades
router.put('/:id', roteiroController.updateAtividade);
router.delete('/:id', roteiroController.deleteAtividade);

module.exports = router;
