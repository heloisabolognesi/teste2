const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { nome, email, senha, foto_perfil } = req.body;

    // Validações básicas
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Os campos nome, email e senha são obrigatórios.' });
    }

    // Verificar se o e-mail já está em uso
    const [existingUsers] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }

    // Criptografar a senha do usuário
    const salt = await bcrypt.genSalt(10);
    const hashedSenha = await bcrypt.hash(senha, salt);

    // Salvar no banco
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, email, senha, foto_perfil) VALUES (?, ?, ?, ?)',
      [nome, email, hashedSenha, foto_perfil || null]
    );

    const newUserId = result.insertId;

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      user: {
        id: newUserId,
        nome,
        email,
        foto_perfil: foto_perfil || null
      }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    // Buscar usuário pelo e-mail
    const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas (usuário não encontrado).' });
    }

    const user = users[0];

    // Verificar a senha cryptografada
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas (senha incorreta).' });
    }

    // Emitir Token JWT
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET || 'super_segredo_rosa_dos_ventos_2026_academico',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        foto_perfil: user.foto_perfil
      }
    });
  } catch (error) {
    next(error);
  }
};
