export class PanelDomotico {
  constructor(limiteAlertaKWh = 10) {
    this.dispositivos = [];
    this.limiteAlertaKWh = limiteAlertaKWh;
  }

  agregarDispositivo(dispositivo) {
    this.dispositivos.push(dispositivo);
  }

  buscarPorId(id) {
    for (let i = 0; i < this.dispositivos.length; i++) {
      if (this.dispositivos[i].obtenerId() === id) {
        return this.dispositivos[i];
      }
    }
    return null;
  }

  encenderDispositivo(id) {
    const dispositivo = this.buscarPorId(id);

    if (dispositivo !== null) {
      dispositivo.encender();
    } else {
      console.log("No se encontró el dispositivo con ID: " + id);
    }
  }

  apagarDispositivo(id) {
    const dispositivo = this.buscarPorId(id);

    if (dispositivo !== null) {
      dispositivo.apagar();
    } else {
      console.log("No se encontró el dispositivo con ID: " + id);
    }
  }

  calcularConsumoTotal(horas) {
    let totalKWh = 0;

    for (let i = 0; i < this.dispositivos.length; i++) {
      totalKWh = totalKWh + this.dispositivos[i].calcularConsumoKWh(horas);
    }

    console.log("Consumo total en " + horas + " horas: " + totalKWh + " kWh");

    if (totalKWh > this.limiteAlertaKWh) {
      console.log("ALERTA: Se superó el límite de " + this.limiteAlertaKWh + " kWh");
    } else {
      console.log("Consumo normal dentro del límite permitido");
    }

    return totalKWh;
  }

  estimarReciboBimestral(horasPorDia, precioPorKWh = 2.5) {
    let consumoDiario = 0;

    for (let i = 0; i < this.dispositivos.length; i++) {
      consumoDiario = consumoDiario + this.dispositivos[i].calcularConsumoKWh(horasPorDia);
    }

    const consumoBimestral = consumoDiario * 60;
    const costoBimestral = consumoBimestral * precioPorKWh;

    console.log("Consumo bimestral estimado: " + consumoBimestral + " kWh");
    console.log("Total a pagar estimado: $" + costoBimestral);

    return costoBimestral;
  }
}