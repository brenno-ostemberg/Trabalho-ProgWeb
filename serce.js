const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

const app = express();

// banco de dados
const pool = new Pool
({
    user: 'postgres',
    host: 'localhost',
    database: 'tickets_db',
    password: 'postgres',
    port: 5432,
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//pagina principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//buscar filme
app.get('/api/movies/search', async (req, res) => {
    try {
        const { nomeFilme } = req.body;
        
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
        
        const result = await db.query(query, [`%${nomeFilme}%`]);
        
        if (result.rows.length > 0) {
            res.json({ filmes: result.rows });
        } else {
            res.json({ filmes: [] });
        }
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        res.status(500).json({ error: 'Erro interno do servidor'}) 
        }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});