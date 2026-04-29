import {MedicoRepository} from "../repository/medicoRepository.js";
import {TurnoRepository} from "../repository/TurnoRepository.js";
import {Medico} from "../model/medico.js";
import {DisponibilidadHoraria} from "../model/disponibilidadHoraria.js";
import {DisponibilidadRepository} from "../repository/disponibilidadRepository.js";

export class MedicoService {

    constructor() {
        this.medicoRepository = new MedicoRepository();
        this.turnoRepository = new TurnoRepository();
        this.disponibilidadRepository = new DisponibilidadRepository();
    }

    async agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta) {
        const medico = await this.medicoRepository.findById(id);
        console.log("medico")
        const nuevaDisponibilidad = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta);
        console.log("nuevadispo")
        await this.disponibilidadRepository.create(nuevaDisponibilidad);
        console.log("createdispo")

        medico.agregarDisponibilidad(nuevaDisponibilidad);
        console.log("agregarDisponibilidad");

        return await this.medicoRepository.update(medico, medico.id);
    }

    async eliminarDisponibilidad(idMedico, idDisponibilidad) {
        const medico = await this.medicoRepository.findById(idMedico);
        const disponibilidad = await this.disponibilidadRepository.findById(idDisponibilidad);

        medico.eliminarDisponibilidad(disponibilidad);
        await this.disponibilidadRepository.delete(idDisponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }

    async estaDisponible(medicoId, fechaHora) {
        const fecha = new Date(fechaHora);
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;

        return disponibilidadesMedico.some((d) => d.abarca(fecha));
    }

    async yaTieneTurno(medicoId, fechaHora) {
        const medico = await this.medicoRepository.findById(medicoId);
        const turnos = await this.turnoRepository.findAll();

        return turnos.some((turno) => (turno.medico === medico) && (turno.fechaHora === fechaHora));
    }

    async crearMedico(usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades) {
        try{const nuevoMedico = new Medico(null, usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades);
        return await this.medicoRepository.create(nuevoMedico);}
        catch(error) {
            console.error(error)
            throw error;
        }
    }

    async eliminarMedico(medicoId) {
        return await this.medicoRepository.delete(medicoId);
    }

    async obtenerMedico(medicoId) {
        return await this.medicoRepository.findById(medicoId);
    }

    async obtenerTodos() {
        return await this.medicoRepository.findAll();
    }
}