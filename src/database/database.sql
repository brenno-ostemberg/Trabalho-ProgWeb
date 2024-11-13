CREATE DATABASE tickets_db;

\c tickets_db

CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ano_lancamento INTEGER NOT NULL,
    poster VARCHAR(255),
    status BOOLEAN DEFAULT true
);

-- Inserindo dados de exemplo
INSERT INTO filmes (nome, ano_lancamento, poster, status) VALUES 
('O Poderoso Chefão', 1972, 'https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg', true),
('Matrix', 1999, 'https://uauposters.com.br/media/catalog/product/3/4/347120140406-uau-posters-filmes-matrix.jpg', true),
('Interestelar', 2014, 'https://uauposters.com.br/media/catalog/product/4/1/411320150509-uau-posters-filmes-interestelar-interestellar.jpg', true);
('Inception', 2010, 'https://m.media-amazon.com/images/I/71iDkRVDZNL.jpg', true);
('Cidade de Deus', 2002, 'https://uauposters.com.br/media/catalog/product/1/5/158320140604-uau-posters-filmes-cidade-de-deus--city-of-god-3.jpg', true);
('La La Land', 2016, 'https://uauposters.com.br/media/catalog/product/1/1/111420180226-uau-posters-filmes-la-la-land-ryan-gosling-emma-stone.jpg', true);