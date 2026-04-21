import { DisponibilidadRepository } from '../repository/disponibilidadRepository.js';

export class DisponibilidadService {
    constructor() {
        // sino, se podria inyectar
        this.disponibilidadRepository = new DisponibilidadRepository();
    }   

// en realidad, todos estos metodos que interactuan con el repository deberian ser async --> como ahora es un array lo dejo para dsp
    crearDisponibilidad(medicoId, diaSemana, horaInicio, horaFin, sede) {
        const nuevaDisponibilidad = new Disponibilidad(id, medicoId, diaSemana, horaInicio, horaFin, sede);
        this.disponibilidadRepository.create(nuevaDisponibilidad);
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

    estaDisponible(medicoId, fechaHora) {
        const disponibilidades = this.disponibilidadRepository.findAll();
        
        // lógica para filtrar las disponibilidades del médico
        // ver si la fecha/hora recibida cae dentro de sus horarios
        const medicoDisponible = disponibilidades.filter(d => d.medicoId === medicoId);
        
        return medicoDisponible.length > 0; 
    }
}