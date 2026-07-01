import { ServicioRepository } from '../repositories/servicioRepository.js';
import { Servicio } from '../domain/servicio.js';

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

    // POST /servicios
    // Si ya existe uno con mismo nombre+duracionTurno+costo, devuelve ese en lugar de crear uno nuevo
    async crearServicio(req, res, next) {
        try {
            const { nombre, duracionTurno, costo } = req.body;

            const todos = await this.servicioRepository.findAll();
            const existente = todos.find(s =>
                s.nombre === nombre &&
                s.duracionTurno === Number(duracionTurno) &&
                s.costo === Number(costo)
            );

            if (existente) {
                return res.status(200).json(existente);
            }

            const nuevoServicio = new Servicio(null, nombre, Number(duracionTurno), Number(costo));
            const creado = await this.servicioRepository.create(nuevoServicio);
            res.status(201).json(creado);
        } catch (error) {
            return next(error);
        }
    }
}

const servicioController = new ServicioController();
export default servicioController;