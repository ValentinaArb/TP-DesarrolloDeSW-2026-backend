import { MedicoService } from '../service/medicoService.js';
import {ERRORES} from "../error/erroresUtilities.js";

class MedicoController {
    constructor() {
        this.medicoService = new MedicoService();
    }

    // GET /medicos
    async obtenerTodos(req, res) {
        try {
            const medicos = await this.medicoService.obtenerTodos();
            res.status(200).json(medicos);
        } catch(error) {
            res.status(ERRORES.SERVER_ERROR.status).json({ mensaje: ERRORES.SERVER_ERROR.mensaje });
        }
    }

    // GET /medicos/:id
    async obtenerMedico(req, res) {
        try {
            const { id } = req.params;
            const medico = await this.medicoService.obtenerMedico(id);
            res.status(200).json(medico);
        } catch(error) {
            res.status(ERRORES.NOT_FOUND.status).json({ mensaje: ERRORES.NOT_FOUND.mensaje });
        }
    }

    // POST /medicos
    async crearMedico(req, res) {
        try {
            const { usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades } = req.body;
            const nuevoMedico = await this.medicoService.crearMedico(usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades);
            res.status(201).json({mensaje: "Médico creado", data: nuevoMedico});
        } 
        catch(error) {
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }

    // DELETE /medicos/:id
    async eliminarMedico(req, res) {
        try {
            const { id } = req.params;
            await this.medicoService.eliminarMedico(id);
            res.status(200).json({mensaje : "Médico eliminado"});
        } catch(error) {
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }    
}

const medicoController = new MedicoController();
export default medicoController;