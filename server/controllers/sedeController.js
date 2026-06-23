import { SedeRepository } from '../repositories/sedeRepository.js';

class SedeController {
    constructor() {
        this.sedeRepository = new SedeRepository();
    }

    // GET /sedes
    async obtenerTodas(req, res, next) {
        try {
            const sedes = await this.sedeRepository.findAll();
            res.status(200).json(sedes);
        } catch (error) {
            return next(error);
        }
    }
}

const sedeController = new SedeController();
export default sedeController;