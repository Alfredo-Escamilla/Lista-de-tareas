let valorCajaTarea;
let valorCajaNotas;
let indiceArray = 0;
let completada = false;
let eliminada = false;
let nuevaTarea;
let arrayTemporal = [];
let tareaNueva;
let textoTarea;
let tareaId;
const rutaJson = "/json/datos.json";

var url = window.location.href;
var searchParams = new URLSearchParams(url);
var idenUser = searchParams.get('id');
var nombreUser = searchParams.get('nombreUser');

function retornarIndex() {
  window.location.href = `/index.html`;
}

function creacionNuevaTarea(arrayTemporal) {
  let nombreTarea = arrayTemporal.tarea.slice(0, 35).padEnd(35, " ");
  nuevaTarea = document.querySelector("#objetoTarea");
  if (arrayTemporal.usuario === idenUser) {
    if (arrayTemporal.eliminada === true) {
      return;
  }

  if (arrayTemporal.completada === true) {
    let elementos = `
    <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
      <tr>
        <td style="width: 77.56%; background-color: rgb(154, 254, 87);">${nombreTarea}</td>
        <td style="width: 13%; background-color: rgb(154, 254, 87);">
          <button class="finish" onclick="completarTarea(${arrayTemporal.id})"><i class="fa-solid fa-check-double"></i></button> 
          <button class="edit" onclick="editarTarea(${arrayTemporal.id})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" onclick="borrarTarea(${arrayTemporal.id})"><i class="fa-solid fa-box-archive"></i></button>
        </td>
      </tr>
    </table>`;
    nuevaTarea.insertAdjacentHTML("beforeend", elementos);

  } else {
    let elementos = `
  <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
    <tr>
    	<td style="width: 77.56%;">${nombreTarea}</td>
    	<td style="width: 13%;">
    		<button class="finish" onclick="completarTarea(${arrayTemporal.id})"><i class="fa-solid fa-flag-checkered"></i></button> 
    		<button class="edit" onclick="editarTarea(${arrayTemporal.id})"><i class="fa-solid fa-pen-to-square"></i></button>
    		<button class="delete" onclick="borrarTarea(${arrayTemporal.id})"><i class="fa-solid fa-box-archive"></i></button>
    	</td>
    </tr>
  </table>`;
    nuevaTarea.insertAdjacentHTML("beforeend", elementos);
  }
}
}
function tareaCompletada(){
  let elementos = `
    <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
      <tr>
        <td style="width: 77.56%; background-color: rgb(154, 254, 87);">${nombreTarea}</td>
        <td style="width: 13%; background-color: rgb(154, 254, 87);">
          <button class="finish" onclick="completarTarea(${arrayTemporal.id})"><i class="fa-solid fa-check-double"></i></button> 
          <button class="edit" onclick="editarTarea(${arrayTemporal.id})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" onclick="borrarTarea(${arrayTemporal.id})"><i class="fa-solid fa-box-archive"></i></button>
        </td>
      </tr>
    </table>`;
    nuevaTarea.insertAdjacentHTML("beforeend", elementos);
}


function ventanaModal(tarea) {
  const ventanaModal =
    `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
  bis_skin_checked="1">
  <div class="modal-dialog" bis_skin_checked="1">
    <div class="modal-content" bis_skin_checked="1">
      <div class="modal-header" bis_skin_checked="1">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva tarea</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" bis_skin_checked="1">
        <form>
          <div class="mb-3" bis_skin_checked="1">
            <label for="recipient-name" class="col-form-label">Tarea:</label>
            <input type="text" class="form-control" id="cajaTextoTarea" value="${tarea ? tarea.tarea : ''}">
          </div>
          <div class="mb-3" bis_skin_checked="1">
            <label for="message-text" class="col-form-label">Notas:</label>
            <textarea class="form-control" id="cajaTextoNotas">${tarea ? tarea.notas : ''}</textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer" bis_skin_checked="1">
        <button id="buttonCancel" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button id="botonGuardarTarea" type="button" class="btn btn-primary" onclick="${tarea ? `botonActualizarTarea(${tarea.id})` : `botonGuardarTarea()`}" data-bs-dismiss="modal">Guardar
          tarea</button>
      </div>
    </div>
  </div>
</div>`;

  document.body.insertAdjacentHTML("beforeend", ventanaModal);
  // Encuentra el modal que acabas de agregar al DOM
  const modal = document.getElementById("exampleModal");
  // Inicializa el modal utilizando Bootstrap
  const myModal = new bootstrap.Modal(modal);
  myModal.show();
}


