-- =======================================================================
--                   PROJETO INTEGRADOR: ROSA DOS VENTOS
--             SISTEMA DE PLANEJAMENTO E GESTÃO DE VIAGENS
-- =======================================================================
-- Disciplina: Desenvolvimento de Sistemas com Banco de Dados
-- Finalidade: Criação manual de tabelas, relacionamentos e integridade.
-- =======================================================================

-- -----------------------------------------------------------------------
-- 1. CRIAÇÃO DO BANCO DE DADOS
-- -----------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS rosa_dos_ventos;
USE rosa_dos_ventos;

-- -----------------------------------------------------------------------
-- 2. CRIAÇÃO DAS TABELAS
-- -----------------------------------------------------------------------

-- TABELA 1: usuarios
-- Armazena os usuários do sistema. As senhas serão criptografadas no backend.
-- EXPLICAÇÃO TÉCNICA:
-- - id: É a Chave Primária (PK) da tabela. Identifica de forma única cada usuário. Usamos AUTO_INCREMENT para o banco gerar o ID sozinho.
-- - criado_em: Usa TIMESTAMP com DEFAULT CURRENT_TIMESTAMP para capturar automaticamente o momento exato em que a conta foi criada.
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  foto_perfil VARCHAR(500),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA 2: viagens
-- Armazena as viagens planejadas pelos usuários.
-- EXPLICAÇÃO TÉCNICA:
-- - id: Chave Primária (PK) da viagem.
-- - orcamento: Definido como DECIMAL(10,2) para garantir cálculos exatos de valores financeiros, evitando as distorções causadas por FLOAT/DOUBLE.
-- - status: Definido como ENUM. Restringe o valor apenas aos estados listados, prevenindo que dados inválidos sejam gravados.
-- - id_usuario: Chave Estrangeira (FK). Aponta para "usuarios(id)" e estabelece o relacionamento 1:N (Um usuário tem várias viagens).
-- - ON DELETE CASCADE: Se o usuário correspondente for deletado, todas as suas viagens serão apagadas automaticamente, evitando lixo no banco.
CREATE TABLE viagens (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  destino VARCHAR(150) NOT NULL,
  descricao TEXT,
  orcamento DECIMAL(10,2) DEFAULT 0.00,
  data_ida DATE NOT NULL,
  data_volta DATE NOT NULL,
  imagem_url VARCHAR(500),
  status ENUM('planejada','em_andamento','concluida','cancelada') DEFAULT 'planejada',
  id_usuario INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- TABELA 3: roteiro_atividades
-- Armazena o roteiro cronológico de atividades para cada viagem.
-- EXPLICAÇÃO TÉCNICA:
-- - id: Chave Primária (PK).
-- - concluida: Tipo BOOLEAN (mapeado como TINYINT(1) no MySQL) para indicar se a atividade foi realizada.
-- - id_viagem: Chave Estrangeira (FK) apontando para "viagens(id)". Relacionamento 1:N (Uma viagem tem muitas atividades).
-- - ON DELETE CASCADE: Se a viagem for excluída, todas as suas atividades de roteiro serão automaticamente apagadas.
CREATE TABLE roteiro_atividades (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  data_atividade DATE,
  horario TIME,
  concluida BOOLEAN DEFAULT FALSE,
  id_viagem INT NOT NULL,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- TABELA 4: gastos
-- Armazena as despesas financeiras atreladas às viagens.
-- EXPLICAÇÃO TÉCNICA:
-- - id: Chave Primária (PK).
-- - categoria: ENUM limitando o tipo do gasto para fins de estatísticas.
-- - valor: DECIMAL(10,2) para altíssima fidelidade financeira nas operações aritméticas (somas de gastos).
-- - id_viagem: Chave Estrangeira (FK) apontando para "viagens(id)". Relacionamento 1:N (Uma viagem tem vários gastos).
-- - ON DELETE CASCADE: Deletar a viagem remove em cascata todos os gastos dela.
CREATE TABLE gastos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descricao VARCHAR(200) NOT NULL,
  categoria ENUM('hospedagem','transporte','alimentacao','passeio','compras','outro') DEFAULT 'outro',
  valor DECIMAL(10,2) NOT NULL,
  data_gasto DATE,
  id_viagem INT NOT NULL,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- TABELA 5: favoritos
-- Armazena locais favoritos que o usuário deseja salvar e avaliar dentro de uma viagem.
-- EXPLICAÇÃO TÉCNICA:
-- - id: Chave Primária (PK).
-- - avaliacao: Inteiro regulado com CHECK (avaliacao BETWEEN 1 AND 5) para só permitir notas de 1 a 5 estrelas.
-- - id_viagem: Chave Estrangeira (FK) apontando para "viagens(id)". Relacionamento 1:N (Uma viagem tem muitos favoritos).
-- - ON DELETE CASCADE: Apaga os favoritos da viagem caso ela seja excluída.
CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  tipo ENUM('restaurante','hotel','ponto_turistico','local_interessante'),
  endereco VARCHAR(300),
  observacoes TEXT,
  avaliacao INT CHECK (avaliacao BETWEEN 1 AND 5),
  id_viagem INT NOT NULL,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- -----------------------------------------------------------------------
-- 3. RESUMO TÉCNICO DOS RELACIONAMENTOS (Para Apresentação do Aluno)
-- -----------------------------------------------------------------------
-- usuarios (1)  --------->  (N) viagens
-- viagens (1)   --------->  (N) roteiro_atividades
-- viagens (1)   --------->  (N) gastos
-- viagens (1)   --------->  (N) favoritos
--
-- CARACTERÍSTICAS DA MODELAGEM DE BANCO DE DADOS:
-- A) Chaves Primárias (PK): coluna 'id' em todas as tabelas (tipo INT, auto-incremental, único, índice primário).
-- B) Chaves Estrangeiras (FK):
--    - viagens.id_usuario aponta para usuarios.id
--    - roteiro_atividades.id_viagem aponta para viagens.id
--    - gastos.id_viagem aponta para viagens.id
--    - favoritos.id_viagem aponta para viagens.id
-- C) Integridade Referencial (ON DELETE CASCADE): Configurado em todas as chaves estrangeiras.
--    Impede a existência de dados órfãos, mantendo o banco saudável e em conformidade.
-- D) Uso de DECIMAL vs FLOAT: Dinheiro é um tipo numérico exato. FLOAT usa ponto flutuante binário
--    e resulta em erros acumulados. DECIMAL armazena com precisão exata.
-- E) Uso de ENUM: Poupa espaço e restringe a inserção de lixo, controlando os inputs no próprio banco.
-- -----------------------------------------------------------------------
