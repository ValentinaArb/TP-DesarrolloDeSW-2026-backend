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
    crearDisponibilidad(diaSemana, horaInicio, horaFin) {
        const nuevaDisponibilidad = new DisponibilidadHoraria(diaSemana, horaInicio, horaFin);
        return this.disponibilidadRepository.create(nuevaDisponibilidad);
    }

    eliminarDisponibilidad(disponibilidadId) {
        this.disponibilidadRepository.delete(disponibilidadId);
    }

    obtenerDisponibilidad(disponibilidadId) {
        return this.disponibilidadRepository.findById(disponibilidadId);
    }

    obtenerTodas() {
        return this.disponibilidadRepository.findAll();
    }

    // innecesario
    actualizarDisponibilidad(idVieja, datosNuevos) {
    // se podria validar que los datos nuevos estén bien
    this.disponibilidadRepository.update(datosNuevos, idVieja);
    }

    estaDisponible(medicoId, fechaHora) {
        const fecha = new Date(fechaHora);
        const medico = this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;


        disponibilidadesMedico.some((disponibilidad) => {disponibilidad.abarca(fecha)})
    }
}