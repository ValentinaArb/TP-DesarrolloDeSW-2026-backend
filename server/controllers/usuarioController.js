import { UsuarioService } from '../services/usuarioService.js';
import {TurnoRepository} from '../repositories/turnoRepository.js';

class usuarioController{
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
}