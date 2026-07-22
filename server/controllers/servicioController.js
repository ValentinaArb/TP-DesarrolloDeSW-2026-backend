import { ServicioService } from '../services/servicioService.js';
import { Servicio } from '../domain/servicio.js';

class ServicioController {
    constructor() {
        this.servicioService = new ServicioService();
    }

    // GET /servicios
    async obtenerTodos(req, res, next) {
        try {
            const servicios = await this.servicioService.obtenerTodos();
            res.status(200).json(servicios);
        } catch (error) {
            return next(error);
        }
    }

    // POST /servicios
    // Si ya existe uno con mismo nombre+duracionTurno+costo, devuelve ese en lugar de crear uno nuevo
    async crearServicio(req, res, next) {
        try {
            const { nombre, duracionTurno, costo } = req.body;
            const creado = await this.servicioService.crearNuevoServicio(nombre, duracionTurno, costo);
            res.status(201).json(creado);
        } catch (error) {
            return next(error);
        }
    }
}

const servicioController = new ServicioController();
export default servicioController;