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
      let idenUser = arrayTemporal[i].idUser;
      let email = arrayTemporal[i].mail;
      let pass = arrayTemporal[i].pass;
      let nombreUser = arrayTemporal[i].nombreUser;
      let apellidosUser = arrayTemporal[i].apellidosUser;
      console.log('ID User: ' + idenUser);
      console.log('Usuario: ' + email);
      console.log('Password: ' + pass);
      console.log('Nombre usuario: ' + nombreUser);
      console.log('Apellido usuario: ' + apellidosUser);
      if (correo === email && contrasena === pass) {
        codificarUrl(idenUser, nombreUser, apellidosUser);
        // window.location.href = `/src/tareas.html?&idUser=${idenUser}&nombreUser=${nombreUser}&apellidosUser=${apellidosUser}`;
      }
      alert('STOP');
    }
  })

}

function codificarUrl(idenUser, nombreUser, apellidosUser) {
  const idenUserCodificado = encodeURIComponent(idenUser);
  const nombreUserCodificado = encodeURIComponent(nombreUser);
  const apellidosUserCodificado = encodeURIComponent(apellidosUser);
  console.log(idenUserCodificado + ' ' + nombreUserCodificado + ' ' + apellidosUserCodificado);
  const url = `/src/tareas.html?&idUser=${idenUserCodificado}&nombreUser=${nombreUserCodificado}&apellidosUser=${apellidosUserCodificado}`;
  window.location.href = url;
  console.log(window.location.href);
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

function ventanaPrincipal() {

  }
  