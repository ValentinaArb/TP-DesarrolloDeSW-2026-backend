import {CambioEstadoTurno} from "./cambioEstadoTurno.js"
import {EstadoTurno} from "./estadoTurno.js";
import {ConflictError} from "../errors/AppError.js";
import {FactoryNotificacion} from "./factoryNotificacion.js";

export class Turno{
    id;
    medico;
    fechaInicio;
    fechaFinal;
    paciente;
    servicio;
    sede;
    estado;
    historialDeEstados;
    costo;

    constructor(id = null, medico, fechaInicio, fechaFinal, paciente = null, servicio, sede, estado, estados, costo = null){
        this.id = id;
        this.medico = medico;
        this.fechaInicio = fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
        this.fechaFinal = fechaFinal instanceof Date ? fechaFinal : new Date(fechaFinal);
        this.paciente = paciente;
        this.servicio = servicio;
        this.sede = sede;
        this.estado = estado;
        this.historialDeEstados = estados;
        this.costo = costo;
    }

    darDeBaja(motivo, estado) {
        if(this.verificarBaja()) {
            this.actualizarEstado(estado, this.paciente, motivo);
        }
        else {
            throw new ConflictError("Los turnos se deben cancelar con al menos una hora de antelación.");
        }
    }
    
    darDeAlta(paciente) {
        if(this.estado === EstadoTurno.DISPONIBLE) {
            this.actualizarEstado(EstadoTurno.RESERVADO, paciente);
        }
        else{
            throw new ConflictError("Whoops! El turno no está disponible.");
        }
    }

    async actualizarEstado(nuevoEstado, paciente, motivo) {
        console.log("nuevo estado:", nuevoEstado)
        let cambio = new CambioEstadoTurno(null, Date.now(), nuevoEstado, this.id, paciente, motivo);
        this.historialDeEstados.push(cambio);
        this.estado = nuevoEstado;
        this.paciente = paciente;
        if(nuevoEstado === EstadoTurno.DISPONIBLE) {
            this.paciente = null;
            return null
        }
        const factoryNotificacion = new FactoryNotificacion();
        console.log("llega al factory")
        return await factoryNotificacion.crearSegunEstadoTurno(this)
    }

    verificarBaja() {
        const ahora = new Date();
        const horaTurno = this.fechaInicio;

        const tiempoQueFaltaParaTurno = horaTurno - ahora;
        const unaHora = 60 * 60 * 1000;
        
        return tiempoQueFaltaParaTurno >= unaHora;
    }
}