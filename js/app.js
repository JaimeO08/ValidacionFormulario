import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input"); // para que seleccione todos los inputs de nuestro HTML, me regresa un arreglo

inputs.forEach( input => { // con esto iteramos los arreglos. y se lee para cada uno de los inputs...
    input.addEventListener("blur", (input) =>{ // a todos los inputs le va agregar el evento blur que es cuando sale de foco, llamará a la función que le asignamos
        //console.log(input.target);  para visualizar que estamos selecccionando la etiqueta, que despues deja de ser foco
        valida(input.target); // le estamos mandando, la etiqueta que dejo de ser foco
    });
});