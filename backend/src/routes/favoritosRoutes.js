const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar middleware de autenticação
router.use(authMiddleware);

// Endpoints diretos de favoritos
router.put('/:id', favoritosController.updateFavorito);
router.delete('/:id', favoritosController.deleteFavorito);

module.exports = router;
