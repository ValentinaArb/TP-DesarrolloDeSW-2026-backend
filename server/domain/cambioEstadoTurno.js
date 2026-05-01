export class CambioEstadoTurno {
    fechaInicioIngreso;
    estado;
    turnoId; //VER -> antes era turno pero era un bucle porque turno llamaba a cambio de estado y cambio de estado a turno.
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