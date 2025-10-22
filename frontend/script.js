const produtosLista = document.getElementById('produtos-lista');
const formAdicionar = document.getElementById('form-adicionar');
carregarProdutos();

function carregarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(produtos => {
            produtosLista.innerHTML = '';
            produtos.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nome} - R$ ${produto.preco} - ${produto.descricao}`;
                const botaoExcluir = document.createElement('button');
                botaoExcluir.textContent = 'Excluir';
                botaoExcluir.onclick = () => excluirProduto(produto.id);
                li.appendChild(botaoExcluir);
                produtosLista.appendChild(li);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

formAdicionar.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value); // usei parsefloat como teste. mas basicamente ele pega uma string e transforma num numero de verdade.
    const descricao = document.getElementById('descricao').value;     // só dar uma olhada no server que tu vai ver lá como que o preco ta como string

    const novoProduto = { nome, preco, descricao };

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoProduto),
    })
    .then(response => response.json())
    .then(produto => {
        carregarProdutos();
    })
    .catch(error => console.error('Erro ao adicionar produto:', error));
});

function excluirProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
        carregarProdutos();
    })
    .catch(error => console.error('Erro ao excluir produto:', error));
}