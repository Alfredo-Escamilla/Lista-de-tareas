const rutaJson = "/json/datos.json";
let array = [];
let longitudArray;

function create(){
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const usuario = {
        id: 1000,
        nombreUser: nombre,
        apellidosUser: apellidos,
        mail: email,
        pass: password
      }
    console.log(usuario);
    comprobarCorreo(email);
    guardarDatos(usuario);
    
}

function comprobarCorreo(email) {
  leerValoresUsuarios().then(() => {
    for (let i = 0; i < array.length; i++) {
      if (email === array[i].mail) {
        alert('Este correo ya existe. Prueba con otro');
        retornoCreate();
      }
    }
  })
}

function guardarDatos(usuario) {
    array = [];
    leerValoresUsuarios().then(() => {
      longitudArray = array.length;
      console.log('Longitud Array: ' + longitudArray);
      console.log('Usuario: ' + usuario.nombreUser);
      usuario.id = ++longitudArray;
      console.log('Siguiente Id: ' + usuario.id);
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
      retornoHome();
    } catch (error) {
      console.log('error: '+ error);
    }
  }
  
  function retornoHome() {
    window.location.href = `/index.html`;
    }

    function retornoCreate() {
      window.location.href = '/src/crearusuario.html';
    }