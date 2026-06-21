import { ServicioRepository } from '../repositories/servicioRepository.js';

class ServicioController {
    constructor() {
        this.servicioRepository = new ServicioRepository();
    }

    // GET /servicios
    async obtenerTodos(req, res, next) {
        try {
            const servicios = await this.servicioRepository.findAll();
            res.status(200).json(servicios);
        } catch (error) {
            return next(error);
        }
    }
}

const servicioController = new ServicioController();
export default servicioController;