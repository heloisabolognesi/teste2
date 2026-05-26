const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas públicas de autenticação
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
