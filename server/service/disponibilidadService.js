import { DisponibilidadRepository } from '../repository/disponibilidadRepository.js';
import {DisponibilidadHoraria} from '../model/disponibilidadHoraria.js';
import {MedicoRepository} from '../repository/medicoRepository.js';

export class DisponibilidadService {
    constructor() {
        // sino, se podria inyectar
        this.disponibilidadRepository = new DisponibilidadRepository();
        this.medicoRepository = new MedicoRepository();
    }

// en realidad, todos estos metodos que interactuan con el repository deberian ser async --> como ahora es un array lo dejo para dsp
    async crearDisponibilidad(diaSemana, horaDesde, horaHasta) {
        const nuevaDisponibilidad = new DisponibilidadHoraria(null,diaSemana, horaDesde, horaHasta);
        if(diaSemana && horaDesde && horaHasta){
            return await this.disponibilidadRepository.create(nuevaDisponibilidad);
        }
        else
            throw new Error();
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

    // innecesario
    //actualizarDisponibilidad(idVieja, datosNuevos) {
    // se podria validar que los datos nuevos estén bien
    //this.disponibilidadRepository.update(datosNuevos, idVieja);
    //}
}