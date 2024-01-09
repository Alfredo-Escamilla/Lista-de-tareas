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
        let correoExistente = true;
        console.log('array: ');
        console.log(array);
        for (let i = 0; i < array.length; i++) {
            if (email === array[i].mail) {
                correoExistente = false;
                console.log(array);
                array[i].mail === email;
                array[i].pass === password;
                console.log('Datos nuevos:');
                console.log(array[i].mail + ' ' + array[i].pass);
                console.log('Id: ');
                console.log(array[i].id);
                let id = array[i].id;
                guardarDatosEnJson(array, id);
                break; // No es necesario seguir buscando una vez encontrado el correo
            }
        }

        if (correoExistente) {
            alert('Este correo no exite es nuestro sistema.');
            retornoRecovery();
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

function retornoRecovery() {
    window.location.href = '/src/recuperarpass.html';
}

async function guardarDatosEnJson(array, id) {
    console.log('array:');
    console.log(array);
    console.log('ID:');
    console.log(id);
    console.log('Array[id]');
    console.log(array[--id]);
    alert('stop in the name of love')
    const rutaJsonDeVuelta = `http://localhost:3000/usuarios/${++id}`;
    try {
      const responseVuelta = await fetch(rutaJsonDeVuelta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(array[--id]),
      });
      window.alert('Contraseña regenerada. Inicia sesión.')
      retornoHome();
    } catch (error) {
      console.log('error: '+ error);
    }
  }
