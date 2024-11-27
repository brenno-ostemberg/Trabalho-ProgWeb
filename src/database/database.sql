CREATE DATABASE tickets_db;

\c tickets_db

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ano_lancamento INTEGER NOT NULL,
    poster VARCHAR(255),
    status BOOLEAN DEFAULT true,
    preco_ingresso NUMERIC(10,2) DEFAULT 25.00
);

-- Inserindo dados de exemplo
INSERT INTO filmes (nome, ano_lancamento, poster, status, preco_ingresso) VALUES 
('O Poderoso Chefão', 1972, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true, 25.00),
('Matrix', 1999, 'https://uauposters.com.br/media/catalog/product/3/4/347120140406-uau-posters-filmes-matrix.jpg', true, 25.00),
('Interestelar', 2014, 'https://uauposters.com.br/media/catalog/product/4/1/411320150509-uau-posters-filmes-interestelar-interestellar.jpg', true, 25.00),
('Inception', 2010, 'https://m.media-amazon.com/images/I/71iDkRVDZNL.jpg', true, 25.00),
('Cidade de Deus', 2002, 'https://uauposters.com.br/media/catalog/product/1/5/158320140604-uau-posters-filmes-cidade-de-deus--city-of-god-3.jpg', true, 25.00),
('La La Land', 2016, 'https://uauposters.com.br/media/catalog/product/1/1/111420180226-uau-posters-filmes-la-la-land-ryan-gosling-emma-stone.jpg', true, 25.00);