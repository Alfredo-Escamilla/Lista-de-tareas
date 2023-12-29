// let array = [];
// let botonGuardarTarea = document.getElementById("botonGuardarTarea");
let valorCajaTarea;
let valorCajaNotas;
let indiceArray = 0;
let completada = false;
let eliminada = false;
let objetoArray;
let nuevaTarea;
let conversionRegistro;
let arrayTemporal = [];
let nuevoRegistro;
let textoTarea;
let tareaId;
let tareaParaEditar;
let arrayRecuperacion = [];
const rutaJson = "json/datos.json";

function cargaDeDatos() {
  leerValoresJson().then(() => {
    for (let i = 0; i < arrayTemporal.length; i++) {
      textoTarea = arrayTemporal[i].tarea;
      crearElementoCard(arrayTemporal[i]);
    }
  })

}

async function guardarDatosEnJson(nuevoRegistro) {
  const rutaJsonDeVuelta = "http://localhost:3000/tareas";
  try {
    const responseVuelta = await fetch(rutaJsonDeVuelta, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoRegistro),
    });
  } catch (error) {
    console.log("Error en el nuevo registro");
  }
}

function capturarValoresIntroducidos() {
  valorCajaTarea = document.getElementById("cajaTextoTarea").value;
  valorCajaNotas = document.getElementById("cajaTextoNotas").value;
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


function editarTarea(tareaId) {
  console.log("Tarea Id: ");
  console.log(tareaId);
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
      console.log("Contenido de tareaParEditar");
      console.log(tarea);
      resolve(tarea)
    } catch (error) {
      let errorJson = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
        ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div> `;
    }
  })

}

function guardarTareaEnArrayTemporal() {
  indiceArray = arrayTemporal.length + 1;
  nuevoRegistro = {
    id: indiceArray,
    tarea: valorCajaTarea,
    notas: valorCajaNotas,
    completada: completada,
    eliminada: eliminada
  };
  arrayTemporal.push(nuevoRegistro);
}

function crearElementoCard(arrayTemporal) {
  let nombreTarea = arrayTemporal.tarea.slice(0, 35).padEnd(35, " ");
  nuevaTarea = document.querySelector("#objetoTarea");
  let elementos = `
  <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
    <tr>
    	<td style="width: 60%;"><pre>${nombreTarea}<pre></td>
    	<td style="width: 18%;">
    		<button class="finish onclick="completarTarea(${arrayTemporal.id})"><i class="fa-solid fa-flag-checkered"></i></button> 
    		<button class="edit" onclick="editarTarea(${arrayTemporal.id})"><i class="fa-solid fa-pen-to-square"></i></button>
    		<button class="delete onclick="borrarTarea(${arrayTemporal.id})"><i class="fa fa-trash-alt"></i></button>
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


// botonGuardarTarea.addEventListener("click", function () {
function botonGuardarTarea() {
  capturarValoresIntroducidos();
  guardarTareaEnArrayTemporal();
  crearElementoCard(nuevoRegistro);
  guardarDatosEnJson(nuevoRegistro);
}

function botonActualizarTarea(tareaId) {
  capturarValoresIntroducidos();
  actualizarJson(tareaId).then(() => {
    cargaDeDatos();
  });
}

async function actualizarJson(tareaId) {
  const apiUrl = `http://127.0.0.1:3000/tareas/${tareaId}`; //http://localhost:3000/tareas
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
    console.log(error);
  }
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
    await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    });
  } catch (error) {
    console.log(error);
  }
}
