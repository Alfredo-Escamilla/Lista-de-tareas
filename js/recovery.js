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
                let nombre = array[i].nombreUser;
                let apellido = array[i].apellidosUser
                let id = array[i].id;
                console.log('Datos después de modificar los datos del objeto');
                console.log('array[i].mail: ');
                console.log(array[i].mail);
                console.log('array[i].password: ');
                console.log(array[i].password);
                console.log('Valor de id: ' + id);
                actualizarJson(id, email, password,nombre, apellido);
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


  async function actualizarJson(id, email, password,nombre, apellido) {
    const apiUrl = `http://127.0.0.1:3000/usuarios/${id}`;
    const usuario = {
        id: id,
        nombreUser: nombre,
        apellidosUser: apellido,
        mail: email,
        pass: password
    }
    try {
      const responseVuelta = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
    } catch (error) {
      alert('Error: ' + console.log(error));
    }
  }


  function retornoRecovery() {
    window.location.href = '/src/recuperarpass.html';
}