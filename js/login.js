const rutaJson = "json/datos.json";
let arrayTemporal = [];

function login(usuario, password) {
    usuario = document.getElementById('usuario').value;
    password = document.getElementById('password').value;
    console.log('Usuario introducido: ' + usuario);
    console.log('Password introducida: ' + password);
    cargaDeDatos();
}

function cargaDeDatos() {
    console.log('carga de datos función');
    leerJson().then(() => {
      for (let i = 0; i < arrayTemporal.length; i++) {
        let idUser = arrayTemporal[i].idUser;
        let user = arrayTemporal[i].user;
        let pass = arrayTemporal[i].pass;
        console.log('ID User: ' + idUser);
        console.log('Usuario: ' + user);
        console.log('Password: ' + pass);
        alert('STOP');
      }
    })
   
  }

  async function leerJson() {
    try {
        console.log('Iniciando lectura de datos');
        const response = await fetch(rutaJson);
        const responseData = await response.json();
        arrayTemporal.length = 0;
        arrayTemporal = [...responseData.usuarios];
        console.log('Array temporal:', arrayTemporal[0]);
    } catch (error) {
        console.error('Error en lectura de datos:', error);
        alert('STOP CATCH');

    }
}

//   function leerJson() {
//     return new Promise(async (resolve) => {
//       try {
//         const response = await fetch(rutaJson);
//         const responseData = await response.json();
//         arrayTemporal.length = 0;
//         arrayTemporal = [...responseData.usuarios];
//         console.log('Array temporal: ' + arrayTemporal);
//         resolve()
//       } catch (error) {
//         console.error('Error en lectura de datos');
//       }
//     })
//   }
