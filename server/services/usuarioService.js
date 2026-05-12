import { TurnoRepository } from "../repositories/turnoRepository.js";
import {TurnoService} from "./turnoService.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {NotFoundError} from "../errors/AppError.js";

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
        const turnos = this.turnoRepository.turnosPara(Number(pacienteId));
        return turnos.filter(t => t.estado === estadoPedido)
    }

}