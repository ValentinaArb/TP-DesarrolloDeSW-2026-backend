import { TurnoService } from '../service/turnoService.js';

class TurnoController{
    constructor() {
        this.turnoService = new TurnoService();
    }

    async obtenerTodos(req,res){
        try{
            const turno = await this.turnoService.obtenerTodos();
            res.status(200).json(turno);
        }
        catch(error){
            res.status(500).json({mensaje : error.message});
        }
    }

    //GET /turnos:id
    async obtenerTurno(req,res){
        try{
            const { id } = req.params;
            const turno = await this.turnoService.obtenerTurno(id);
            res.status(200).json(turno);
        }
        catch(error){
            res.status(404).json({mensaje : error.message});
        }
    }
    //POST /turnos
    async crearTurno(req, res){
        try{
            const {medicoId, fechaHora, practica, sede} = req.body
            const turnoCreado = await this.turnoService.crearTurno(medicoId, fechaHora, practica, sede);
            res.status(201).json({mensaje: "Turno creado exitosamente.", data: turnoCreado})
        }
        catch(error){
            res.status(400).json({mensaje: error.message});
        }
    }

    //PATCH turnos/:id/alta
    async darDeAlta(req, res) {
        try {
            const {id} = req.params;
            const {pacienteId} = req.body;
            await this.turnoService.darDeAlta(id, pacienteId);
            res.status(200).json({mensaje: "Turno fue dado de alta con exito"});
        } catch (error) {
            res.status(400).json({error: error.message});
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
            res.status(400).json({error: error.message});
        }
    }
    //DELETE turnos/:id
    async eliminarTurno(req,res){
        try{
            const {id} = req.params;
            await this.turnoService.eliminarTurno(id);
            res.status(200).json({mensaje : "Turno fue dado eliminado con exito"});
        }
        catch(error){
            res.status(400).json({error: error.message});
        }
    }    
}

const turnoController = new TurnoController();
export default turnoController;