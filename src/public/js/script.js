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
                cellAcoes.appendChild(btnEditar);

                const btnRemovar = document.createElement("button");
                btnRemovar.textContent = "Remover";
                btnRemovar.classList.add("remover");
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

// Adiciona o evento de submit no formulário
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form-consulta").addEventListener("submit", consultarFilmes);
});