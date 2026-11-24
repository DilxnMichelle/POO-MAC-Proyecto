export class Dispositivo {
  #id;
  #nombre;
  #watts;
  #encendido;

  constructor(id, nombre, watts, encendido = false) {
    this.#id = id;
    this.#nombre = nombre;
    this.#watts = watts;
    this.#encendido = encendido;
  }

  obtenerId() {
    return this.#id;
  }

  obtenerNombre() {
    return this.#nombre;
  }

  obtenerWatts() {
    return this.#watts;
  }

  estaEncendido() {
    return this.#encendido;
  }

  encender() {
    this.#encendido = true;
    console.log(this.#nombre + " encendido.");
  }

  apagar() {
    this.#encendido = false;
    console.log(this.#nombre + " apagado.");
  }

  calcularConsumoKWh(horas) {
    if (!this.#encendido || horas <= 0) {
      return 0;
    }
    const kw = this.#watts / 1000;
    return kw * horas;
  }
}