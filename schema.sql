-- =======================================================================
--                   PROJETO INTEGRADOR: ROSA DOS VENTOS
--             SISTEMA DE PLANEJAMENTO E GESTÃO DE VIAGENS
-- =======================================================================
-- Disciplina: Desenvolvimento de Sistemas com Banco de Dados
-- Finalidade: Criação de tabelas, relacionamentos e dados de exemplo.
-- =======================================================================

-- 1. CRIAÇÃO DO BANCO DE DADOS
CREATE DATABASE IF NOT EXISTS rosa_dos_ventos;
USE rosa_dos_ventos;

-- 2. CRIAÇÃO DAS TABELAS

-- TABELA 1: usuarios
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  foto_perfil VARCHAR(500),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA 2: viagens
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
CREATE TABLE roteiro_atividades (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  data_atividade DATE,
  horario TIME,
  concluida BOOLEAN DEFAULT FALSE,
  id_viagem INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- TABELA 4: gastos
CREATE TABLE gastos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  descricao VARCHAR(200) NOT NULL,
  categoria ENUM('hospedagem','transporte','alimentacao','passeio','compras','outro') DEFAULT 'outro',
  valor DECIMAL(10,2) NOT NULL,
  data_gasto DATE,
  id_viagem INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- TABELA 5: favoritos
CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(150) NOT NULL,
  tipo ENUM('restaurante','hotel','ponto_turistico','local_interessante'),
  endereco VARCHAR(300),
  observacoes TEXT,
  avaliacao INT CHECK (avaliacao BETWEEN 1 AND 5),
  id_viagem INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_viagem) REFERENCES viagens(id) ON DELETE CASCADE
);

-- 3. DADOS DE EXEMPLO (Para visualização imediata no Dashboard)

-- Inserir um usuário de teste (Senha: 123456 criptografada)
INSERT INTO usuarios (nome, email, senha) VALUES 
('Viajante Teste', 'teste@teste.com', '$2a$10$7Z2vO6Z7yXm1X.R7VpW2uO9jH7k8m5S4u3V2W1X0Y9Z8A7B6C5D4E');

-- Inserir viagens
INSERT INTO viagens (nome, destino, descricao, orcamento, data_ida, data_volta, status, id_usuario, imagem_url) VALUES 
('Férias em Família', 'Rio de Janeiro - RJ', 'Viagem anual para aproveitar o sol e a praia.', 5000.00, '2026-05-30', '2026-06-06', 'planejada', 1, 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80'),
('Mochilão Europa', 'Paris - França', 'Exploração cultural pelo velho continente.', 12000.00, '2026-07-15', '2026-08-05', 'planejada', 1, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80');

-- Inserir gastos de exemplo (Conectando ao Dashboard de gastos gerais)
INSERT INTO gastos (descricao, categoria, valor, data_gasto, id_viagem) VALUES 
('Jantar Copacabana', 'alimentacao', 150.50, '2026-05-30', 1),
('Aluguel de Carro', 'transporte', 450.00, '2026-05-31', 1),
('Hospedagem Hotel Mar', 'hospedagem', 1200.00, '2026-05-30', 1),
('Jantar em Paris', 'alimentacao', 320.00, '2026-07-16', 2),
('Passagem de Trem', 'transporte', 210.00, '2026-07-17', 2),
('Ingresso Museu Louvre', 'passeio', 95.00, '2026-07-18', 2);

-- Inserir atividades de roteiro (Para progresso de roteiro)
INSERT INTO roteiro_atividades (titulo, descricao, data_atividade, horario, concluida, id_viagem) VALUES 
('Check-in no Hotel', 'Chegada e acomodação.', '2026-05-30', '14:00:00', TRUE, 1),
('Passeio no Calçadão', 'Caminhada ao entardecer.', '2026-05-30', '17:30:00', TRUE, 1),
('Cristo Redentor', 'Visita ao monumento.', '2026-05-31', '09:00:00', FALSE, 1),
('Pão de Açúcar', 'Passeio de bondinho.', '2026-05-31', '15:00:00', FALSE, 1);
