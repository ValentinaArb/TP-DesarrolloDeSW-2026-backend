import { DisponibilidadService } from '../services/disponibilidadService.js';

class DisponibilidadController {
    constructor() {
        this.disponibilidadService = new DisponibilidadService();
    }

    // GET /disponibilidades
    async obtenerTodas(req, res,next) {
        try {
            const disponibilidades = await this.disponibilidadService.obtenerTodas();
            res.status(200).json(disponibilidades);
        } catch(error) {
            return next(error);
        }
    }

    // GET /disponibilidades/:id
    async obtenerDisponibilidad(req, res,next) {
        try {
            const { id } = req.params;
            const disponibilidad = await this.disponibilidadService.obtenerDisponibilidad(id);
            res.status(200).json(disponibilidad);
        } catch(error) {
            return next(error);
        }
    }

    // POST /disponibilidades
    async crearDisponibilidad(req, res,next) {
        try {
            const { diaSemana, horaDesde, horaHasta, servicio, sede } = req.body;
            const nuevaDispo = await this.disponibilidadService.crearDisponibilidad(diaSemana, horaDesde, horaHasta, servicio, sede);
            res.status(201).json({
                mensaje: "Disponibilidad creada", data: nuevaDispo
            });
        } catch(error) {
            return next(error);
        }
    }

    // DELETE /disponibilidades/:id
    async eliminarDisponibilidad(req, res,next) {
        try {
            const { id } = req.params;
            await this.disponibilidadService.eliminarDisponibilidad(id);
            res.status(200).json({mensaje : "Disponibilidad eliminada"});
        } catch(error) {
            return next(error);
        }
    }    
}

const disponibilidadController = new DisponibilidadController();
export default disponibilidadController;