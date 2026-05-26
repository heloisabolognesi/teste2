const db = require('../config/db');

// GET /api/viagens/:id/gastos (Listar gastos e estatísticas da viagem)
exports.getGastos = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem

    // 1. Verificar se a viagem pertence ao usuário logado e obter o orçamento
    const [viagem] = await db.query(
      'SELECT id, orcamento FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para ver os gastos desta viagem.' });
    }

    const orcamento = Number(viagem[0].orcamento);

    // 2. Buscar todos os gastos individuais da viagem
    const [gastos] = await db.query(
      'SELECT * FROM gastos WHERE id_viagem = ? ORDER BY data_gasto DESC',
      [id]
    );

    // 3. Obter o total gasto
    const [totalRows] = await db.query(
      'SELECT SUM(valor) as total FROM gastos WHERE id_viagem = ?',
      [id]
    );
    const totalGasto = Number(totalRows[0].total || 0);
    const saldoRestante = orcamento - totalGasto;

    // 4. Obter gastos agrupados por categoria para gráficos
    const [categoriaRows] = await db.query(
      'SELECT categoria, SUM(valor) as total FROM gastos WHERE id_viagem = ? GROUP BY categoria',
      [id]
    );

    // Mapear categorias para garantir retorno de todas as opções de categorias, mesmo com valor 0
    const categoriasDefault = {
      hospedagem: 0,
      transporte: 0,
      alimentacao: 0,
      passeio: 0,
      compras: 0,
      outro: 0
    };

    categoriaRows.forEach(row => {
      if (row.categoria in categoriasDefault) {
        categoriasDefault[row.categoria] = Number(row.total);
      }
    });

    res.status(200).json({
      gastos,
      orcamento,
      totalGasto,
      saldoRestante,
      gastosPorCategoria: categoriasDefault
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/viagens/:id/gastos (Adicionar novo gasto)
exports.createGasto = async (req, res, next) => {
  try {
    const { id } = req.params; // ID da viagem
    const { descricao, categoria, valor, data_gasto } = req.body;

    if (!descricao || !valor) {
      return res.status(400).json({ error: 'Os campos descrição e valor são obrigatórios.' });
    }

    // Verificar se a viagem pertence ao usuário logado
    const [viagem] = await db.query(
      'SELECT id FROM viagens WHERE id = ? AND id_usuario = ?',
      [id, req.userId]
    );

    if (viagem.length === 0) {
      return res.status(403).json({ error: 'Você não tem permissão para gerenciar os gastos desta viagem.' });
    }

    const [result] = await db.query(
      `INSERT INTO gastos (descricao, categoria, valor, data_gasto, id_viagem)
       VALUES (?, ?, ?, ?, ?)`,
      [
        descricao,
        categoria || 'outro',
        valor,
        data_gasto || null,
        id
      ]
    );

    res.status(201).json({
      message: 'Despesa registrada com sucesso!',
      gasto: {
        id: result.insertId,
        descricao,
        categoria: categoria || 'outro',
        valor: Number(valor),
        data_gasto,
        id_viagem: Number(id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/gastos/:id (Atualizar gasto)
exports.updateGasto = async (req, res, next) => {
  try {
    const { id } = req.params; // ID do gasto
    const { descricao, categoria, valor, data_gasto } = req.body;

    // Verificar se o gasto pertence a uma viagem do usuário logado
    const [gasto] = await db.query(
      `SELECT g.id FROM gastos g
       JOIN viagens v ON g.id_viagem = v.id
       WHERE g.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (gasto.length === 0) {
      return res.status(403).json({ error: 'Gasto não encontrado ou você não tem permissão para alterá-lo.' });
    }

    if (!descricao || !valor) {
      return res.status(400).json({ error: 'Os campos descrição e valor são obrigatórios.' });
    }

    await db.query(
      `UPDATE gastos 
       SET descricao = ?, categoria = ?, valor = ?, data_gasto = ?
       WHERE id = ?`,
      [
        descricao,
        categoria || 'outro',
        valor,
        data_gasto || null,
        id
      ]
    );

    res.status(200).json({ message: 'Gasto financeiro atualizado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/gastos/:id (Excluir gasto)
exports.deleteGasto = async (req, res, next) => {
  try {
    const { id } = req.params; // ID do gasto

    // Verificar se o gasto pertence a uma viagem do usuário logado
    const [gasto] = await db.query(
      `SELECT g.id FROM gastos g
       JOIN viagens v ON g.id_viagem = v.id
       WHERE g.id = ? AND v.id_usuario = ?`,
      [id, req.userId]
    );

    if (gasto.length === 0) {
      return res.status(403).json({ error: 'Gasto não encontrado ou você não tem permissão para excluí-la.' });
    }

    await db.query('DELETE FROM gastos WHERE id = ?', [id]);

    res.status(200).json({ message: 'Despesa financeira excluída com sucesso!' });
  } catch (error) {
    next(error);
  }
};
