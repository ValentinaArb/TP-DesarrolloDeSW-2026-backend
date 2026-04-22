import { TurnoService } from '../service/turnoService.js';
import { ERRORES, ErrorApp } from '../error/erroresUtilities.js';

class TurnoController{
    constructor() {
        this.turnoService = new TurnoService();
    }

    obtenerTodos(req,res){
        try{
            const turno = this.turnoService.obtenerTodos();
            res.status(200).json(turno);
        }
        catch(error){
            res.status(ERRORES.SERVER_ERROR.status).json({ mensaje: ERRORES.SERVER_ERROR.mensaje });
        }
    }

    //GET /turnos:id
    obtenerTurno(req,res){
        try{
            const { id } = req.params;
            const turno = this.turnoService.obtenerTurno(id);
            res.status(200).json(turno);
        }
        catch(error){
            res.status(ERRORES.NOT_FOUND_TURNO.status).json({ mensaje: ERRORES.NOT_FOUND_TURNO.mensaje });
        }
    }
    //POST /turnos
    crearTurno(req, res){
        try{
            const {medico, fechaHora, practica, sede} = req.body
            this.turnoService.crearTurno(medico, fechaHora, practica, sede);
            res.status(201).json({mensaje: "Turno creado exitosamente."})
        }
        catch(error){
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }

    //PATCH turnos/:id/alta
    darDeAlta(req, res){
        try{
            const { id } = req.params;
            const {pacienteId} = req.body;
            this.turnoService.darDeAlta(id, pacienteId);
            res.status(200).json({mensaje : "Turno fue dado de alta con exito"});
        }
        catch(error){
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }
    //PATCH turnos/:id/baja
    async darDeBaja(req, res) {
        try {
            const {id} = req.params;
            const {motivo} = req.body;
            await this.turnoService.darDeBaja(id, motivo);
            res.status(200).json({mensaje: "Turno fue dado de baja con exito"});
        } catch (error) {
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }
    //DELETE turnos/:id
    eliminarTurno(req,res){
        try{
            const {id} = req.params;
            this.turnoService.eliminarTurno(id);
            res.status(200).json({mensaje : "Turno fue dado eliminado con exito"});
        }
        catch(error){
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }    
}

const turnoController = new TurnoController();
export default turnoController;