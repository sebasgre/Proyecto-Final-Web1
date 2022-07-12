fetch('http://127.0.0.1:3000/api/serie', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: 'GET',
})
    .then(res => { return res.json() })
    .then(data => {
        if (data.res == "ok") {
            let series = data.data;
            console.log(series);
            for (let i = 0; i < series.length; i++) {
                let serie = series[i];
                let div = document.createElement("div");
                div.className = "serie";
                localStorage.setItem("serieId", serie.serieId);
                div.innerHTML = `
                <div class="card">
                    <a href="../html/detalle.html">
                        <img src="../img/portadas/serie1.jpg" alt="serie1.jpg">
                    </a>
                </div>
                `;
                document.getElementById("series").appendChild(div);
            }
        }
    });
