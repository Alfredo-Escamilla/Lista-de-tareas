// let arrayTask = [];
// let buttonAddTask = document.querySelector("#buttonAddTask");

// function insertarDatosEnArray() {
//     let indexArrayValue = arrayTask.length;
//     let boxTextPurposeValue = document.getElementById("boxTextPurpose").value;
//     let boxTextTargetValue = document.getElementById("boxTextTarget").value;
//     let recArray = {
//         boxTextPurpose: boxTextPurposeValue,
//         boxTextTarget: boxTextTargetValue,
//         indexArray: indexArrayValue
//     };
//     arrayTask.push(recArray);
// }

// function cogerDatosDelArray() {
//     let indexArrayValue = arrayTask.length;
//     let listTask = document.getElementById("listTask"); 
//     let lastTask = arrayTask[indexArrayValue - 1];
//     let arrayValuePurpose = lastTask.boxTextPurpose;
//     let arrayValueTarget = lastTask.boxTextTarget;
//     let arrayIndex = lastTask.indexArray
//     console.log(arrayValuePurpose, arrayValueTarget, arrayIndex);


//     crearElementoRadioBoton();
//     textOfTheTask(indexArrayValue, arrayValuePurpose, showTask);    
// }

// function crearElementoRadioBoton(purpose) {
//     let showTask = document.getElementById("methodTask");
//     let crearBotonRadio = document.createElement("input");
//     crearBotonRadio.type = "radio";
//     crearBotonRadio.label = purpose
//     showTask.appendChild(crearBotonRadio);
// }

// function textOfTheTask (index, purpose, element) {
//     let createTextContent = document.createElement("li");
//     createTextContent.id = index - 1;
//     createTextContent.innerHTML = purpose;
//     element.appendChild(createTextContent);

// }

// buttonAddTask.addEventListener("click", function () {
//     insertarDatosEnArray()
//     cogerDatosDelArray()


// })

