class CambioEstadoTurno {
    _fechaHoraIngreso;
    _estado;
    _turnoId; //VER -> antes era turno pero era un bucle porque turno llamaba a cambio de estado y cambio de estado a turno.
    _paciente;
    _motivo


    constructor(fechaHoraIngreso, estado, turnoId, paciente, motivo) {
        this._fechaHoraIngreso = fechaHoraIngreso;
        this._estado = estado;
        this._turnoId = turnoId;
        this._paciente = paciente;
        this._motivo = motivo;
    }


    get fechaHoraIngreso() {
        return this._fechaHoraIngreso;
    }

    set fechaHoraIngreso(value) {
        this._fechaHoraIngreso = value;
    }

    get estado() {
        return this._estado;
    }

    set estado(value) {
        this._estado = value;
    }

    get turno() {
        return this._turno;
    }

    set turno(value) {
        this._turno = value;
    }

    get paciente() {
        return this._paciente;
    }

    set paciente(value) {
        this._paciente = value;
    }

    get motivo() {
        return this._motivo;
    }

    set motivo(value) {
        this._motivo = value;
    }
}

export {CambioEstadoTurno}