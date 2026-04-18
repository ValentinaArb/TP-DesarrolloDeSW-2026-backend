import { TurnoService } from '../service/turnoService.js';

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
            res.status(500).json({mensaje : error.message});
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
            res.status(404).json({mensaje : error.message});
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
            res.status(400).json({mensaje: error.message});
        }
    }

    //PATCH turnos/:id/alta
    darDeAlta(req, res){
        try{
            const { id } = req.params;
            const {usuarioId} = req.body;
            this.turnoService.darDeAlta(id, usuarioId);
            res.status(200).json({mensaje : "Turno fue dado de alta con exito"});
        }
        catch(error){
            res.status(400).json({mensaje: error.mensaje});
        }
    }
    //PATCH turnos/:id/baja

    darDeBaja(req, res){
        try{
            const { id } = req.params;
            const {usuarioId, motivo} = req.body;
            this.turnoService.darDeBaja(id, usuarioId, motivo);
            res.status(200).json({mensaje : "Turno fue dado de baja con exito"});
        }
        catch(error){
            res.status(400).json({mensaje: error.mensaje});
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
            res.status(400).json({mensaje: error.message});
        }
    }    
}

const turnoController = new TurnoController();
export default turnoController;