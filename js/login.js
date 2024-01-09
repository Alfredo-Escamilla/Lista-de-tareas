const rutaJson = "/json/datos.json";
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
      let idenUser = arrayTemporal[i].id;
      let email = arrayTemporal[i].mail;
      let pass = arrayTemporal[i].pass;
      let nombreUser = arrayTemporal[i].nombreUser;
      if (correo === email && contrasena === pass) {
        // codificarUrl(idenUser, nombreUser);
        window.location.href = `/src/tareas.html?&id=${idenUser}&nombreUser=${nombreUser}`;
      }
      // alert('STOP');
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
    alert('WORK IT');
  } catch (error) {
    console.error('Error en lectura de datos:', error);
    alert('STOP CATCH');

  }
}

function inicio() {
  leerInicio().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      let id = arrayTemporal[i].id;
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

function crearCuenta() {
  window.location.href = `/src/crearusuario.html`;
  }

  function recuperarPassword() {
    window.location.href = `/src/recuperarpass.html`;
  }


// function codificarUrl(idenUser, nombreUser) {
//   const idenUserCodificado = encodeURIComponent(idenUser);
//   console.log(idenUserCodificado + ' ' + nombreUserCodificado + ' ' + apellidosUserCodificado);
//   const url = `/src/tareas.html?&id=${idenUserCodificado}&nombreUser=${nombreUserCodificado}&apellidosUser=${apellidosUserCodificado}`;
//   window.location.href = url;
//   console.log(window.location.href);
// }

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

