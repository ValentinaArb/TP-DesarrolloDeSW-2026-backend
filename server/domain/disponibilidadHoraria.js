import { BadRequestError } from "../errors/AppError.js";

export class DisponibilidadHoraria{
    id;
    diaSemana;
    horaDesde;
    horaHasta;
    servicio;
    sede;

    constructor(id=null, diaSemana, horaDesde, horaHasta, servicio, sede) {
        this.id = id;
        this.diaSemana = diaSemana;

        if (typeof horaDesde !== 'string' || typeof horaHasta !== 'string') {
            throw new BadRequestError("horaDesde y horaHasta deben ser strings en formato HH:MM:SS");
        }
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
        this.servicio = servicio;
        this.sede = sede;
    }

    abarca(fecha) {
        const horaFecha = fecha.getHours() * 60 + fecha.getMinutes();
        const [desdeH, desdeM] = this.horaDesde.split(':').map(Number);
        const [hastaH, hastaM] = this.horaHasta.split(':').map(Number);
        const desde = desdeH * 60 + desdeM;
        const hasta = hastaH * 60 + hastaM;
        return ((fecha.getDay() === this.diaSemana) &&
            (horaFecha >= desde) &&
            (horaFecha <= hasta));
    }

    obtenerCosto() {
        return this.servicio.costo;
    }
}