import { DisponibilidadService } from '../services/disponibilidadService.js';
import {ERRORES} from "../errors/erroresUtilities.js";

class DisponibilidadController {
    constructor() {
        // o inyectar
        this.disponibilidadService = new DisponibilidadService();
    }

    // GET /disponibilidades
    async obtenerTodas(req, res) {
        try {
            const disponibilidades = await this.disponibilidadService.obtenerTodas();
            res.status(200).json(disponibilidades);
        } catch(error) {
            res.status(ERRORES.SERVER_ERROR.status).json({ mensaje: ERRORES.SERVER_ERROR.mensaje });
        }
    }

    // GET /disponibilidades/:id
    async obtenerDisponibilidad(req, res) {
        try {
            const { id } = req.params;
            const disponibilidad = await this.disponibilidadService.obtenerDisponibilidad(id);
            res.status(200).json(disponibilidad);
        } catch(error) {
            res.status(ERRORES.NOT_FOUND.status).json({ mensaje: ERRORES.NOT_FOUND.mensaje });
        }
    }

    // POST /disponibilidades
    async crearDisponibilidad(req, res) {
        try {
            const { diaSemana, horaDesde, horaHasta } = req.body;
            const nuevaDispo = await this.disponibilidadService.crearDisponibilidad(diaSemana, horaDesde, horaHasta);
            res.status(201).json({
                mensaje: "Disponibilidad creada", data: nuevaDispo
            });
        } catch(error) {
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }

    // DELETE /disponibilidades/:id
    async eliminarDisponibilidad(req, res) {
        try {
            const { id } = req.params;
            await this.disponibilidadService.eliminarDisponibilidad(id);
            res.status(200).json({mensaje : "Disponibilidad eliminada"});
        } catch(error) {
            res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }    
}

const disponibilidadController = new DisponibilidadController();
export default disponibilidadController;