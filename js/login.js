let arrayTemporal = [];

function login(usuario, password) {
    usuario = document.getElementById('usuario').value;
    password = document.getElementById('password').value;
    cargaDeDatos(usuario, password);
}

// function cargaDeDatos(usuario, password) {
//     console.log('carga de datos función');
//     console.log('Usuario introducido: ' + usuario);
//     console.log('Password introducida: ' + password)
//     leerJson().then(() => {
//       for (let i = 0; i < arrayTemporal.length; i++) {
//         let idUser = arrayTemporal[i].idUser;
//         let user = arrayTemporal[i].user;
//         let pass = arrayTemporal[i].pass;
//         console.log('ID User: ' + idUser);
//         console.log('Usuario: ' + user);
//         console.log('Password: ' + pass);
//         console.log('Usuario introducido: ' + usuario);
//         console.log('Password introducida: ' + password)
//         alert('STOP');
//       }
//     })
   
//   }

  function cargaDeDatos(usuario, password) {
    console.log('carga de datos función');
    console.log('Usuario introducido: ' + usuario);
    console.log('Password introducida: ' + password)
    leerJson().then(() => {
      for (let i = 0; i < arrayTemporal.length; i++) {
        let idUser = arrayTemporal[i].idUser;
        let user = arrayTemporal[i].user;
        let pass = arrayTemporal[i].pass;
        console.log('ID User: ' + idUser);
        console.log('Usuario: ' + user);
        console.log('Password: ' + pass);
        console.log('Usuario introducido: ' + usuario);
        console.log('Password introducida: ' + password)
        alert('STOP');
      }
    })
   
  }


  async function leerJson() {
    try {
        const rutaJson = "json/datos.json";
        console.log('Iniciando lectura de datos');
        const response = await fetch(rutaJson);
        const responseData = await response.json();
        arrayTemporal.length = 0;
        arrayTemporal = [...responseData.usuarios];
        console.log('Array temporal:', arrayTemporal);
    } catch (error) {
        console.error('Error en lectura de datos:', error);
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
