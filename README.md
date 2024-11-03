# Trabalho-ProgWeb
ENTREGA 2 HMTL 
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de Filme</title>
</head>
<body>
    <div style="display: flex; height: 100vh; background-color: #f0f0f5;">
        <nav style="width: 250px; background-color: #2d2a4a; color: white; padding: 20px;">
            <h1>Tickets.com</h1>
            <ul style="list-style: none; padding: 0;">
                <li style="display: flex; align-items: center; margin-top: 15px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/412/412836.png" alt="Ícone Filmes" style="width: 20px; height: 20px; margin-right: 10px;">
                    <a href="#" style="color: white; text-decoration: none;">Filmes</a>
                </li>
                <li style="display: flex; align-items: center; margin-top: 15px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/33/33308.png" alt="Ícone Funcionários" style="width: 20px; height: 20px; margin-right: 10px;">
                    <a href="#" style="color: white; text-decoration: none;">Funcionários</a>
                </li>
                <li style="display: flex; align-items: center; margin-top: 15px;">
                    <img src="https://cdn.icon-icons.com/icons2/2518/PNG/512/adjustments_horizontal_icon_151643.png" alt="Ícone Painel de Controle" style="width: 20px; height: 20px; margin-right: 10px;">
                    <a href="#" style="color: white; text-decoration: none;">Painel de Controle</a>
                </li>
                <li style="display: flex; align-items: center; margin-top: 15px;">
                    <img src="https://icons.veryicon.com/png/o/education-technology/library-icon/system-log-2.png" alt="Ícone Logs" style="width: 20px; height: 20px; margin-right: 10px;">
                    <a href="#" style="color: white; text-decoration: none;">Logs</a>
                </li>
            </ul>
        </nav>

        <main style="flex: 1; padding: 20px;">
            <header style="display: flex; justify-content: space-between; align-items: center; background-color: #3e3b6c; color: white; padding: 10px;">
                <input type="text" placeholder="Pesquisar um ingresso" style="width: 300px; padding: 8px; border-radius: 4px;">

                <div style="display: flex; align-items: center;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1182/1182718.png" alt="Ícone Notificação" style="width: 20px; height: 20px; margin-right: 10px;">
                    <img src="https://avatars.githubusercontent.com/u/134342470?v=4" alt="Perfil" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 8px;">
                    <span style="font-size: 0.9em;">Bruno Henrique</span> | <span style="font-size: 0.9em;">Administrador</span>
                </div>
            </header>

            <section style="margin-top: 20px;">
                <h2>Consultar Filme</h2>
                <form id="form-consulta" style="display: flex; gap: 10px;">
                    <input type="text" id="nomeFilme" name="nomeFilme" placeholder="Digite o nome do filme" style="padding: 8px; width: 100%;">
                    <button type="submit" style="padding: 8px; background-color: #3e3b6c; color: white; border: none; cursor: pointer;">Consultar</button>
                </form>
            </section>

            <section style="margin-top: 20px;">
                <h3>Resultado</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px;">Poster</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Nome</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Ano de Lançamento</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
</body>
</html>
ENTREGA 2 CSS
/* Estilos gerais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f5;
}

/* Menu Lateral */
nav {
    width: 250px;
    background-color: #2d2a4a;
    color: white;
    padding: 20px;
}

nav h1 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

nav ul {
    list-style: none;
}

nav ul li {
    margin-bottom: 10px;
}

nav ul li a {
    color: white;
    text-decoration: none;
}

/* Cabeçalho */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #3e3b6c;
    color: white;
    padding: 10px;
}

header input {
    width: 300px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

/* Seção principal */
main {
    flex: 1;
    padding: 20px;
}

section h2, section h3 {
    margin-bottom: 10px;
}

#form-consulta {
    display: flex;
    gap: 10px;
}

#form-consulta input {
    padding: 8px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
}

#form-consulta button {
    padding: 8px;
    background-color: #3e3b6c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

#form-consulta button:hover {
    background-color: #5c5a91;
}

/* Tabela de Resultados */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    background-color: #f0f0f5;
}

td.status-ativo {
    color: green;
}

td.status-inativo {
    color: red;
}

button.editar {
    padding: 5px;
    background-color: #3e3b6c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

button.editar:hover {
    background-color: #5c5a91;
}
ENTREGA 2 JS
document.getElementById("form-consulta").addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeFilme = document.getElementById("nomeFilme").value;

    const dados = {
        nomeFilme: nomeFilme
    };

    fetch("URL_DO_BACKEND", {
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
});

