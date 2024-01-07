const rutaJson = "json/datos.json";
let arrayTemporal = [];

function login() {
    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;
    if (contrasena === '' || correo === '') {
      return;
    }
    console.log('Usuario introducido: ' + correo);
    console.log('Password introducida: ' + contrasena);
    cargaDeDatos(correo, contrasena);
}

function cargaDeDatos(correo, contrasena) {
    console.log('carga de datos función');
    leerJson().then(() => {
      for (let i = 0; i < arrayTemporal.length; i++) {
        let idUser = arrayTemporal[i].idUser;
        let email = arrayTemporal[i].mail;
        let pass = arrayTemporal[i].pass;
        console.log('ID User: ' + idUser);
        console.log('Usuario: ' + email);
        console.log('Password: ' + pass);
        if (correo === email && contrasena === pass){
          window.location.href = `/src/tareas.html?idUser=${idUser}&nombreUser=${nombreUser}&apellidoUser=${apellidoUser}`;
        }
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
        console.log('Array temporal:', arrayTemporal [0]);
        alert('WORK IT');
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


function inicio() {
  leerInicio().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      let idUser = arrayTemporal[i].idUser;
    }
  })
}

async function leerInicio() {
  try {
      const response = await fetch(rutaJson);
      const responseData = await response.json();
      arrayTemporal.length = 0;
      arrayTemporal = [...responseData.usuarios];
      console.log('Array temporal:', arrayTemporal);
  } catch (error) {
      console.error('Error en lectura de datos:', error);
      alert('STOP CATCH');
  }
}