import { DisponibilidadRepository} from '../repositories/disponibilidadRepository.js';
import {DisponibilidadHoraria} from '../domain/disponibilidadHoraria.js';

export class DisponibilidadService {
    constructor() {
        // si no, se podría inyectar
        this.disponibilidadRepository =  new DisponibilidadRepository();
    }

    async crearDisponibilidad(diaSemana, horaDesde, horaHasta) {
        const nuevaDisponibilidad = new DisponibilidadHoraria(null,diaSemana, horaDesde, horaHasta);
        if(diaSemana && horaDesde && horaHasta){
            return await this.disponibilidadRepository.create(nuevaDisponibilidad);
        }
        else {
            throw new Error();
        }
    }

    async eliminarDisponibilidad(disponibilidadId) {
        return await this.disponibilidadRepository.delete(disponibilidadId);
    }

    async obtenerDisponibilidad(disponibilidadId) {
        return await this.disponibilidadRepository.findById(disponibilidadId);
    }

    async obtenerTodas() {
        return await this.disponibilidadRepository.findAll();
    }
}