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

    darDeBaja(motivo) {
        if(this.verificarBaja()) {
            this.actualizarEstado(EstadoTurno.DISPONIBLE, this.paciente, motivo);
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
        let cambio = new CambioEstadoTurno(null, Date.now(), nuevoEstado, this.id, paciente, motivo);
        this.historialDeEstados.push(cambio);
        this.estado = nuevoEstado;
        if(nuevoEstado === EstadoTurno.DISPONIBLE) {
            this.paciente = null;
        }else{
            this.paciente = paciente;
        }
        const factoryNotificacion = new FactoryNotificacion();
        return await factoryNotificacion.crearNotificacion(this);
    }

    verificarBaja() {
        const ahora = new Date();
        const horaTurno = this.fechaInicio;

        const tiempoQueFaltaParaTurno = horaTurno - ahora;
        const unaHora = 60 * 60 * 1000;
        
        return tiempoQueFaltaParaTurno >= unaHora;
    }
    estaReservado() {
        return this.estado === EstadoTurno.RESERVADO;
    }

    async servicioPerteneceAMedico(servicioId) {
        return this.medico.servicios.some(s => s.id === servicioId);
    }

    crearMensaje(){
        let mensaje = "";
        let destinatario;
        let remitente;
        switch (this.estado) {
            case 'REALIZADO':
                mensaje = `Tu turno para el ${this.fechaInicio} fue realizado.`;
                destinatario = this.paciente;
                remitente = this.medico;
                break;
            case 'CANCELADO':
                mensaje = `El turno del día ${this.fechaInicio} fue cancelado.`;
                destinatario = this.paciente;
                remitente = this.medico;
                break;
            case 'DISPONIBLE':
                mensaje = `El turno del ${this.fechaInicio} fue cancelado.`;
                destinatario = this.medico;
                remitente = this.paciente;
                break;
            case 'RESERVADO':
                mensaje = `El turno del ${this.fechaInicio} fue reservado por el paciente ${this.paciente.nombre} para el servicio ${this.servicio.nombre}.`;
                destinatario = this.medico;
                remitente = this.paciente;
                break;
            case 'PENDIENTE':
                mensaje = `El turno del ${this.fechaInicio} fue modificado por el médico ${this.medico.nombre}. Por favor, revisa los detalles del turno y acepta o rechaza.`;
                destinatario = this.paciente;
                remitente = this.medico;
                break;
            default:
                throw new BadRequestError("Estado de turno no reconocido para notificar");
        }
        return {mensaje, destinatario, remitente};
    }
}