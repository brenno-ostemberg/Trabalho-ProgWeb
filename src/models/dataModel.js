const { Pool } = require('pg');

// Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tickets_db',
    password: 'postgres',
    port: 5432,
});

// Exporta a função query
module.exports = {
    query: (text, params) => pool.query(text, params)
};
