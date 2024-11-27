'use strict'

/* ----------------------VARIABLES----------------------  */
// Seleccionamos el resultado 
const resultado = document.querySelector('#resultado');
// seleccionamos el select de años
const año = document.querySelector('#year');
// Rango de años 
const añoMin = 1996
const añoMax = new Date().getFullYear();

const marca = document.querySelector('#marca');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const color = document.querySelector('#color');
const transmision = document.querySelector('#transmision');


// objeto datos de busqueda
const datosBusqueda = {
    marca: null,
    modelo: null,
    year: null,
    precioMin: null,
    precioMax: null,
    puertas: null,
    color: null,
    transmision: null

};


/* ----------------------EVENTOS----------------------  */

// vamos a comprobar que el documento se carga correctamente

document.addEventListener('DOMContentLoaded', () => {
    console.log('El documento está completamente cargado y listo');

    mostrarAutos();
    llenarSelect();

});

marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value; // Actualiza el objeto con la marca seleccionada
    filtrarAutos(); // Filtra los autos con base en los datos de búsqueda
});

año.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAutos();

});

precioMin.addEventListener('change', e => {
    datosBusqueda.precioMin = parseInt(e.target.value);
    filtrarAutos();
});

precioMax.addEventListener('change', e => {
    datosBusqueda.precioMax = parseInt(e.target.value);
    filtrarAutos();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAutos();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAutos();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
});





/* ----------------------FUCIONES----------------------  */
// funcion para limpiar lo que hay en resultado
function limpiar(){
    resultado.innerHTML = '';
}

// funcion para mostrar el mensaje de error si no hay coincidencias
function mostrarMensaje(){
    const mensaje = document.createElement('div');
    mensaje.classList.add('alerta','error');
    mensaje.textContent = "No se encontraron resultados";
    limpiar();
    resultado.appendChild(mensaje);
}

// funicon mostrar autos 
function mostrarAutos(autosFiltrados = autos) {

    limpiar();

    if(autosFiltrados.length === 0) {
        mostrarMensaje();
    }

    autosFiltrados.forEach(auto => {
        const vehiculoMostrado = document.createElement('p');

        vehiculoMostrado.textContent = `Marca: ${auto.marca}, Modelo: ${auto.modelo}, Año: ${auto.year}, Precio: $${auto.precio}, Puertas: ${auto.puertas}, Color: ${auto.color}, Transmisión: ${auto.transmision}`;

        resultado.appendChild(vehiculoMostrado);

    });

}

// Para los años

function llenarSelect() {

    for (let i = añoMax; i >= añoMin; i--) {

        const option = document.createElement('option')

        option.value = i; // valor del año

        option.textContent = i; // Texto que vamos a mostrar

        año.appendChild(option);

    }

}

// Funcion para filtrar los Autos por marca

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }

    // si no hay ninguno seleccionado agrega todos los autos 
    return true;
}

function filtrarAño(auto) {
    if (datosBusqueda.year) {
        return auto.year === datosBusqueda.year;
    }

    // si no hay ninguno seleccionado agrega todos los autos 
    return true;
}

function filtrarPrecioMax(auto) {
    if (datosBusqueda.precioMax) {
        return auto.precio <= datosBusqueda.precioMax;
    }

    // si no hay ninguno seleccionado agrega todos los autos 
    return true;
}

function filtrarPrecioMin(auto) {
    if (datosBusqueda.precioMin) {
        return auto.precio >= datosBusqueda.precioMin;
    }

    // si no hay ninguno seleccionado agrega todos los autos 
    return true;
}

function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color;
    }

    return true;

}

function filtrarTransmision(auto) {
    if (datosBusqueda.transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }

    return true;
}


function filtrarAutos() {

    const autosFiltrados = autos.filter(filtrarMarca).filter(filtrarAño).filter(filtrarPrecioMax).filter(filtrarPrecioMin).filter(filtrarColor).filter(filtrarTransmision);
    mostrarAutos(autosFiltrados);



}
