import { Dispositivo } from "./Dispositivo.js";

export class Climatizador extends Dispositivo {
  #turbo;

  constructor(id, nombre, watts, encendido = false, turbo = false) {
    super(id, nombre, watts, encendido);
    this.#turbo = turbo;
  }

  activarTurbo() {
    this.#turbo = true;
    console.log("Turbo activado");
  }

  desactivarTurbo() {
    this.#turbo = false;
    console.log("Turbo desactivado");
  }

  calcularConsumoKWh(horas) {
    let consumoHora = super.calcularConsumoKWh(horas);

    if (this.#turbo) {
      consumoHora = consumoHora * 1.2;
    }

    return consumoHora;
  }
}