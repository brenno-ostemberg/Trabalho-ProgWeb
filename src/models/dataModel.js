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

// Exporta a função query
module.exports = {
    query: (text, params) => pool.query(text, params)
};
