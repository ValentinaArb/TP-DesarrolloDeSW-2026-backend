class Turno{
    _id;
    _medico;
    _fechaHora;
    _paciente;
    _practica;
    _sede;
    _estado;
    _historialDeEstados;
    _costo;

    constructor(id = null, medico, fechaHora, paciente = null, practica, sede, estado, estados, costo = null){
        this._id = id;
        this._medico = medico;
        this._fechaHora = fechaHora;
        this._paciente = paciente;
        this._practica = practica;
        this._sede = sede;
        this._estado = estado;
        this._historialDeEstados = estados;
        this._costo = costo;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get medico() {
        return this._medico;
    }

    set medico(value) {
        this._medico = value;
    }

    get fechaHora() {
        return this._fechaHora;
    }

    set fechaHora(value) {
        this._fechaHora = value;
    }

    get paciente() {
        return this._paciente;
    }

    set paciente(value) {
        this._paciente = value;
    }

    get practica() {
        return this._practica;
    }

    set practica(value) {
        this._practica = value;
    }

    get sede() {
        return this._sede;
    }

    set sede(value) {
        this._sede = value;
    }

    get estado() {
        return this._estado;
    }

    set estado(value) {
        this._estado = value;
    }

    get historialDeEstados() {
        return this._historialDeEstados;
    }

    set historialDeEstados(value) {
        this._historialDeEstados = value;
    }

    get costo() {
        return this._costo;
    }

    set costo(value) {
        this._costo = value;
    }

    actualizarEstado(nuevoEstado, usuario, motivo) {
        this._estado = nuevoEstado;

        const cambio = CambioEstadoTurno(Date.now(), nuevoEstado, this, usuario, motivo);

        this._historialDeEstados.push(cambio);
    }
}