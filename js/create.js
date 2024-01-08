const rutaJson = "/json/datos.json";
let array = [];
let longitudArray;

function create(){
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const usuario = {
        idUser: 1000,
        nombreUser: nombre,
        apellidosUser: apellidos,
        mail: email,
        pass: password
      }
    console.log(usuario);
    guardarDatos(usuario);
}

function guardarDatos(usuario) {
    array = [];
    leerValoresUsuarios().then(() => {
      longitudArray = array.length;
      console.log('Longitud Array: ' + longitudArray);
      console.log('Usuario: ' + usuario.nombreUser);
      usuario.idUser = ++longitudArray;
      console.log('Siguiente IdUser: ' + usuario.idUser);
      grabarDatosEnJson(usuario);
    })
  }

function leerValoresUsuarios() {
    return new Promise(async (resolve) => {
      try {
        const response = await fetch(rutaJson);
        const responseData = await response.json();
        array = [...responseData.usuarios];
        console.log(array);
        resolve()
      } catch (error) {
        console.log(error);
      }
    })
  }

async function grabarDatosEnJson(usuario) {
    const rutaJsonDeVuelta = 'http://localhost:3000/usuarios';
    try {
      const responseVuelta = await fetch(rutaJsonDeVuelta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
    } catch (error) {
      console.log('error: ' + error);
    }
  }
  
