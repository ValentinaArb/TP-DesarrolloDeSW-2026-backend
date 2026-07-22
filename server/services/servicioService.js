import { ServicioRepository } from '../repositories/servicioRepository.js';

class ServicioController {
    constructor() {
        this.servicioRepository = new ServicioRepository();
    }

    async obtenerTodos() {
            return await this.servicioRepository.findAll();
    }

    async crearNuevoServicio(nombre, duracionTurno, costo) {
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
        return await this.servicioRepository.create(nuevoServicio);
    }
}