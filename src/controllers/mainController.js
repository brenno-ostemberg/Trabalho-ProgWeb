const express = require('express');
const path = require('path');
const db = require('../models/dataModel');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Rota para buscar filmes com método POST
router.post('/api/movies/search', async (req, res) => {
    try {
        const { nomeFilme } = req.body;

        const filmes = await db.searchMoviesByName(nomeFilme);

        res.json({ filmes });
        
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para buscar filmes com método GET
router.get('/api/movies/search', async (req, res) => {
    try {
        const { nomeFilme } = req.query;

        const filmes = await db.searchMoviesByName(nomeFilme);

        res.json({ filmes });
        
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
