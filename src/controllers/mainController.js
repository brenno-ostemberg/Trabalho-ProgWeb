const express = require('express');
const path = require('path');
const db = require('../models/dataModel');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Rota para buscar filmes
router.get('/api/movies/search', async (req, res) => {
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
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
