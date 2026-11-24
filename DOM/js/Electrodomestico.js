import { Dispositivo } from "./Dispositivo.js";

export class Electrodomestico extends Dispositivo {
  constructor(id, nombre, watts, encendido = false) {
    super(id, nombre, watts, encendido);
  }

  calcularConsumoKWh(horas) {
    return super.calcularConsumoKWh(horas);
  }
}