export class CambioEstadoTurno {
    id;
    fechaInicioIngreso;
    estado;
    turno;
    paciente;
    motivo


    constructor(id, fechaInicioIngreso, estado, turno, paciente, motivo) {
        this.id = id;
        this.fechaInicioIngreso = fechaInicioIngreso;
        this.estado = estado;
        this.turno = turno;
        this.paciente = paciente;
        this.motivo = motivo;
    }
}