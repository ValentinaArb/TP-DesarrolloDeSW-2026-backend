import { UsuarioService } from '../services/usuarioService.js';
import {TurnoRepository} from '../repositories/turnoRepository.js';

class UsuarioController{
       constructor() {
           this.usuarioService = new UsuarioService();
           this.turnoRepository = new TurnoRepository();
       }

    //POST /pacientes/:pacienteId/turnos/:turnoId
    async reservarTurno(req, res, next){
        try{
            const {pacienteId, turnoId} = req.params;
            await this.usuarioService.reservarTurno(pacienteId, turnoId);
            const turno = this.turnoRepository.findById(turnoId)
            res.status(200).json(turno);
        }
        catch(error){
            return next(error);
        }
    }
    //PATCH pacientes/:id/turnos/:id
    async cancelarTurno(req, res, next){
           try{
               const {pacienteId, turnoId} = req.params;
               const {motivo} = req.body;
               await this.usuarioService.cancelarTurno(pacienteId, turnoId, motivo);
               res.status(200).json({mensaje: "Turno fue dado de baja con exito"});
           }
           catch(error){
               next(error);
           }
    }

    //GET /pacientes/:pacienteId/turnos?estado=realizado
    async obtenerHistorialTurnos(req, res, next){
        try{
            const { pacienteId} = req.params;
            const { estadoTurno } = req.query;
            const turnosHistorial = await this.usuarioService.obtenerTurnosPorEstado(pacienteId, estadoTurno);
            res.status(200).json(turnosHistorial);
        }
        catch(error){
            return next(error);
        }
    }
}
const usuarioController = new UsuarioController();
export default usuarioController;