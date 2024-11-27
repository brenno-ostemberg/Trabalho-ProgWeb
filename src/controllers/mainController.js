const express = require('express');
const path = require('path');
const db = require('../models/dataModel');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

// Rota para a página de lista de filmes
router.get('/moviesTodos', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'moviesLista.html'));
});

// Rota para adicionar um novo filme
router.get('/adicionar-filme', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'addMovie.html'));
});

// Rota para a página de edição de filmes
router.get('/editMovie.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'editMovie.html'));
});

// Rota para a página de atualizar preço do ingresso
router.get('/atualizarPreco', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'precoIngresso.html'));
});

// Rota Filtro
router.get('/api/movies/filter', async (req, res) => {
    try {
        const filmes = await db.filterMovies(req.query);
        res.json({ filmes });
    } catch (error) {
        console.error('Erro ao filtrar filmes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para listar todos os filmes
router.get('/api/moviesTodos', async (req, res) => {
    try {
        const filmes = await db.getAllMovies();
        res.json({ filmes });
    } catch (error) {
        console.error('Erro ao listar filmes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para adicionar filme
router.post('/api/movies', async (req, res) => {
    try {
        const filme = await db.addMovie(req.body);
        res.status(201).json({
            success: true,
            message: 'Filme adicionado com sucesso!',
            filme,
        });
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
});

// Rota para editar filme
router.put('/api/movies/:id', async (req, res) => {
    try {
        const success = await db.updateMovie(req.params.id, req.body);
        if (success) {
            res.json({ success: true, message: 'Filme atualizado com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Filme não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao editar filme:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
});

// Rota para deletar filme
router.delete('/api/movies/:id', async (req, res) => {
    try {
        const success = await db.deleteMovie(req.params.id);
        if (success) {
            res.json({ success: true, message: 'Filme removido com sucesso!' });
        } else {
            res.status(404).json({ success: false, message: 'Filme não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao remover filme:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
});

// Rota para buscar o preço atual do ingresso
router.get('/api/atualizarPreco', async (req, res) => {
    try {
        const precoIngresso = await db.getTicketPrice();
        if (precoIngresso !== null) {
            res.json({ success: true, precoIngresso });
        } else {
            res.status(404).json({ success: false, message: 'Preço do ingresso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar preço do ingresso:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});

// Rota para atualizar o preço do ingresso
router.put('/api/atualizarPreco', async (req, res) => {
    try {
        const { novoPreco } = req.body;

        if (isNaN(novoPreco) || novoPreco <= 0) {
            return res.status(400).json({ success: false, message: 'Preço inválido' });
        }

        await db.updateTicketPrice(novoPreco);

        res.json({ success: true, message: 'Preço do ingresso atualizado com sucesso!', novoPreco });
    } catch (error) {
        console.error('Erro ao atualizar preço do ingresso:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
});

module.exports = router;