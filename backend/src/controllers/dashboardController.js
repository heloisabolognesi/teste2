const db = require('../config/db');

// GET /api/dashboard
exports.getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.userId;

    // 1. Total de viagens do usuário
    const [viagensCount] = await db.query(
      'SELECT COUNT(*) as totalViagens FROM viagens WHERE id_usuario = ?',
      [userId]
    );
    const totalViagens = viagensCount[0].totalViagens || 0;

    // 2. Quantidade total de destinos únicos
    const [destinosCount] = await db.query(
      'SELECT COUNT(DISTINCT destino) as totalDestinos FROM viagens WHERE id_usuario = ?',
      [userId]
    );
    const totalDestinos = destinosCount[0].totalDestinos || 0;

    // 3. Total de gastos em todas as viagens
    const [gastosSum] = await db.query(
      `SELECT SUM(g.valor) as totalGastos 
       FROM gastos g 
       JOIN viagens v ON g.id_viagem = v.id 
       WHERE v.id_usuario = ?`,
      [userId]
    );
    const totalGastos = Number(gastosSum[0].totalGastos || 0);

    // 4. Próximas viagens
    const [proximasViagens] = await db.query(
      `SELECT * FROM viagens 
       WHERE id_usuario = ? AND data_ida >= CURRENT_DATE() 
       ORDER BY data_ida ASC 
       LIMIT 5`,
      [userId]
    );

    // 5. Atividades totais vs concluídas
    const [atividadesCount] = await db.query(
      `SELECT 
         COUNT(*) as total,
         SUM(CASE WHEN r.concluida = 1 THEN 1 ELSE 0 END) as concluidas
       FROM roteiro_atividades r
       JOIN viagens v ON r.id_viagem = v.id
       WHERE v.id_usuario = ?`,
      [userId]
    );
    const totalAtividades = atividadesCount[0].total || 0;
    const atividadesConcluidas = Number(atividadesCount[0].concluidas || 0);

    // 6. Distribuição de gastos por categoria
    const [gastosPorCategoria] = await db.query(
      `SELECT 
         g.categoria, 
         SUM(g.valor) as total 
       FROM gastos g 
       JOIN viagens v ON g.id_viagem = v.id 
       WHERE v.id_usuario = ? 
       GROUP BY g.categoria`,
      [userId]
    );

    // 7. Gastos detalhados (Últimos 10 gastos de todas as viagens para visualização no dashboard)
    const [gastosDetalhados] = await db.query(
      `SELECT 
         g.id,
         g.descricao, 
         g.valor, 
         g.categoria, 
         g.data_gasto as data,
         v.nome as viagem_nome
       FROM gastos g 
       JOIN viagens v ON g.id_viagem = v.id 
       WHERE v.id_usuario = ? 
       ORDER BY g.data_gasto DESC, g.id DESC
       LIMIT 10`,
      [userId]
    );

    res.status(200).json({
      stats: {
        totalViagens,
        totalDestinos,
        totalGastos,
        totalAtividades,
        atividadesConcluidas,
        gastosPorCategoria,
        gastosDetalhados
      },
      proximasViagens
    });
  } catch (error) {
    next(error);
  }
};