function botonGuardarTarea() {
  capturarValoresIntroducidos();
  guardarTareaEnArrayTemporal();
  creacionNuevaTarea(tareaNueva);
  guardarDatosEnJson(tareaNueva);
}

function leerValoresJson() {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(rutaJson);
      const responseData = await response.json();
      arrayTemporal.length = 0;
      arrayTemporal = [...responseData.tareas];
      resolve()
    } catch (error) {
      let errorJson = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
        ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> `;
      nuevaTarea.insertAdjacentHTML("beforeend", errorJson);
    }
  })
}

async function guardarDatosEnJson(tarea) {
  const rutaJsonDeVuelta = "http://localhost:3000/tareas";
  try {
    const responseVuelta = await fetch(rutaJsonDeVuelta, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });
  } catch (error) {
  }
}

function capturarValoresIntroducidos() {
  valorCajaTarea = document.getElementById("cajaTextoTarea").value;
  valorCajaNotas = document.getElementById("cajaTextoNotas").value;
}



function editarTarea(tareaId) {
  recuperarTarea(tareaId).then((tarea) => {
    ventanaModal(tarea);
  });

}

function recuperarTarea(tareaId) {
  const apiUrl = `http://localhost:3000/tareas/${tareaId}`;
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(apiUrl);
      const tarea = await response.json();
      resolve(tarea)
    } catch (error) {
      let errorJson = `
      <div class="alert -warning alert-dismissible fade show" role="alert" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
        ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> `;
    }
  })

}

function cargaDeDatos() {
  arrayTemporal = [];
  leerValoresJson().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      textoTarea = arrayTemporal[i].tarea;
      creacionNuevaTarea(arrayTemporal[i]);
    }
  })
 
}

function guardarTareaEnArrayTemporal() {
  indiceArray = arrayTemporal.id + 1;
  tareaNueva = {
    id: indiceArray,
    tarea: valorCajaTarea,
    notas: valorCajaNotas,
    completada: completada,
    eliminada: eliminada, 
    usuario: idenUser
  };
  arrayTemporal.push(tareaNueva);
}


function botonActualizarTarea(tareaId) {
  capturarValoresIntroducidos();
  actualizarJson(tareaId).then(() => {
    cargaDeDatos();
  });
}

async function borrarTareaDef(tareaId) {
  if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?. Esta acción no se puede deshacer.')) {
    const rutaJsonDeVuelta = `http://localhost:3000/tareas/${tareaId}`;
    try {
      const responseVuelta = await fetch(rutaJsonDeVuelta, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
    }
  } else {
    console.log('La tarea no ha sido eliminada');
  }
}


async function confirmarBorrarTarea(tarea) {
    const tareaId = tarea.id;
    const apiUrl = `http://localhost:3000/tareas/${tarea.id}`;
    tarea.eliminada = !tarea.eliminada
    try {
      const responseVuelta = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      });
    } catch (error) {
      console.error('Ocurrió un error al eliminar la tarea:', error);
    }
}

async function cambiarEstadoCompletado(tarea) {
 
    const tareaId = tarea.id;
    const apiUrl = `http://localhost:3000/tareas/${tareaId}`;
    tarea.completada = !tarea.completada
    try {
      const responseVuelta = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarea),
      });
    } catch (error) {
      console.error('Ocurrió un error al completar la tarea:', error);
    }
}

function borrarTarea(tareaId) {
  recuperarTarea(tareaId).then((tarea) => {
    confirmarBorrarTarea(tarea);
  });
}

function completarTarea(tareaId) {
  recuperarTarea(tareaId).then((tarea) => {
    cambiarEstadoCompletado(tarea);
  });
}

async function actualizarJson(tareaId) {
  const apiUrl = `http://127.0.0.1:3000/tareas/${tareaId}`;
  const tarea = {
    id: tareaId,
    tarea: valorCajaTarea,
    notas: valorCajaNotas,
    completada: completada,
    eliminada: eliminada
  }
  try {
    const responseVuelta = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });
  } catch (error) {
    alert(console.log(error));
  }
}


