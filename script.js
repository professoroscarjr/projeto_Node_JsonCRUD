// Obtém uma referência ao elemento do formulário com o ID 'itemForm'
const itemForm = document.getElementById('itemForm');

// Obtém uma referência ao elemento da lista não ordenada (<ul>) com o ID 'itemList'
const itemList = document.getElementById('itemList');

// Função para buscar e exibir os itens
function fetchItems() {
    // Faz uma requisição GET para o endpoint '/items'
    fetch('/items')
        // Quando a resposta é recebida, analisa o corpo da resposta como JSON
        .then(response => response.json())
        // Quando os dados JSON são analisados, executa o seguinte bloco de código
        .then(data => {
            // Limpa o conteúdo da lista de itens (remove todos os itens existentes)
            itemList.innerHTML = '';
            // Itera sobre cada item no array de dados recebido do servidor
            data.forEach(item => {
                // Cria um novo elemento <li> (item de lista)
                const li = document.createElement('li');
                // Define o texto do elemento <li> como a concatenação do nome e descrição do item
                li.textContent = `${item.nome} - ${item.descricao} - R$ ${item.valor}`;
                // Adiciona o elemento <li> à lista de itens
                itemList.appendChild(li);
            });
        });
}

// Função para adicionar um novo item
// Adiciona um ouvinte de evento 'submit' ao formulário 'itemForm'
itemForm.addEventListener('submit', (event) => {
    // Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    const nome = document.getElementById('nome').value;// Obtém o valor do campo de entrada 'nome'
    const descricao = document.getElementById('descricao').value; // Obtém o valor do campo de entrada 'descricao'
    const valor = document.getElementById('valor').value; // Obtém o valor do campo de entrada 'valor'

    // Faz uma requisição POST para o endpoint '/items'
    fetch('/items', {
        // Define o método HTTP como POST
        method: 'POST',
        // Define os cabeçalhos da requisição, especificando que o conteúdo é JSON
        headers: {
            'Content-Type': 'application/json'
        },
        // Converte o objeto { nome, descricao } em uma string JSON e define como o corpo da requisição
        body: JSON.stringify({ nome, descricao, valor })
    })
        // Quando a resposta é recebida, analisa o corpo da resposta como JSON
        .then(response => response.json())
        // Quando os dados JSON são analisados, executa o seguinte bloco de código
        .then(data => {
            // Chama a função fetchItems() para atualizar a lista de itens na página
            fetchItems();
            // Reseta o formulário, limpando os campos de entrada
            itemForm.reset();
        });
});

// Chama a função fetchItems() para carregar os itens quando a página é carregada
fetchItems();