CREATE DATABASE tickets_db;

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ano_lancamento INTEGER NOT NULL,
    poster VARCHAR(255),
    status BOOLEAN DEFAULT true
);

-- Dados de exemplo
INSERT INTO filmes (nome, ano_lancamento, poster, status) VALUES 
('O Poderoso Chefão', 1972, 'CREATE DATABASE tickets_db;

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ano_lancamento INTEGER NOT NULL,
    poster VARCHAR(255),
    status BOOLEAN DEFAULT true
);

-- Dados de exemplo
INSERT INTO filmes (nome, ano_lancamento, poster, status) VALUES 
('O Poderoso Chefão', 1972, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true),
('Matrix', 1999, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true),
('Interestelar', 2014, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true);', true),
('Matrix', 1999, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true),
('Interestelar', 2014, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true);