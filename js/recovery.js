//
// Proceso de restauración de contraseña
//

const rutaJson = "/json/datos.json";
let array = [];

function retornoHome() {
    window.location.href = `/index.html`;
}

function recovery() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    comprobarCorreo(email, password)
}

function comprobarCorreo(email, password) {
    leerValoresUsuarios().then(() => {
        for (let i = 0; i < array.length; i++) {
            if (email === array[i].mail) {
                console.log('Array dentro del IF');
                console.log(array);
                console.log('email: ' + email);
                console.log('password: ' + password)
                array[i].mail = email;
                array[i].pass = password;
                let id = array[i].id;
                console.log('Datos después de modificar los datos del objeto');
                console.log('array[i].mail: ');
                console.log(array[i].mail);
                console.log('array[i].password: ');
                console.log(array[i].password);
                console.log('Valor de id: ' + id);
                guardarDatosEnJson(array, id);
                break; // No es necesario seguir buscando una vez encontrado el correo
            }
        }
    });
}

function leerValoresUsuarios() {
    return new Promise(async (resolve) => {
        try {
            const response = await fetch(rutaJson);
            const responseData = await response.json();
            array = [...responseData.usuarios];
            resolve()
        } catch (error) {
            console.log(error);
        }
    })
}

async function guardarDatosEnJson(array, id) {
    console.log('Gaurdar Json valor de array:');
    console.log(array);
    console.log('ID:');
    console.log(id);
    console.log('Array[id]');
    alert('stop in the name of love')
    const rutaJsonDeVuelta = `http://localhost:3000/usuarios/${id}`;
    id--;
    try {
      const responseVuelta = await fetch(rutaJsonDeVuelta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(array),
      });
      window.alert('Contraseña regenerada. Inicia sesión.')
      retornoHome();
    } catch (error) {
      console.log('error: '+ error);
    }
  }


  function retornoRecovery() {
    window.location.href = '/src/recuperarpass.html';
}