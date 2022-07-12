let serieId = localStorage.getItem("serieId");
fetch('http://127.0.0.1:3000/api/serie/' + serieId, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'GET'
})
    .then(res => { return res.json() })
    .then(data => {
        if (data.res == "ok") {
            let serie = data.data;
            console.log(serie);
            let div = document.createElement("div");
            div.className = "serie";
            localStorage.setItem("serieId", serie.serieId);
            div.innerHTML = `
                <div class="portada">
            <img src="${serie.path}" alt="imagen.jpg">
        </div>
        <div class="informacion">
            <div class="agregar">
                <button>
                    <img src="../img/logo/plus.png" alt="plus.png">
                </button>
            </div>
            <div class="detalle" id="series">
                <h1 class="titulo" id="titulo">Título: ${serie.nombreSerie}</h1>
                <h1 class="descrip" id="descrip">Descripción:</h1>
                <p class="descripcion" id="descripcion"> ${serie.descripcion}</p>
            </div>
        </div>
                `;
            document.getElementById("contenido").appendChild(div);
        }
    });



fetch('http://127.0.0.1:3000/api/serie/temporadas/' + serieId, {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'GET'
})
    .then(res => { return res.json() })
    .then(data => {
        if (data.res == "ok") {
            let episodios = data.data;
            console.log(episodios);
            for (let i = 0; i < episodios.length; i++) {
                let div = document.createElement("div");
                div.className = "episodios";
                div.innerHTML = `
            <h3 id="${episodios[i].temporadaId}">
                <span>${i + 1}</span>
                ${episodios[i].nombreTemporada}
            </h3>
                `;
                document.getElementById("temporada").appendChild(div);
                document.getElementById(episodios[i].temporadaId).addEventListener("click", function () {
                    e.preventDefault();
                    temporada(episodios[i].temporadaId);
                });
            }
        }
    });

function temporada(temporadaId) {
    fetch('http://127.0.0.1:3000/api/temporada/episodios/' + temporadaId, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })
        .then(res => { return res.json() })
        .then(data => {
            if (data.res == "ok") {
                let episodios = data.data;
                console.log(episodios);
                for (let i = 0; i < episodios.length; i++) {
                    let div = document.createElement("div");
                    div.className = "temporadas";
                    div.innerHTML = `
                <h3>
                    <span>${i + 1}</span>
                    ${episodios[i].nombreTemporada}
                </h3>
                    `;
                    document.getElementById("temporada").appendChild(div);
                }
            }
        });

}
