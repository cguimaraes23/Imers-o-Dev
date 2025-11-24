// Pega o elemento da seção onde os cards serão inseridos
const listaCafes = document.getElementById('lista-cafes');

// Função para criar e exibir os cards
function exibirCafes() {
    let htmlDosCafes = ''; // String para acumular o HTML de todos os cards

    // Laço for para percorrer a lista de dados
    for (let i = 0; i < dados.length; i++) {
        // Monta o HTML de cada card usando Template String
        htmlDosCafes += `
            <div class="card">
                <div class="card-content">
                    <h2>${dados[i].titulo}</h2>
                    <p>${dados[i].descricao}</p>
                    <p class="tags">${dados[i].tags}</p>
                    <a href="${dados[i].link}" target="_blank">Visitar Instagram</a>
                </div>
            </div>
        `;
    }

    // Insere o HTML acumulado na seção
    listaCafes.innerHTML = htmlDosCafes;
}

// Chama a função para que os cafés sejam exibidos ao carregar a página
exibirCafes();