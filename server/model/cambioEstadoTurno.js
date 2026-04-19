class CambioEstadoTurno {
    _fechaHoraIngreso;
    _estado;
    _turno;
    _usuario;
    _motivo


    constructor(fechaHoraIngreso, estado, turno, usuario, motivo) {
        this._fechaHoraIngreso = fechaHoraIngreso;
        this._estado = estado;
        this._turno = turno;
        this._usuario = usuario;
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

    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    get motivo() {
        return this._motivo;
    }

    set motivo(value) {
        this._motivo = value;
    }
}

export {CambioEstadoTurno}