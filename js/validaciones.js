export function valida(input){ // recibimos la etiqueta que dejo de ser foco
    const tipoDeInput = input.dataset.tipo; // dataset estamos obteniendo todas las colecciones de los datas y el tipo es el de nacimiento que lo declaramos data-tipo="nacimiento" podría ser cualquier otro nombre en vez de tipo, pero el data si debe ir si o si
    //console.log(input.dataset.tipo); recibimos el nombre de data-attribute
    if(validadores[tipoDeInput]){ // Verifica si en el objeto validadores esta el data-attribute, puesto en el tipoDeInput y luego se lo manda a ese data-attribute asignado.
        validadores[tipoDeInput](input); // en el input va la etiqueta que dejo de ser foco
    }

    console.log(input.parentElement); // para ver la etiqueta padre
    // validity es para saber si hay texto o no en el input y valid es para saber que eso sea cierto.
    if(input.validity.valid){ // Sí esta true o es valido, if = quiero que quiete la clase, else = quiero que ponga la clase para indicar que esta mal
        // la clase se agrega y elimina es a la etiqueta padre. Lo puedes ver en el html.
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "" // el mensa de color rojo que sale en el html lo elimina
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input); // para agregar el data-attribute y el input(etiqeuta)
    }
}

const tipoDeErrores = [
    //Ya si en un futuro quieres agregar otro tipo de error lo haces aqui y en el arreglo mensajeDeError que esta abajo de esté
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]


const mensajesDeError = {
    nombre: {
        valueMissing: "el campo nombre no puede estar vacio" // por si el campo esta vacio, se ejecuta este mensaje
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12 debe contener una letra minúscula, una leta mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puedo estar vacio",
        patternMismatch: "El formator requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puedo estar vacio",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puedo estar vacio",
        patternMismatch: "La ciudad debe contener entre 4 y 30 caracteres"
    },
    estados: {
        valueMissing: "Este campo no puedo estar vacio",
        patternMismatch: "El estado debe contener entre 4 y 30 caracteres"
    }
}

// Objeto
const validadores = {
    // vamos agregar los data-attribute de cada input para que nuestro código se vea más progesional o no tener que agregar un document.query a cada input
    nacimiento: input => validarNacimiento(input),
            // lo que va a recibir de la linea 4 validadores[tipoDeInput](input) => y lo que va a mandar a llamar
}


/*const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento) => { // "blur" es para cuando quitamos el enfoque
    //console.log(evento.target);
    validarNacimiento(evento.target);
});*/

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            console.log(error); // aqui podemos ver que esta recibiendo un error
            console.log(mensajesDeError[tipoDeInput][error]); // aqui vemos el tipo de error, y el error que esta ejecutando
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input){ // aqui recibimos la etiqueta completa
    // input.value = recibimos lo que el usuario puso en el input
    const fechaCliente = new Date(input.value); // el formato en que recibimos es año / mes / día
    let mensaje = ""
    //console.log(fechaCliente);
    if (!mayorDeEdad(fechaCliente)){ //Sí no es mayor de edad
        mensaje = "Debes tener al menos 18 años de edad"
    };
    input.setCustomValidity(mensaje); //Funciona como la propiedad tittle de las etiquetas
}

function mayorDeEdad(fecha){
    const fechaActual = new Date(); // el objeto date nos muestra la fecha actual
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate()); // agrega 18 años a la fecha ingresada por el usuario
                                    // para obtener el año        para obtener mes      para obtener día, se introduce en el date de esta manera porque es el formato año/mes/día
    //console.log(fecha, "   -   ", fechaActual);
    //console.log(diferenciaFechas);
    //console.log(diferenciaFechas <= fechaActual);
    return (diferenciaFechas <= fechaActual); // devuelve true o false
}