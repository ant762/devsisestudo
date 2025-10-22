const express = require('express');
const app = express();
const port = 3000;
cors = require('cors')
app.use(cors());

app.use(express.json());

let produtos = [
    { id: 1, nome: 'Produto A', preco: 10.0 },
    { id: 2, nome: 'Produto B', preco: 20.0 },
]

app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.post('/produtos', (req, res) => {
    const { nome, preco, descricao } = req.body;

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco,
        descricao,
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto); 
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;

    produtos = produtos.filter(produto => produto.id !== parseInt(id));
    res.status(200).json({ message: 'Produto excluído com sucesso' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});