const db = require('../config/db');

// GET /api/viagens/:id/favoritos (Listar favoritos de uma viagem específica)
exports.getFavoritos = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem

    // Verificar se a viagem pertence ao usuário logado
    const [viagem] = await db.query(
      'SELECT id FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para ver os favoritos desta viagem.' });
    }

    const [rows] = await db.query(
      'SELECT * FROM favoritos WHERE id_viagem = ? ORDER BY avaliacao DESC, nome ASC',
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// POST /api/viagens/:id/favoritos (Criar favorito vinculado à viagem)
exports.createFavorito = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem
    const { nome, tipo, endereco, observacoes, avaliacao } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'O nome do favorito é obrigatório.' });
    }

    if (avaliacao !== undefined && (avaliacao < 1 || avaliacao > 5)) {
      return res.status(400).json({ error: 'A avaliação deve ser um número inteiro de 1 a 5.' });
    }

    // Verificar se a viagem pertence ao usuário logado
    const [viagem] = await db.query(
      'SELECT id FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para gerenciar os favoritos desta viagem.' });
    }

    const [result] = await db.query(
      `INSERT INTO favoritos (nome, tipo, endereco, observacoes, avaliacao, id_viagem)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nome,
        tipo || null,
        endereco || null,
        observacoes || null,
        avaliacao !== undefined ? avaliacao : null,
        id
      ]
    );

    res.status(201).json({
      message: 'Lugar favoritado com sucesso!',
      favorito: {
        id: result.insertId,
        nome,
        tipo,
        endereco,
        observacoes,
        avaliacao,
        id_viagem: Number(id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/favoritos/:id (Atualizar favorito)
exports.updateFavorito = async (req, res, next) => {
  try {
    const { id } = req.params; // ID do favorito
    const { nome, tipo, endereco, observacoes, avaliacao } = req.body;

    // Verificar se o favorito pertence a uma viagem do usuário logado
    const [favorito] = await db.query(
      `SELECT f.id FROM favoritos f
       JOIN viagens v ON f.id_viagem = v.id
       WHERE f.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (favorito.length === 0) {
      return res.status(403).json({ error: 'Favorito não encontrado ou você não tem permissão para alterá-lo.' });
    }

    if (!nome) {
      return res.status(400).json({ error: 'O nome do favorito é obrigatório.' });
    }

    if (avaliacao !== undefined && (avaliacao < 1 || avaliacao > 5)) {
      return res.status(400).json({ error: 'A avaliação deve ser um número de 1 a 5.' });
    }

    await db.query(
      `UPDATE favoritos 
       SET nome = ?, tipo = ?, endereco = ?, observacoes = ?, avaliacao = ?
       WHERE id = ?`,
      [
        nome,
        tipo || null,
        endereco || null,
        observacoes || null,
        avaliacao !== undefined ? avaliacao : null,
        id
      ]
    );

    res.status(200).json({ message: 'Favorito atualizado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/favoritos/:id (Excluir favorito)
exports.deleteFavorito = async (req, res, next) => {
  try {
    const { id } = req.params; // ID do favorito

    // Verificar se o favorito pertence a uma viagem do usuário logado
    const [favorito] = await db.query(
      `SELECT f.id FROM favoritos f
       JOIN viagens v ON f.id_viagem = v.id
       WHERE f.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (favorito.length === 0) {
      return res.status(403).json({ error: 'Favorito não encontrado ou você não tem permissão para excluí-lo.' });
    }

    await db.query('DELETE FROM favoritos WHERE id = ?', [id]);

    res.status(200).json({ message: 'Favorito excluído com sucesso!' });
  } catch (error) {
    next(error);
  }
};
