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

// Rota para deletar um filme
router.delete('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const query = 'DELETE FROM Filmes WHERE id = $1';
        const result = await db.query(query, [id]);

        if (result.rowCount > 0) {
            res.json({ success: true, message: 'Filme removido com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Filme não encontrado.' });
        }

    } catch (error) {
        console.error('Erro ao remover filme:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
});
        

module.exports = router;
