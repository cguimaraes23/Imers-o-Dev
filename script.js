// Declara as variáveis no escopo global. Elas serão atribuídas depois que o DOM carregar.
let cardContainer;
let campoBusca;
let dados = [];

async function carregarDados() {
    // Se os dados já foram carregados, não faz nada.
    if (dados.length > 0) return;
    
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Erro ao carregar o arquivo data.json:", error);
        if(cardContainer) {
            cardContainer.innerHTML = "<p>Erro ao carregar os dados. Tente novamente mais tarde.</p>";
        }
    }
}

function buscar() {
    // Se o campo de busca não existir, não faz nada.
    if (!campoBusca) return;

    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(dado => {
        const nome = dado.nome.toLowerCase();
        const local = dado.local.toLowerCase();
        const descricao = dado.descricao.toLowerCase();
        const tags = dado.tags.join(" ").toLowerCase(); // Junta as tags em uma string
        return nome.includes(termoBusca) || descricao.includes(termoBusca) || local.includes(termoBusca) || tags.includes(termoBusca);
    });
 
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    // Se o container dos cards não existir, não faz nada.
    if (!cardContainer) return;

    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos

    if (dados.length === 0) {
        cardContainer.innerHTML = `
            <div class="card-vazio">
                <h2>Nenhum resultado encontrado</h2>
                <p>Tente pesquisar por outro termo.</p>
            </div>`;
        return;
    }
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        // Adiciona a imagem do logo se ela existir nos dados
        const logoHtml = dado.logo ? `<img src="${dado.logo}" alt="Logo de ${dado.nome}" class="card-logo">` : '';

        article.innerHTML = `
        ${logoHtml}
        <div class="card-content">
            <h2>${dado.nome}</h2>
            <p><strong>Local:</strong> ${dado.local}</p>
            <p>${dado.descricao}</p>
            <div class="comodidades">
                <p><strong>Tomadas:</strong> ${dado.comodidades.tomadas}</p>
                <p><strong>Wi-Fi:</strong> ${dado.comodidades.wifi}</p>
                <p><strong>Ruído:</strong> ${dado.comodidades.ruido}</p>
            </div>
            <a href="${dado.link}" target="_blank" class="btn-visitar">Confira nosso instagram</a>
        </div>
        `;
        cardContainer.appendChild(article);
    }
}
 
// Adiciona um "ouvinte" que espera o HTML da página ser completamente carregado
// antes de executar o código de inicialização.
document.addEventListener("DOMContentLoaded", () => {
    // Agora que o DOM está pronto, podemos selecionar os elementos com segurança.
    cardContainer = document.querySelector(".card-container");
    campoBusca = document.querySelector("#campo-busca");

    // Carrega os dados iniciais para exibir os cards.
    carregarDados();

    // Adiciona o listener apenas se o campo de busca existir.
    if (campoBusca) {
        campoBusca.addEventListener("keyup", buscar);
    } else {
        console.warn("Elemento com id='campo-busca' não foi encontrado. A funcionalidade de busca está desativada.");
    }
});
