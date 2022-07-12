let usuario;
let contraseña;
let ti;
let submit;
let id;
usuario = document.getElementById("usuario");
contraseña = document.getElementById("password");
submit = document.getElementById("submit");

submit.addEventListener("click", async function (e) {
    e.preventDefault();
    if (validarFormulario() == true) {
        return;
    }
    await fetch('http://127.0.0.1:3000/api/usuario/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            username: usuario.value,
            password: contraseña.value
        })
    })
        .then(res => { return res.json() })
        .then(data => {
            // console.log(data);
            if (data.res == "ok") {
                alert("Bienvenido " + data.usuario.nombreCompleto);
                if (data.usuario.tipoUsuario == "Administrador") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "plataforma.html";
                }
            }
        });
});


function validarFormulario() {
    bandera = false;
    if (usuario.value.trim() === "") {
        document.getElementById("validarUser").style.display = "block";
        bandera = true;
    }
    if (contraseña.value.trim() === "" || contraseña.value.length < 6) {
        document.getElementById("validarPass").style.display = "block";
        bandera = true;
    }
    return bandera;
}