function ventanaPrincipal() {

const ventana = `
<class="container">
<div class="row align-content-center">
    <div class="col">
        <h1 class="display-6">To Do List</h1>
    </div>
</div>

<div id="objetoTarea" class="toast show border-success border-2"
    style=" margin-top: 2%; margin-left: auto; margin-right: auto; width: 400px; height: 70vh; overflow-y: scroll;">
    <div class="card mt-2 p-1 border-warning" style="margin-left: 1.3em; margin-right: 1.3em;">
        <div style="text-align: center;">Usuario: ${nombreUser}</div>
    </div>
</div>

<div class="flex-container d-flex justify-content-evenly" style="margin-left: 40%; margin-right: 40%;">
        <button type="button" id="buttonAdd" class="buttonAdd btn btn-success" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Añadir tarea" onclick="ventanaModal()"><i class="fa-solid fa-square-plus"></i></button>
        <button type="button" id="buttonAdd" class="buttonAdd btn btn-danger" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Salir" onclick="retornarIndex()"><i class="fa-solid fa-right-from-bracket"></i></i></button>

        <div class="btn-group">
            <button class="btn btn-warning btn dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-placement="right" data-bs-title="Añadir tarea" aria-expanded="false">
                <i class="fa-solid fa-filter"></i>
            </button>
            <ul class="dropdown-menu" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Selecciona el filtro">
              <li><a class="dropdown-item" onclick="mostrarTodo()">Quitar filtros</a></li>
              <li><a class="dropdown-item" onclick="filtroCompletadas()">Completadas</a></li>
              <li><a class="dropdown-item" onclick="filtroEliminadas()">Archivadas</a></li>
            </ul>
        </div>
    </div>` ;
document.body.innerHTML = ventana;
}

function mostrarTodo() {
  limpiarPantalla();
  cargaDeDatos();
}

function limpiarPantalla() {
  document.body.innerHTML = '';
  ventanaPrincipal() 
}

function filtroCompletadas() {
  limpiarPantalla();
  cargaDeDatosCompletadas();
}

function cargaDeDatosCompletadas() {
  leerValoresJson().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      textoTarea = arrayTemporal[i].tarea;
      mostrarTareasCompletadas(arrayTemporal[i]);
    }
  })
 
}

function mostrarTareasCompletadas(arrayTemporal) {
  let nombreTarea = arrayTemporal.tarea.slice(0, 35).padEnd(35, " ");
  nuevaTarea = document.querySelector("#objetoTarea");
  if (arrayTemporal.usuario === idenUser) {
    if (arrayTemporal.completada === true) {
      let elementos = `
      <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
        <tr>
        <td style="width: 77.56%; background-color: rgb(154, 254, 87);">${nombreTarea}</td>
        <td style="width: 13%; background-color: rgb(154, 254, 87);">
          <button class="finish" onclick="completarTarea(${arrayTemporal.id})"><i class="fa-solid fa-check-double"></i></button> 
          <button class="edit" onclick="editarTarea(${arrayTemporal.id})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete" onclick="borrarTarea(${arrayTemporal.id})"><i class="fa-solid fa-box-archive"></i></button>
        </td>
      </tr>
    </table>`;
    nuevaTarea.insertAdjacentHTML("beforeend", elementos);

  } 
}
}

function filtroEliminadas() { 
  limpiarPantalla();
  cargaDeDatosEliminadas();
}

function cargaDeDatosEliminadas() {
  leerValoresJson().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      textoTarea = arrayTemporal[i].tarea;
      mostrarTareasEliminadas(arrayTemporal[i]);
    }
  })
 
}

function mostrarTareasEliminadas(arrayTemporal) {
  let nombreTarea = arrayTemporal.tarea.slice(0, 35).padEnd(35, " ");
  nuevaTarea = document.querySelector("#objetoTarea");
  if (arrayTemporal.usuario === idenUser) {
    if (arrayTemporal.eliminada === true) {
      let elementos = `
      <table class="card mb-2 mt-2 mr-2 border-success border-2" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
        <tr>
        <td style="color:white; width: 77.56%; background-color: rgb(219, 83, 70);">${nombreTarea}</td>
        <td style="text-align: center; width: 14%; background-color: rgb(219, 83, 70);">
        <button class="delete" onclick="borrarTarea(${arrayTemporal.id})"><i class="fa-solid fa-boxes-packing" style="color: #ffffff;"></i>  </button>
        <icon class="delete"><i class="fa-solid fa-trash-can-arrow-up" style="color: rgb(219, 83, 70);"></i></icon>
        <button class="delete" onclick="borrarTareaDef(${arrayTemporal.id})"><i class="fa-solid fa-fire" style="color: #ffffff;"></i></button>
        </td>
      </tr>
    </table>`;
    nuevaTarea.insertAdjacentHTML("beforeend", elementos);

  } 
}
}