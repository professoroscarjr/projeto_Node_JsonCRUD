
const express = require('express');// Importa o módulo Express para criar o servidor web
const bodyParser = require('body-parser');// Importa o módulo body-parser para analisar o corpo das requisições HTTP
const fs = require('fs');// Importa o módulo fs (file system) para trabalhar com arquivos
const path = require('path');// Importa o módulo path para trabalhar com caminhos de arquivos e diretórios
const app = express();// Cria uma instância do aplicativo Express
const port = 3000;// Define a porta em que o servidor irá escutar

// Usa o middleware body-parser para analisar requisições com corpo JSON
app.use(bodyParser.json());
// Usa o middleware express.static para servir arquivos estáticos (HTML, CSS, JS) do diretório atual
app.use(express.static(path.join(__dirname)));

// Define o caminho do arquivo JSON onde os dados serão armazenados
const dataFilePath = 'data.json';

// Função para ler os dados do arquivo JSON
function readData() {
    try {// Tenta ler o arquivo JSON
        // Lê o conteúdo do arquivo de forma síncrona e converte para string UTF-8
        const data = fs.readFileSync(dataFilePath, 'utf8');
        // Converte a string JSON para um objeto JavaScript e retorna
        return JSON.parse(data);
    } catch (err) {
        // Se ocorrer um erro (por exemplo, arquivo não encontrado), retorna um array vazio
        return [];
    }
}

// Função para escrever os dados no arquivo JSON
function writeData(data) {
    // Converte o objeto JavaScript para uma string JSON formatada e escreve no arquivo
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Rotas CRUD
// Rota para ler todos os itens (GET /items)
app.get('/items', (req, res) => {
    // Lê os dados do arquivo JSON
    const data = readData();
    // Envia os dados como resposta JSON
    res.json(data);
});


// Rota para criar um novo item (POST /items)
app.post('/items', (req, res) => {
    // Lê os dados do arquivo JSON
    const data = readData();
    // Cria um novo item com um ID único e os dados do corpo da requisição
    const newItem = {
        id: Date.now(), // Gera um ID único usando o timestamp atual
        ...req.body // Adiciona as propriedades do corpo da requisição ao novo item
    };
    // Adiciona o novo item ao array de dados
    data.push(newItem);
    // Escreve os dados atualizados no arquivo JSON
    writeData(data);
    // Envia o novo item como resposta JSON com status 201 (Criado)
    res.status(201).json(newItem);
});


// Inicia o servidor e exibe uma mensagem no console
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});