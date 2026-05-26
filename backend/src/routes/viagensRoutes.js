const express = require('express');
const router = express.Router();
const viagensController = require('../controllers/viagensController');
const roteiroController = require('../controllers/roteiroController');
const gastosController = require('../controllers/gastosController');
const favoritosController = require('../controllers/favoritosController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplicar o middleware de autenticação a todas as rotas de viagens
router.use(authMiddleware);

// Endpoints CRUD de viagens
router.get('/', viagensController.getViagens);
router.post('/', viagensController.createViagem);
router.get('/:id', viagensController.getViagemById);
router.put('/:id', viagensController.updateViagem);
router.delete('/:id', viagensController.deleteViagem);

// Endpoints de Roteiro vinculados à viagem
router.get('/:id/roteiro', roteiroController.getRoteiro);
router.post('/:id/roteiro', roteiroController.createAtividade);

// Endpoints de Gastos vinculados à viagem
router.get('/:id/gastos', gastosController.getGastos);
router.post('/:id/gastos', gastosController.createGasto);

// Endpoints de Favoritos vinculados à viagem
router.get('/:id/favoritos', favoritosController.getFavoritos);
router.post('/:id/favoritos', favoritosController.createFavorito);

module.exports = router;
