import "./style.css";

let puntuacion = 0;
let tirada = 0;
const victoria = 8;

type ESTADO = 
    | "ES_SEIS"
    | "ES_MAYOR_VIC"
    | "ES_MENOR_VIC";

const botonTirar = document.getElementById("tirar");
const botonPlantarse = document.getElementById("plantarse");
const dado = document.getElementById("dado") as HTMLImageElement;
const puntuacionTexto = document.getElementById("puntuacion");
const mensaje = document.getElementById("mensaje");
 
const Estado = (): ESTADO => {
    if (tirada === 6) {
    return "ES_SEIS";
  }  
    if (puntuacion >= victoria) {
    return "ES_MAYOR_VIC";
  }
    return "ES_MENOR_VIC";
}
const actualizarEstado = (estadoActual: ESTADO) => {
    switch (estadoActual) {
        case "ES_SEIS":
            mensaje!.textContent = "¡Has sacado un 6! Pierdes.";
            botonTirar!.setAttribute("disabled", "true");
            botonPlantarse!.setAttribute("disabled", "true");
            break;
        case "ES_MAYOR_VIC":
            mensaje!.textContent = "¡Has ganado!";
            botonTirar!.setAttribute("disabled", "true");
            botonPlantarse!.setAttribute("disabled", "true");
            break;
        case "ES_MENOR_VIC":
            mensaje!.textContent = "Sigue jugando.";
            break;
    }
}

let estadoActual: ESTADO = Estado();
actualizarEstado(estadoActual);

function TirarPulsado() {
    tirada = Math.floor(Math.random() * 6) + 1;
    puntuacion += tirada;
    actualizarEstado(Estado());
    dado.src = `/src/assets/dado${tirada}.png`;
    puntuacionTexto!.textContent = `Puntuación: ${puntuacion}`;
}

function PlantarsePulsado() {
    mensaje!.textContent = `Te has plantado, Puntuación: ${puntuacion}`;
    botonTirar!.setAttribute("disabled", "true");
    botonPlantarse!.setAttribute("disabled", "true");
}


botonTirar?.addEventListener("click", TirarPulsado);
botonPlantarse?.addEventListener("click", PlantarsePulsado);