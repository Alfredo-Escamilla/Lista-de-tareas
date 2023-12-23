let array = [0];
let botonGuardarTarea = document.getElementById("botonGuardarTarea");
let valorCajaTarea;
let valorCajaNotas;
let indiceArray;
let objetoArray;
let contenedorTarea;
let nuevaTarea;
let etiquetaTarea;

function capturarValoresIntroducidos() {
  valorCajaTarea = document.getElementById("cajaTextoTarea").value;
  valorCajaNotas = document.getElementById("cajaTextoNotas").value;
}

function guardarValoresEnArray() {
  indiceArray = array.length - 1;
  objetoArray = {
    tarea: valorCajaTarea,
    notas: valorCajaNotas,
    indice: indiceArray,
  };
  array.push(objetoArray);
  indiceArray++;
}

function crearElementoCard() {
  valorCajaTarea = valorCajaTarea.slice(0, 37).padEnd(35, ' ');
  nuevaTarea = document.querySelector("#objetoTarea");
  elementos = `
  <table class="card mt-2 p-1 mr-2 border-info" style="margin-left: 1.3em; margin-right: 1.3em; width: 91%;">
    <tr>
    	<td style="width: 60%;">${valorCajaTarea}</td>
    	<td style="width: 20%;">
    		<button class="botones" id="finish"><i class="fa-solid fa-flag-checkered"></i></button>
    		<button class="botones" id="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    		<button class="botones" id="delete"><i class="fa fa-trash-alt"></i></button>
    	</td>
    </tr>
  </table>`;
  nuevaTarea.insertAdjacentHTML("beforeend", elementos);
}

botonGuardarTarea.addEventListener("click", function () {
  capturarValoresIntroducidos();
  guardarValoresEnArray();
  crearElementoCard();
})
