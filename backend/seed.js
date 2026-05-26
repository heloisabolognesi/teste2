const db = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    console.log('🌱 Iniciando o processo de seeding de dados realistas...');

    // 1. Criar Usuário de Demonstração
    const hashedPass = await bcrypt.hash('demo123', 10);
    const [userResult] = await db.query(
      'INSERT INTO usuarios (nome, email, senha, foto_perfil) VALUES (?, ?, ?, ?)',
      [
        'Explorador Global',
        'demo@rosadosventos.com',
        hashedPass,
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
      ]
    );
    const userId = userResult.insertId;
    console.log(`✅ Usuário demo criado (ID: ${userId})`);

    // 2. Viagens de Demonstração
    const viagens = [
      {
        nome: 'Eurotrip de Verão 2026',
        destino: 'Paris, Londres e Amsterdam',
        descricao: 'Uma jornada épica pelas capitais europeias, focada em arte, história e gastronomia local.',
        orcamento: 15000.00,
        data_ida: '2026-06-15',
        data_volta: '2026-07-05',
        imagem_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        status: 'planejada'
      },
      {
        nome: 'Expedição Jalapão Selvagem',
        destino: 'Tocantins, Brasil',
        descricao: 'Aventura 4x4 pelos fervedouros, dunas e cachoeiras de um dos lugares mais intocados do Brasil.',
        orcamento: 4500.00,
        data_ida: '2026-04-10',
        data_volta: '2026-04-18',
        imagem_url: 'https://images.unsplash.com/photo-1599408162162-dc65476378a1?auto=format&fit=crop&w=800&q=80',
        status: 'em_curso'
      },
      {
        nome: 'Inverno Mágico em Bariloche',
        destino: 'Patagônia, Argentina',
        descricao: 'Esqui, chocolate quente e paisagens nevadas inesquecíveis nos Andes.',
        orcamento: 8000.00,
        data_ida: '2025-07-10',
        data_volta: '2025-07-20',
        imagem_url: 'https://images.unsplash.com/photo-1517231939912-d66c8a86584a?auto=format&fit=crop&w=800&q=80',
        status: 'concluida'
      }
    ];

    for (const v of viagens) {
      const [vResult] = await db.query(
        `INSERT INTO viagens (nome, destino, descricao, orcamento, data_ida, data_volta, imagem_url, status, id_usuario)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [v.nome, v.destino, v.descricao, v.orcamento, v.data_ida, v.data_volta, v.imagem_url, v.status, userId]
      );
      const viagemId = vResult.insertId;

      // 3. Gastos Realistas para cada viagem
      const categorias = ['hospedagem', 'transporte', 'alimentacao', 'passeio', 'compras', 'outro'];
      const descricoes = {
        hospedagem: ['Hotel Central', 'Airbnb Vista Rio', 'Resort All Inclusive'],
        transporte: ['Passagens Aéreas', 'Aluguel de Carro', 'Bilhetes de Trem'],
        alimentacao: ['Jantar de Boas-vindas', 'Café da Manhã Local', 'Lanches Rápidos'],
        passeio: ['Tour Museus', 'Guia de Montanha', 'Entrada Parques'],
        compras: ['Souvenirs', 'Roupas de Inverno', 'Presentes'],
        outro: ['Seguro Viagem', 'Taxas de Embarque', 'Chip de Internet']
      };

      for (const cat of categorias) {
        const numGastos = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numGastos; i++) {
          const valor = (Math.random() * (v.orcamento / 10)).toFixed(2);
          await db.query(
            'INSERT INTO gastos (id_viagem, descricao, categoria, valor, data_gasto) VALUES (?, ?, ?, ?, ?)',
            [viagemId, descricoes[cat][i % 3], cat, valor, v.data_ida]
          );
        }
      }

      // 4. Roteiro Completo
      const atividades = [
        { titulo: 'Chegada e Check-in', desc: 'Chegada no aeroporto e transfer para o hotel.', hora: '14:00' },
        { titulo: 'Exploração Inicial', desc: 'Caminhada leve pelos arredores para reconhecimento.', hora: '16:30' },
        { titulo: 'Jantar de Boas-vindas', desc: 'Restaurante típico recomendado por locais.', hora: '20:00' },
        { titulo: 'Tour Principal', desc: 'Visita aos pontos turísticos mais famosos.', hora: '09:00' }
      ];

      for (const a of atividades) {
        await db.query(
          'INSERT INTO roteiro_atividades (id_viagem, titulo, descricao, data_atividade, horario, concluida) VALUES (?, ?, ?, ?, ?, ?)',
          [viagemId, a.titulo, a.desc, v.data_ida, a.hora, Math.random() > 0.5]
        );
      }

      // 5. Favoritos Selecionados
      const favoritos = [
        { nome: 'Restaurante Delícia', tipo: 'restaurante', end: 'Rua das Flores, 123', aval: 5 },
        { nome: 'Hotel Conforto', tipo: 'hotel', end: 'Av. Principal, 456', aval: 4 },
        { nome: 'Museu Histórico', tipo: 'ponto_turistico', end: 'Praça Central', aval: 5 }
      ];

      for (const f of favoritos) {
        await db.query(
          'INSERT INTO favoritos (id_viagem, nome, tipo, endereco, avaliacao) VALUES (?, ?, ?, ?, ?)',
          [viagemId, f.nome, f.tipo, f.end, f.aval]
        );
      }
    }

    console.log('✅ Seeding finalizado com sucesso! O sistema agora está rico em dados realistas.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
    process.exit(1);
  }
}

seed();
