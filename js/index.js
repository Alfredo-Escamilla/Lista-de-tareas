let array = [];
let botonGuardarTarea = document.getElementById("botonGuardarTarea");
let valorCajaTarea;
let valorCajaNotas;
let indiceArray;
let completada = false;
let eliminada = false;
let objetoArray;
let nuevaTarea;
let conversionRegistro;
let arrayTemporal = [];
let nuevoRegistro;
let textoTarea
const rutaJson = "json/datos.json";


async function cargaDeDatos() {
  await leerValoresJson();
  console.log(arrayTemporal.length);
  console.log(arrayTemporal);
  for (let i = 0; i < arrayTemporal.length; i++) {
    textoTarea = arrayTemporal[i].tarea;
    crearElementoCard();
}
  
}
async function guardarDatosEnJson() {
const rutaJsonDeVuelta = "http://localhost:3000/tareas";
  try {
    const responseVuelta = await fetch(rutaJsonDeVuelta, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoRegistro),
    });
    const resultadoVuelta = await responseVuelta.json();
  } catch (error) {
    console.log("Error en el nuevo registro");
  }
}

function capturarValoresIntroducidos() {
  valorCajaTarea = document.getElementById("cajaTextoTarea").value;
  valorCajaNotas = document.getElementById("cajaTextoNotas").value;
}

 function leerValoresJson() {
  return new Promise(async resolve => {
  try {
    const response = await fetch(rutaJson);
    const responseData = await response.json();
    arrayTemporal.push(responseData);
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

function guardarTareaEnArrayTemporal() {
  nuevoRegistro = {
    id: indiceArray,
    tarea: valorCajaTarea,
    notas: valorCajaNotas,
    completada: completada,
    eliminada: eliminada
  };
  arrayTemporal.push(nuevoRegistro);
}

function crearElementoCard() {
  valorCajaTarea = valorCajaTarea.slice(0, 35).padEnd(35, ' ');
  nuevaTarea = document.querySelector("#objetoTarea");
  let elementos = `
  <table class="card mb-2 mt-2 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
    <tr>
    	<td style="width: 60%;"><pre>${valorCajaTarea}<pre></td>
    	<td style="width: 18%;">
    		<button class="botones" id="finish"><i class="fa-solid fa-flag-checkered"></i></button> 
    		<button class="botones" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    		<button class="botones" id="delete"><i class="fa fa-trash-alt"></i></button>
    	</td>
    </tr>
  </table>`;
  nuevaTarea.insertAdjacentHTML("beforeend", elementos);
}

botonGuardarTarea.addEventListener("click", function () {
  leerValoresJson();
  capturarValoresIntroducidos();
  guardarTareaEnArrayTemporal();
  crearElementoCard();
  guardarDatosEnJson();
})
