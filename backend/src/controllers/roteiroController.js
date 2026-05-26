const db = require('../config/db');

// GET /api/viagens/:id/roteiro (Listar atividades de uma viagem específica)
exports.getRoteiro = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem

    // Verificar se a viagem pertence ao usuário autenticado
    const [viagem] = await db.query(
      'SELECT id FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para ver o roteiro desta viagem.' });
    }

    // Listar atividades ordenadas por data e hora
    const [rows] = await db.query(
      'SELECT * FROM roteiro_atividades WHERE id_viagem = ? ORDER BY data_atividade ASC, horario ASC',
      [id]
    );

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// POST /api/viagens/:id/roteiro (Criar atividade no roteiro de uma viagem)
exports.createAtividade = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem
    const { titulo, descricao, data_atividade, horario, concluida } = req.body;

    if (!titulo) {
      return res.status(400).json({ error: 'O título da atividade é obrigatório.' });
    }

    // Verificar se a viagem pertence ao usuário autenticado
    const [viagem] = await db.query(
      'SELECT id FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para planejar o roteiro desta viagem.' });
    }

    const [result] = await db.query(
      `INSERT INTO roteiro_atividades (titulo, descricao, data_atividade, horario, concluida, id_viagem)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        descricao || null,
        data_atividade || null,
        horario || null,
        concluida !== undefined ? concluida : false,
        id
      ]
    );

    res.status(201).json({
      message: 'Atividade adicionada ao roteiro com sucesso!',
      atividade: {
        id: result.insertId,
        titulo,
        descricao,
        data_atividade,
        horario,
        concluida: concluida || false,
        id_viagem: Number(id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/roteiro/:id (Atualizar atividade do roteiro)
exports.updateAtividade = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da atividade
    const { titulo, descricao, data_atividade, horario, concluida } = req.body;

    // Verificar se a atividade pertence a uma viagem do usuário logado
    const [atividade] = await db.query(
      `SELECT r.id FROM roteiro_atividades r
       JOIN viagens v ON r.id_viagem = v.id
       WHERE r.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (atividade.length === 0) {
      return res.status(403).json({ error: 'Atividade não encontrada ou você não tem permissão para alterá-la.' });
    }

    if (!titulo) {
      return res.status(400).json({ error: 'O título da atividade é obrigatório.' });
    }

    await db.query(
      `UPDATE roteiro_atividades 
       SET titulo = ?, descricao = ?, data_atividade = ?, horario = ?, concluida = ?
       WHERE id = ?`,
      [
        titulo,
        descricao || null,
        data_atividade || null,
        horario || null,
        concluida !== undefined ? concluida : false,
        id
      ]
    );

    res.status(200).json({ message: 'Atividade do roteiro atualizada com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/roteiro/:id (Excluir atividade do roteiro)
exports.deleteAtividade = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da atividade

    // Verificar se a atividade pertence a uma viagem do usuário logado
    const [atividade] = await db.query(
      `SELECT r.id FROM roteiro_atividades r
       JOIN viagens v ON r.id_viagem = v.id
       WHERE r.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (atividade.length === 0) {
      return res.status(403).json({ error: 'Atividade não encontrada ou você não tem permissão para excluí-la.' });
    }

    await db.query('DELETE FROM roteiro_atividades WHERE id = ?', [id]);

    res.status(200).json({ message: 'Atividade excluída do roteiro com sucesso!' });
  } catch (error) {
    next(error);
  }
};
