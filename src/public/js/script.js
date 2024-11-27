// função para filtrar filmes
function filtrarFilmes(event) {
    event.preventDefault();

    const filtroNome = document.getElementById("filtroNome").value;
    const filtroStatus = document.getElementById("filtroStatus").value;
    const filtroAno = document.getElementById("filtroAno").value;

    const queryParams = new URLSearchParams();

    if (filtroNome) queryParams.append("nomeFilme", filtroNome);
    if (filtroStatus) queryParams.append("status", filtroStatus);
    if (filtroAno) queryParams.append("anoLancamento", filtroAno);

    fetch(`http://localhost:3000/api/movies/filter?${queryParams.toString()}`)
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector("table tbody");
            tbody.innerHTML = ""; // Limpa o corpo da tabela

            if (data.filmes && data.filmes.length > 0) {
                data.filmes.forEach(filme => {
                    const row = document.createElement("tr");

                    // Coluna do Poster
                    const cellPoster = document.createElement("td");
                    const imgPoster = document.createElement("img");
                    imgPoster.src = filme.poster;
                    imgPoster.alt = filme.nome;
                    imgPoster.style.width = "50px";
                    cellPoster.appendChild(imgPoster);
                    row.appendChild(cellPoster);

                    // Coluna do Nome
                    const cellNome = document.createElement("td");
                    cellNome.textContent = filme.nome;
                    row.appendChild(cellNome);

                    // Coluna do Ano de Lançamento
                    const cellAno = document.createElement("td");
                    cellAno.textContent = filme.ano_lancamento;
                    row.appendChild(cellAno);

                    // Coluna do Status
                    const cellStatus = document.createElement("td");
                    cellStatus.textContent = filme.status ? "Ativo" : "Inativo";
                    cellStatus.classList.add(filme.status ? "status-ativo" : "status-inativo");
                    row.appendChild(cellStatus);

                    // Coluna das Ações (Editar/Remover)
                    const cellAcoes = document.createElement("td");

                    const btnEditar = document.createElement("button");
                    btnEditar.textContent = "Editar";
                    btnEditar.classList.add("editar");
                    btnEditar.addEventListener("click", () => abrirPaginaEditar(filme));
                    cellAcoes.appendChild(btnEditar);

                    const btnRemover = document.createElement("button");
                    btnRemover.textContent = "Remover";
                    btnRemover.classList.add("remover");
                    btnRemover.addEventListener("click", () => removerFilme(filme.id));
                    cellAcoes.appendChild(btnRemover);

                    row.appendChild(cellAcoes);

                    // Adiciona a linha na tabela
                    tbody.appendChild(row);
                });
            } else {
                // Exibe mensagem caso nenhum filme seja encontrado
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.colSpan = 5; // Define o colspan para ocupar todas as colunas
                cell.textContent = "Nenhum filme encontrado.";
                row.appendChild(cell);
                tbody.appendChild(row);
            }
        })
        .catch(error => {
            console.error("Erro ao filtrar filmes:", error);
        });
}


// Adicionar evento ao formulário de filtro
document.addEventListener("DOMContentLoaded", () => {
    const formFiltro = document.getElementById("form-filtro");
    if (formFiltro) {
        formFiltro.addEventListener("submit", filtrarFilmes);
    }
});

// Adicionar evento para exibir filtro
document.addEventListener("DOMContentLoaded", () => {
    const btnMostrarFiltro = document.getElementById("btn-filtrar");
    const formFiltro = document.getElementById("form-filtro");

    btnMostrarFiltro.addEventListener("click", () => {
        // Alterna a exibição do formulário
        if (formFiltro.style.display === "none") {
            formFiltro.style.display = "block"; // Exibe o formulário
        } else {
            formFiltro.style.display = "none"; // Oculta o formulário
        }
    });
});

