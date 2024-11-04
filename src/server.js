const express = require('express');
const cors = require('cors');
const path = require('path');
const mainController = require('./controllers/mainController'); 

const app = express();

// Configuração de Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração de Rotas
app.use('/', mainController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
