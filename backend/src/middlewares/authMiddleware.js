const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  // O token geralmente vem no formato "Bearer TOKEN_STRING"
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Erro de token. Formato inválido.' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_segredo_rosa_dos_ventos_2026_academico');
    
    // Anexa as informações do usuário autenticado no request
    req.userId = decoded.id;
    req.userNome = decoded.nome;
    req.userEmail = decoded.email;
    
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado. Faça login novamente.' });
  }
};
