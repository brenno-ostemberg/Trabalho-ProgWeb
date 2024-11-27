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
        const { nomeFilme, status, anoLancamento } = req.query;

        let query = 'SELECT * FROM Filmes WHERE 1=1';
        const params = [];

        if (nomeFilme) {
            params.push(`%${nomeFilme}%`);
            query += ` AND nome ILIKE $${params.length}`;
        }

        if (status) {
            params.push(status === "Ativo");
            query += ` AND status = $${params.length}`;
        }

        if (anoLancamento) {
            params.push(anoLancamento);
            query += ` AND ano_lancamento = $${params.length}`;
        }

        const result = await db.query(query, params);
        res.json({ filmes: result.rows });

    } catch (error) {
        console.error('Erro ao filtrar filmes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// Rota para listar todos os filmes
router.get('/api/moviesTodos', async (req, res) => {
    try {
        const query = 'SELECT * FROM Filmes ORDER BY id'; 
        const result = await db.query(query);

        res.json({ filmes: result.rows });
    } catch (error) {
        console.error('Erro ao listar filmes:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para adicionar filme
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

// Rota para buscar o preço atual do ingresso
router.get('/api/atualizarPreco', async (req, res) => {
    try {
        const query = 'SELECT preco_ingresso FROM Filmes LIMIT 1';
        const result = await db.query(query);

        if (result.rows.length > 0) {
            res.json({ 
                success: true, 
                precoIngresso: result.rows[0].preco_ingresso 
            });
        } else {
            res.status(404).json({ 
                success: false, 
                message: 'Preço do ingresso não encontrado' 
            });
        }
    } catch (error) {
        console.error('Erro ao buscar preço do ingresso:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno do servidor' 
        });
    }
});

// Rota para atualizar o preço do ingresso
router.put('/api/atualizarPreco', async (req, res) => {
    try {
        const { novoPreco } = req.body;

        // Validações simples de preço
        if (isNaN(novoPreco) || novoPreco <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Preço inválido' 
            });
        }

        const query = `
            UPDATE Filmes 
            SET preco_ingresso = $1
        `;
        const result = await db.query(query, [novoPreco]);

        res.json({ 
            success: true, 
            message: 'Preço do ingresso atualizado com sucesso!',
            novoPreco 
        });
    } catch (error) {
        console.error('Erro ao atualizar preço do ingresso:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro interno do servidor' 
        });
    }
});

module.exports = router;