const { Pool } = require('pg');

// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tickets_db',
    password: 'postgres',
    port: 5432,
});

// Função para buscar filmes por nome
const searchMoviesByName = async (nomeFilme) => {
    const query = `
        SELECT 
            id,
            nome,
            ano_lancamento as "anoLancamento",
            poster,
            CASE 
                WHEN status = true THEN 'Ativo'
                ELSE 'Inativo'
            END as status
        FROM filmes
        WHERE LOWER(nome) LIKE LOWER($1)
    `;
    const result = await pool.query(query, [`%${nomeFilme}%`]);
    return result.rows;
};

// Função para buscar filmes com filtro
const filterMovies = async (filters) => {
    let query = 'SELECT * FROM Filmes WHERE 1=1';
    const params = [];

    if (filters.nomeFilme) {
        params.push(`%${filters.nomeFilme}%`);
        query += ` AND nome ILIKE $${params.length}`;
    }

    if (filters.status) {
        params.push(filters.status === "Ativo");
        query += ` AND status = $${params.length}`;
    }

    if (filters.anoLancamento) {
        params.push(filters.anoLancamento);
        query += ` AND ano_lancamento = $${params.length}`;
    }

    const result = await pool.query(query, params);
    return result.rows;
};

// Função para listar todos os filmes
const getAllMovies = async () => {
    const query = 'SELECT * FROM Filmes ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
};

// Função para adicionar filme
const addMovie = async ({ nome, anoLancamento, poster, status }) => {
    const query = `
        INSERT INTO filmes (nome, ano_lancamento, poster, status)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const valores = [nome, anoLancamento, poster, status === 'Ativo'];
    const result = await pool.query(query, valores);
    return result.rows[0];
};

// Função para editar filme
const updateMovie = async (id, { nome, anoLancamento, poster, status }) => {
    const query = `
        UPDATE filmes 
        SET nome = $1, ano_lancamento = $2, poster = $3, status = $4 
        WHERE id = $5
    `;
    const result = await pool.query(query, [
        nome,
        anoLancamento,
        poster,
        status === "Ativo",
        id
    ]);
    return result.rowCount > 0;
};

// Função para remover filme
const deleteMovie = async (id) => {
    const query = 'DELETE FROM Filmes WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
};

// Função para buscar o preço atual do ingresso
const getTicketPrice = async () => {
    const query = 'SELECT preco_ingresso FROM Filmes LIMIT 1';
    const result = await pool.query(query);
    return result.rows[0]?.preco_ingresso || null;
};

// Função para atualizar o preço do ingresso
const updateTicketPrice = async (novoPreco) => {
    const query = `UPDATE Filmes SET preco_ingresso = $1`;
    await pool.query(query, [novoPreco]);
};

// Exporta as funções necessárias
module.exports = {
    query: (text, params) => pool.query(text, params),
    searchMoviesByName,
    filterMovies,
    getAllMovies,
    addMovie,
    updateMovie,
    deleteMovie,
    getTicketPrice,
    updateTicketPrice,
};
