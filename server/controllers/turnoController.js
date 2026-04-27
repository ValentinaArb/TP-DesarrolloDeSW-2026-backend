import { TurnoService } from '../services/turnoService.js';

class TurnoController{
    constructor() {
        this.turnoService = new TurnoService();
    }

    async obtenerTodos(req,res,next){
        try{
            const turno = await this.turnoService.obtenerTodos();
            res.status(200).json(turno);
        }
        catch(error){
            return next(error);
        }
    }

    //GET /turnos:id
    async obtenerTurno(req,res,next){
        try{
            const { id } = req.params;
            const turno = await this.turnoService.obtenerTurno(id);
            res.status(200).json(turno);
        }
        catch(error){
            return next(error);
        }
    }
    //POST /turnos
    async crearTurno(req, res,next){
        try{
            //const {medicoId, fechaHora, practica, sede} = req.body
            const turnoCreado = await this.turnoService.crearTurno(req.body);
            res.status(201).json({mensaje: "Turno creado exitosamente.", data: turnoCreado})
        }
        catch(error){
            return next(error);
        }
    }

    //PATCH turnos/:id/alta
    async darDeAlta(req, res,next) {
        try {
            const {id} = req.params;
            const {pacienteId} = req.body;
            await this.turnoService.darDeAlta(id, pacienteId);
            res.status(200).json({mensaje : "Turno fue dado de alta con exito"});
        }
        catch(error){
            return next(error);
        }
    }
    //PATCH turnos/:id/baja
    async darDeBaja(req, res,next) {
        try {
            const {id} = req.params;
            const {motivo} = req.body;
            await this.turnoService.darDeBaja(id, motivo);
            res.status(200).json({mensaje: "Turno fue dado de baja con exito"});
        } catch (error) {
            return next(error);
        }
    }
    //DELETE turnos/:id
    async eliminarTurno(req,res,next){
        try{
            const {id} = req.params;
            await this.turnoService.eliminarTurno(id);
            res.status(200).json({mensaje : "Turno fue dado eliminado con exito"});
        }
        catch(error){
            return next(error);
        }
    }    
}

const turnoController = new TurnoController();
export default turnoController;