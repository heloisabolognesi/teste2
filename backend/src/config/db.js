const mysql = require('mysql2/promise');
const path = require('path');

// ─── 1. Carregar o .env com caminho absoluto ──────────────────────────────────
//  __dirname aqui é: .../backend/src/config
//  O .env fica em:   .../backend/.env  →  dois níveis acima
const envPath = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: envPath });

// ─── 2. Diagnóstico no console (remova após confirmar a conexão) ──────────────
console.log('🔍 Variáveis de ambiente carregadas:');
console.log('   DB_HOST:', process.env.DB_HOST);
console.log('   DB_USER:', process.env.DB_USER);
console.log('   DB_PASS:', process.env.DB_PASS ? '****** (carregada)' : '❌ VAZIA / NÃO ENCONTRADA');
console.log('   DB_NAME:', process.env.DB_NAME);

// ─── 3. Criar o Pool de Conexões ──────────────────────────────────────────────
const pool = mysql.createPool({
  host:            process.env.DB_HOST,
  user:            process.env.DB_USER,
  password:        process.env.DB_PASS,
  database:        process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// ─── 4. Testar a conexão imediatamente na inicialização ───────────────────────
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexão com o banco de dados MySQL realizada com sucesso!');
    conn.release();
  } catch (err) {
    console.error('❌ Erro ao conectar no MySQL:', err.message);
    console.error('   Verifique: servidor MySQL ativo, credenciais e banco "rosa_dos_ventos" criado (execute o schema.sql).');
  }
})();

module.exports = pool;
