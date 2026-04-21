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
            throw ERRORES.SERVER_ERROR;
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
            throw ERRORES.NOT_FOUND_TURNO;
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
            throw ERRORES.BAD_REQUEST;
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
            throw ERRORES.BAD_REQUEST;
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
            throw ERRORES.BAD_REQUEST;
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
            throw ERRORES.BAD_REQUEST;
        }
    }    
}

const turnoController = new TurnoController();
export default turnoController;