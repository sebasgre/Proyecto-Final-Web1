let nombre;
let apellido;
let usuario;
let contraseña;
let submit;
nombre = document.getElementById("nombre");
apellido = document.getElementById("apellido");
usuario = document.getElementById("usuario");
contraseña = document.getElementById("password");
submit = document.getElementById("submit");

submit.addEventListener("click", async function (e) {
    e.preventDefault();
    if (validarFormulario() == true) {
        return;
    }
    await fetch('http://127.0.0.1:3000/api/usuario', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            nombreCompleto: nombre.value + " " + apellido.value,
            username: usuario.value,
            password: contraseña.value,
            tipoUsuario: "Cliente"
        })
    })
        .then(res => { return res.json() })
        .then(data => {
            console.log(data);
            if (data.res == "ok") {
                alert("Cuenta creada exitosamente");
                window.location.href = "login.html";
            }
        });
});


function validarFormulario() {
    bandera = false;
    if (nombre.value.trim() === "") {
        console.log(nombre.value);
        document.getElementById('validarNombre').style.display = "block";
        bandera = true;
    }
    if (apellido.value.trim() === "") {
        document.getElementById("validarApellido").style.display = "block";
        bandera = true;
    }
    if (usuario.value.trim() === "") {
        document.getElementById("validarUsuario").style.display = "block";
        bandera = true;
    }
    if (contraseña.value.length < 6 || contraseña.value.trim() === "") {
        document.getElementById("validarPassword").style.display = "block";
        bandera = true;
    }
    return bandera;
}
