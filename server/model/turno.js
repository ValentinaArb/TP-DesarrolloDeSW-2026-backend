import {CambioEstadoTurno} from "./cambioEstadoTurno.js"
import { EstadoTurno } from "./estadoTurno.js";

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

    darDeBaja(motivo) {
        if(this._verificarBaja()) {
            this._actualizarEstado(EstadoTurno.DISPONIBLE, this.paciente, motivo);
        }
        else {
            /* throw new AppError(
            'VALIDATION_ERROR', 
            'Los turnos se deben cancelar con al menos una hora de antelación.', 
            400
            ); */
                        throw new Error("Los turnos se deben cancelar con al menos una hora de antelación.");

        }
    }
    
    darDeAlta(paciente) {
        if(this._estado === EstadoTurno.DISPONIBLE) {
            this._actualizarEstado(EstadoTurno.RESERVADO, paciente);
        }
        else{
            throw new Error("Whoops! El turno no está disponible.");
        }
    }

    _actualizarEstado(nuevoEstado, paciente, motivo) {
        let cambio = new CambioEstadoTurno(Date.now(), nuevoEstado, this.id, paciente, motivo);
        this._historialDeEstados.push(cambio);
        this._estado = nuevoEstado;
        this._paciente = paciente;
        if(nuevoEstado === EstadoTurno.DISPONIBLE) {
            this._paciente = null;
        }
    }

    _verificarBaja() {
        const ahora = new Date();
        const horaTurno = new Date(this._fechaHora);

        const tiempoQueFaltaParaTurno = horaTurno - ahora;
        const unaHora = 60 * 60 * 1000;
        
        return tiempoQueFaltaParaTurno >= unaHora;
    }
}

export { Turno };