// Função para carregar todos os filmes
function carregarFilmes() {
    fetch("http://localhost:3000/api/moviesTodos", {
        method: "GET",
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; // Limpa a tabela

        if (data.filmes && data.filmes.length > 0) {
            data.filmes.forEach(filme => {
                const row = document.createElement("tr");

                const cellPoster = document.createElement("td");
                const imgPoster = document.createElement("img");
                imgPoster.src = filme.poster;
                imgPoster.alt = filme.nome;
                imgPoster.style.width = "50px";
                cellPoster.appendChild(imgPoster);
                row.appendChild(cellPoster);

                const cellNome = document.createElement("td");
                cellNome.textContent = filme.nome;
                row.appendChild(cellNome);

                const cellAno = document.createElement("td");
                cellAno.textContent = filme.ano_lancamento;
                row.appendChild(cellAno);

                const cellStatus = document.createElement("td");
                cellStatus.textContent = filme.status ? "Ativo" : "Inativo";
                cellStatus.classList.add(filme.status ? "status-ativo" : "status-inativo");
                row.appendChild(cellStatus);

                const cellAcoes = document.createElement("td");

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.classList.add("editar");
                btnEditar.addEventListener("click", () => abrirPaginaEditar(filme));
                cellAcoes.appendChild(btnEditar);

                const btnRemover = document.createElement("button");
                btnRemover.textContent = "Remover";
                btnRemover.classList.add("remover");
                btnRemover.addEventListener("click", () => removerFilme(filme.id)); 
                cellAcoes.appendChild(btnRemover);

                row.appendChild(cellAcoes);

                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 5;
            cell.textContent = "Nenhum filme encontrado.";
            row.appendChild(cell);
            tbody.appendChild(row);
        }
    })
    .catch(error => {
        console.error("Erro ao carregar filmes:", error);
    });
}

// Carregar os filmes ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;

    // Carregar filmes apenas na página /moviesTodos
    if (currentPath === "/moviesTodos") {
        carregarFilmes();
    }

    const formConsulta = document.getElementById("form-consulta");
    if (formConsulta) {
        formConsulta.addEventListener("submit", consultarFilmes);
    }

    const formAdicionarFilme = document.getElementById("form-adicionar-filme");
    if (formAdicionarFilme) {
        formAdicionarFilme.addEventListener("submit", handleAdicionarFilme);
    }

    const formEditarFilme = document.getElementById("form-editar-filme");
    if (formEditarFilme) {
        const filme = JSON.parse(localStorage.getItem("filmeParaEditar"));

        if (filme) {
            document.getElementById("id").value = filme.id;
            document.getElementById("nome").value = filme.nome;
            document.getElementById("anoLancamento").value = filme.anoLancamento;
            document.getElementById("poster").value = filme.poster;
            document.getElementById("status").value = filme.status;
        }

        formEditarFilme.addEventListener("submit", handleEditarFilme);
    }
});

// Função para consultar os filmes no banco de dados
function consultarFilmes(event) {
    event.preventDefault(); 

    const nomeFilme = document.getElementById("nomeFilme").value;

    const dados = {
        nomeFilme: nomeFilme
    };

    fetch("http://localhost:3000/api/movies/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        const tbody = document.querySelector("table tbody");
        tbody.innerHTML = ""; 

        if (data.filmes && data.filmes.length > 0) {
            data.filmes.forEach(filme => {
                const row = document.createElement("tr");

                const cellPoster = document.createElement("td");
                const imgPoster = document.createElement("img");
                imgPoster.src = filme.poster;
                imgPoster.alt = filme.nome;
                imgPoster.style.width = "50px";
                cellPoster.appendChild(imgPoster);
                row.appendChild(cellPoster);

                const cellNome = document.createElement("td");
                cellNome.textContent = filme.nome;
                row.appendChild(cellNome);

                const cellAno = document.createElement("td");
                cellAno.textContent = filme.anoLancamento;
                row.appendChild(cellAno);

                const cellStatus = document.createElement("td");
                cellStatus.textContent = filme.status;
                cellStatus.classList.add(filme.status === "Ativo" ? "status-ativo" : "status-inativo");
                row.appendChild(cellStatus);

                const cellAcoes = document.createElement("td");

                const btnEditar = document.createElement("button");
                btnEditar.textContent = "Editar";
                btnEditar.classList.add("editar");
                btnEditar.addEventListener("click", () => abrirPaginaEditar(filme));
                cellAcoes.appendChild(btnEditar);

                const btnRemover = document.createElement("button");
                btnRemover.textContent = "Remover";
                btnRemover.classList.add("remover");
                btnRemover.addEventListener("click", () => removerFilme(filme.id)); 
                cellAcoes.appendChild(btnRemover);

                row.appendChild(cellAcoes);

                tbody.appendChild(row);
            });
        } else {
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 5;
            cell.textContent = "Filme não encontrado.";
            row.appendChild(cell);
            tbody.appendChild(row);
        }
    })
    .catch(error => {
        console.error("Erro ao consultar o filme:", error);
    });
}

