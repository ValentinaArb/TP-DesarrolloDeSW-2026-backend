import { PacienteService } from '../services/pacienteService.js';
import {TurnoRepository} from '../repositories/turnoRepository.js';
import { Paciente } from '../domain/paciente.js';
import { BadRequestError } from '../errors/AppError.js';

class PacienteController{
       constructor() {
           this.pacienteService = new PacienteService();
           this.turnoRepository = new TurnoRepository();
       }

    //POST /pacientes/:pacienteId/turnos/:turnoId
    async reservarTurno(req, res, next){
        try{
            const {pacienteId, turnoId} = req.params;
            await this.pacienteService.reservarTurno(turnoId, pacienteId);
            const turno = await this.turnoRepository.findById(turnoId)
            res.status(200).json(turno);
        }
        catch(error){
            return next(error);
        }
    }
    // PATCH pacientes/:pacienteId/turnos/:turnoId
    async actualizarTurno(req, res, next) {
        try {
            const { pacienteId, turnoId } = req.params;
            const { motivo, horaInicio } = req.body;

            if (horaInicio !== undefined && motivo !== undefined) {
                throw new BadRequestError("No se pueden enviar motivo y horaInicio al mismo tiempo");
            }

            if (horaInicio !== undefined) {
                await this.pacienteService.hacerCambio(pacienteId, turnoId, new Date(horaInicio));
                return res.status(200).json({ mensaje: "Cambio realizado con éxito" });
            }

            if (motivo !== undefined) {
                await this.pacienteService.cancelarTurno(pacienteId, turnoId, motivo);
                return res.status(200).json({ mensaje: "Turno fue dado de baja con éxito" });
            }

            throw new BadRequestError("Se debe enviar horaInicio o motivo");

        } catch (error) {
            next(error);
        }
    }

    //GET /pacientes/:pacienteId/turnos?estado=realizado
    async obtenerHistorialTurnos(req, res, next){
        try{
            const { pacienteId} = req.params;
            const { estado } = req.query;
            const turnosHistorial = await this.pacienteService.obtenerTurnosPorEstado(pacienteId, estado);
            res.status(200).json(turnosHistorial);
        }
        catch(error){
            return next(error);
        }
    }
    async hacerCambio(req, res, next){
        try{
            const { pacienteId, turnoId } = req.params;
            const { horaInicio } = req.body;
            await this.pacienteService.hacerCambio(pacienteId, turnoId, new Date(horaInicio));
            res.status(200).json({ mensaje: "Cambio realizado con éxito" });
        }
        catch(error){
            return next(error);
        }
    }

    async evaluarTurnoPendiente(req, res, next){
        try{
            const {turnoId, pacienteId} = req.params;
            const {respuesta} = req.query;
            await this.pacienteService.evaluarTurnoPendiente(turnoId, pacienteId,respuesta);
            res.status(200).json({ mensaje: "Cambio realizado con éxito" });
        }
        catch(error){
            return next(error);
        }
    }

}
const pacienteController = new PacienteController();
export default pacienteController;