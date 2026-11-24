import { Electrodomestico } from "./js/Electrodomestico.js";
import { Climatizador } from "./js/Climatizador.js";
import { PanelDomotico } from "./js/PanelDomotico.js";

const panel = new PanelDomotico(5);

const refri = new Electrodomestico("E1", "Refrigerador", 400, true);
const microondas = new Electrodomestico("E2", "Microondas", 1200, false);
const climaSala = new Climatizador("C1", "Aire Acondicionado", 1500, false, false);

panel.agregarDispositivo(refri);
panel.agregarDispositivo(microondas);
panel.agregarDispositivo(climaSala);

const selectDispositivo = document.getElementById("selectDispositivo");
const inputHoras = document.getElementById("inputHoras");
const salida = document.getElementById("salida");

const btnEncender = document.getElementById("btnEncender");
const btnApagar = document.getElementById("btnApagar");
const btnTurboOn = document.getElementById("btnTurboOn");
const btnTurboOff = document.getElementById("btnTurboOff");
const btnCalcular = document.getElementById("btnCalcular");
const btnRecibo = document.getElementById("btnRecibo");

function mostrarMensaje(texto) {
  console.log(texto);
  salida.innerHTML = "<p>" + texto + "</p>";
}

btnEncender.addEventListener("click", function () {
  const id = selectDispositivo.value;
  panel.encenderDispositivo(id);
  mostrarMensaje("Se envió la orden de ENCENDER al dispositivo " + id + ".");
});

btnApagar.addEventListener("click", function () {
  const id = selectDispositivo.value;
  panel.apagarDispositivo(id);
  mostrarMensaje("Se envió la orden de APAGAR al dispositivo " + id + ".");
});

btnTurboOn.addEventListener("click", function () {
  const id = selectDispositivo.value;
  const aparato = panel.buscarPorId(id);

  if (aparato instanceof Climatizador) {
    aparato.activarTurbo();
    mostrarMensaje("Modo TURBO activado en " + aparato.obtenerNombre() + ".");
  } else {
    mostrarMensaje("El dispositivo " + id + " no es un climatizador.");
  }
});

btnTurboOff.addEventListener("click", function () {
  const id = selectDispositivo.value;
  const aparato = panel.buscarPorId(id);

  if (aparato instanceof Climatizador) {
    aparato.desactivarTurbo();
    mostrarMensaje("Modo TURBO desactivado en " + aparato.obtenerNombre() + ".");
  } else {
    mostrarMensaje("El dispositivo " + id + " no es un climatizador.");
  }
});

btnCalcular.addEventListener("click", function () {
  const horas = Number(inputHoras.value);
  const totalKWh = panel.calcularConsumoTotal(horas);

  let mensaje = "Consumo total en " + horas + " horas: " + totalKWh + " kWh. ";

  if (totalKWh > panel.limiteAlertaKWh) {
    mensaje = mensaje + "ALERTA: Se superó el límite de " + panel.limiteAlertaKWh + " kWh.";
  } else {
    mensaje = mensaje + "Consumo dentro del límite (" + panel.limiteAlertaKWh + " kWh).";
  }

  mostrarMensaje(mensaje);
});

btnRecibo.addEventListener("click", function () {
  const horasPorDia = Number(inputHoras.value);
  const costoBimestral = panel.estimarReciboBimestral(horasPorDia, 2.5);

  mostrarMensaje(
    "Estimación bimestral (60 días a " + horasPorDia + "h/día): $" + costoBimestral
  );
});