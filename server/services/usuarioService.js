import { TurnoRepository } from "../repositories/turnoRepository.js";
import {TurnoService} from "./turnoService.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {NotFoundError} from "../errors/AppError.js";
import { BadRequestError } from "../errors/AppError.js";

export class UsuarioService{
    constructor() {
        this.turnoService = new TurnoService();
        this.turnoRepository = new TurnoRepository();
    }

    async reservarTurno(turnoId, pacienteId){
        await this.turnoService.darDeAlta(turnoId, pacienteId);
    }

    async cancelarTurno(pacienteId,turnoId, motivo){
        const turno = await this.turnoRepository.findById(turnoId);
        try{
            if(turno.paciente.id !== Number(pacienteId)) {
                throw new NotFoundError("El turno no pertenece a este paciente.");
            }
            await this.turnoService.darDeBaja(turnoId, motivo, EstadoTurno.DISPONIBLE);

        }
        catch(error) {
            console.error("El turno no pertenece a este paciente:", error);
            throw error;
        }
    }

    async obtenerTurnosPorEstado(pacienteId, estadoPedido){
        const turnos = await this.turnoRepository.turnosPara(pacienteId);
        console.log(estadoPedido);
        console.log(pacienteId);
        console.log(turnos);
        return turnos.filter(t => String(t.estado) === String(estadoPedido))
    }

    async hacerCambio(pacienteId, turnoId, horaInicio) {
        const turno = await this.turnoRepository.findById(turnoId);
        const horaFinal = new Date(horaInicio.getTime() + turno.servicio.duracionTurno * 60000);
        if (!turno.medico.disponibilidades.some((d) => d.abarca(horaInicio) || d.abarca(horaFinal))) {
            throw new Error("El médico no tiene disponibilidad en el horario solicitado.");
        }
        const turnosDelMedico = await this.turnoRepository.turnosDe(turno.medico.id);
        const turnoNuevo = {
            fechaInicio: horaInicio,
            fechaFinal: horaFinal
        };
        const tieneConflicto = turnosDelMedico.some(t => {
            if (t.id === turnoId) return false;
            return !this.turnoService.noSeSuperponen(t, turnoNuevo);
        });
        if (tieneConflicto) {
            throw new Error("El médico ya tiene un turno asignado en ese horario.");
        }
        turno.fechaInicio = horaInicio;
        turno.fechaFinal = horaFinal;
        await this.turnoRepository.update(turno, turnoId);
    }

    async evaluarTurnoPendiente(turnoId, pacienteId, respuestaAceptar){
        const turno = await this.turnoRepository.findById(turnoId);
        if(String(turno.paciente.id) === String(pacienteId) && turno.fechaInicio > Date.now()){
            console.log("respuesta del paciente:", respuestaAceptar);
            if(respuestaAceptar){
                turno.actualizarEstado(EstadoTurno.RESERVADO, turno.paciente, "Reprogramación aceptada");
                await this.turnoRepository.update(turno, turnoId);
            }else{
                await turno.darDeBaja("No se aceptó la reprogramación");
                await this.turnoRepository.delete(turno.id);
            }
        }
        else{
            throw new BadRequestError("El paciente no esta asignado a ese turno o la fecha de inicio del turno ya paso.");
        }
    }
}