// Função para remover um filme
function removerFilme(id) {
    if (confirm("Tem certeza que deseja remover este filme?")) {
        fetch(`http://localhost:3000/api/movies/${id}`, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                consultarFilmes(new Event("submit")); 
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Erro ao remover o filme:", error);
        });
    }
}

// Função para adicionar um filme
function handleAdicionarFilme(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const anoLancamento = document.getElementById("anoLancamento").value;
    const poster = document.getElementById("poster").value;
    const status = document.getElementById("status").value;

    fetch("http://localhost:3000/api/movies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, anoLancamento, poster, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Filme adicionado com sucesso!");
            window.location.href = "/"; // Redireciona para a página inicial
        } else {
            alert("Erro ao adicionar filme: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao adicionar filme:", error);
    });
}

function abrirPaginaEditar(filme) {
    localStorage.setItem("filmeParaEditar", JSON.stringify(filme));
    window.location.href = "/editMovie.html"; 
}

function handleEditarFilme(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const anoLancamento = document.getElementById("anoLancamento").value;
    const poster = document.getElementById("poster").value;
    const status = document.getElementById("status").value;

    fetch(`http://localhost:3000/api/movies/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, anoLancamento, poster, status })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Filme atualizado com sucesso!");
            window.location.href = "/"; // Redireciona para a página inicial
        } else {
            alert("Erro ao editar filme: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao editar filme:", error);
    });
}

function buscarPrecoIngresso() {
    fetch("http://localhost:3000/api/atualizarPreco")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById("precoIngresso").value = data.precoIngresso.toFixed(2);
        }
    })
    .catch(error => {
        console.error("Erro ao buscar preço do ingresso:", error);
    });
}

// Função para atualizar o preço do ingresso
function atualizarPrecoIngresso(event) {
    event.preventDefault();

    const novoPreco = document.getElementById("precoIngresso").value;

    fetch("http://localhost:3000/api/atualizarPreco", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ novoPreco: parseFloat(novoPreco) })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Preço do ingresso atualizado com sucesso!");
        } else {
            alert("Erro: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro ao atualizar preço do ingresso:", error);
        alert("Erro ao atualizar o preço do ingresso");
    });
}

// Adicionar evento no formulário de adicionar filme
document.addEventListener("DOMContentLoaded", () => {
    
    const formConsulta = document.getElementById("form-consulta");
    if (formConsulta) {
        formConsulta.addEventListener("submit", consultarFilmes);
    }

    const formAdicionarFilme = document.getElementById("form-adicionar-filme");
    if (formAdicionarFilme) {
        formAdicionarFilme.addEventListener("submit", handleAdicionarFilme);
    }

    const formEditarFilme = document.getElementById("form-editar-filme");
    if (formEditarFilme) {
        const filme = JSON.parse(localStorage.getItem("filmeParaEditar"));

        if (filme) {
            document.getElementById("id").value = filme.id;
            document.getElementById("nome").value = filme.nome;
            document.getElementById("anoLancamento").value = filme.anoLancamento;
            document.getElementById("poster").value = filme.poster;
            document.getElementById("status").value = filme.status;
        }

        formEditarFilme.addEventListener("submit", handleEditarFilme);
    }

});