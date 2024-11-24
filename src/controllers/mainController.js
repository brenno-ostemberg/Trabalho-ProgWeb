const express = require('express');
const path = require('path');
const db = require('../models/dataModel');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.get('/adicionar-filme', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'addMovie.html'));
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

// Rota para criar um novo filme usando o método POST
router.post('/api/movies', async (req, res) => {
    try {
        const { nome, anoLancamento, poster, status } = req.body;

        const query = `
            INSERT INTO filmes (nome, ano_lancamento, poster, status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const valores = [nome, anoLancamento, poster, status === 'Ativo'];

        const result = await db.query(query, valores);

        res.status(201).json({
            success: true,
            message: 'Filme adicionado com sucesso!',
            filme: result.rows[0],
        });

    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor.',
        });
    }
});

// Rota para editar um filme
router.put('/api/movies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, anoLancamento, poster, status } = req.body;

        const query = `
            UPDATE filmes 
            SET nome = $1, ano_lancamento = $2, poster = $3, status = $4 
            WHERE id = $5
        `;
        const result = await db.query(query, [
            nome,
            anoLancamento,
            poster,
            status === "Ativo", 
            id
        ]);

        if (result.rowCount > 0) {
            res.json({ success: true, message: 'Filme atualizado com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Filme não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao editar filme:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
});

module.exports = router;
