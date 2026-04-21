import { DisponibilidadService } from '../service/disponibilidadService.js';

class DisponibilidadController {
    constructor() {
        // o inyectar
        this.disponibilidadService = new DisponibilidadService();
    }

    // GET /disponibilidades
    obtenerTodas(req, res) {
        try {
            const disponibilidades = this.disponibilidadService.obtenerTodas();
            res.status(200).json(disponibilidades);
        } catch(error) {
            res.status(500).json({mensaje : error.message});
        }
    }

    // GET /disponibilidades/:id
    obtenerDisponibilidad(req, res) {
        try {
            const { id } = req.params;
            const disponibilidad = this.disponibilidadService.obtenerDisponibilidad(id);
            res.status(200).json(disponibilidad);
        } catch(error) {
            res.status(404).json({mensaje : error.message});
        }
    }

    // POST /disponibilidades
    crearDisponibilidad(req, res) {
        try {
            const { medicoId, diaSemana, horaInicio, horaFin, sede } = req.body;
            const nuevaDispo = this.disponibilidadService.crearDisponibilidad(medicoId, diaSemana, horaInicio, horaFin, sede);
            res.status(201).json({
                mensaje: "Disponibilidad creada", data: nuevaDispo
            });
        } catch(error) {
            res.status(400).json({mensaje: error.message});
        }
    }

    // DELETE /disponibilidades/:id
    eliminarDisponibilidad(req, res) {
        try {
            const { id } = req.params;
            this.disponibilidadService.eliminarDisponibilidad(id);
            res.status(200).json({mensaje : "Disponibilidad eliminada"});
        } catch(error) {
            res.status(400).json({mensaje: error.message});
        }
    }    
}

    // no tiene sentido un PATCH/PUT --> lo hago para completar el CRUD
    actualizarDisponibilidad(req, res) {
    try {
        const { id } = req.params; // El ID viejo viaja en la URL
        const datosNuevos = req.body; // Los datos nuevos viajan en el cuerpo

        this.disponibilidadService.actualizarDisponibilidad(id, datosNuevos);
        res.status(200).json({mensaje : "Disponibilidad actualizada con éxito"});
    } catch(error) {
        res.status(400).json({mensaje: error.message});
    }
}

const disponibilidadController = new DisponibilidadController();
export default disponibilidadController;