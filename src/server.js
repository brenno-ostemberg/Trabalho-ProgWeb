const express = require('express');
const cors = require('cors');
const path = require('path');
const mainController = require('./controllers/mainController'); 

// Instância do Express
const app = express();

// Configuração de Middlewares
app.use(cors());
app.use(express.json());

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de Views para o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Configuração de Rotas
app.use('/', mainController);

// Configuração de Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
