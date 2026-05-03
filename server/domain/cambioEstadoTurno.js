export class CambioEstadoTurno {
    fechaInicioIngreso;
    estado;
    turnoId;
    paciente;
    motivo


    constructor(fechaInicioIngreso, estado, turnoId, paciente, motivo) {
        this.fechaInicioIngreso = fechaInicioIngreso;
        this.estado = estado;
        this.turnoId = turnoId;
        this.paciente = paciente;
        this.motivo = motivo;
    }
}