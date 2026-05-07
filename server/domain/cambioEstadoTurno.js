export class CambioEstadoTurno {
    id;
    fechaInicioIngreso;
    estado;
    turnoId;
    paciente;
    motivo


    constructor(id, fechaInicioIngreso, estado, turnoId, paciente, motivo) {
        this.id = id;
        this.fechaInicioIngreso = fechaInicioIngreso;
        this.estado = estado;
        this.turnoId = turnoId;
        this.paciente = paciente;
        this.motivo = motivo;
    }
}