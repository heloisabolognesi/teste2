const db = require('../config/db');

// GET /api/viagens (Listar viagens do usuário logado)
exports.getViagens = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM viagens WHERE id_usuario = ? ORDER BY data_ida ASC',
      [req.userId]
    );
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// GET /api/viagens/:id (Obter detalhe de uma viagem específica do usuário)
exports.getViagemById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      'SELECT * FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Viagem não encontrada ou você não tem permissão para acessá-la.' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// POST /api/viagens (Criar nova viagem)
exports.createViagem = async (req, res, next) => {
  try {
    const { nome, destino, descricao, orcamento, data_ida, data_volta, imagem_url, status } = req.body;

    if (!nome || !destino || !data_ida || !data_volta) {
      return res.status(400).json({ error: 'Os campos nome, destino, data de ida e data de volta são obrigatórios.' });
    }

    const [result] = await db.query(
      `INSERT INTO viagens (nome, destino, descricao, orcamento, data_ida, data_volta, imagem_url, status, id_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nome,
        destino,
        descricao || null,
        orcamento !== undefined ? orcamento : 0.00,
        data_ida,
        data_volta,
        imagem_url || null,
        status || 'planejada',
        req.userId
      ]
    );

    res.status(201).json({
      message: 'Viagem planejada com sucesso!',
      viagemId: result.insertId,
      viagem: {
        id: result.insertId,
        nome,
        destino,
        descricao,
        orcamento,
        data_ida,
        data_volta,
        imagem_url,
        status,
        id_usuario: req.userId
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/viagens/:id (Atualizar viagem existente)
exports.updateViagem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nome, destino, descricao, orcamento, data_ida, data_volta, imagem_url, status } = req.body;

    // Verificar se a viagem existe e pertence ao usuário
    const [existing] = await db.query('SELECT id FROM viagens WHERE id = ? AND id_usuario = ?', [id, req.userId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Viagem não encontrada ou você não tem permissão para alterá-la.' });
    }

    if (!nome || !destino || !data_ida || !data_volta) {
      return res.status(400).json({ error: 'Os campos nome, destino, data de ida e data de volta são obrigatórios.' });
    }

    await db.query(
      `UPDATE viagens 
       SET nome = ?, destino = ?, descricao = ?, orcamento = ?, data_ida = ?, data_volta = ?, imagem_url = ?, status = ?
       WHERE id = ? AND id_usuario = ?`,
      [
        nome,
        destino,
        descricao || null,
        orcamento !== undefined ? orcamento : 0.00,
        data_ida,
        data_volta,
        imagem_url || null,
        status || 'planejada',
        id,
        req.userId
      ]
    );

    res.status(200).json({ message: 'Viagem atualizada com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/viagens/:id (Excluir viagem)
exports.deleteViagem = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar se a viagem existe e pertence ao usuário
    const [existing] = await db.query('SELECT id FROM viagens WHERE id = ? AND id_usuario = ?', [id, req.userId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Viagem não encontrada ou você não tem permissão para excluí-la.' });
    }

    // Excluir a viagem. O MySQL se encarrega de deletar gastos, roteiro e favoritos via ON DELETE CASCADE.
    await db.query('DELETE FROM viagens WHERE id = ? AND id_usuario = ?', [id, req.userId]);

    res.status(200).json({ message: 'Viagem (e todos os seus roteiros, gastos e favoritos relacionados) excluída com sucesso!' });
  } catch (error) {
    next(error);
  }
};
