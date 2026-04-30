import {MedicoRepository} from "../repositories/medicoRepository.js";
import {TurnoRepository} from "../repositories/turnoRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {DisponibilidadRepository} from "../repositories/disponibilidadRepository.js";
import {TurnoService} from "./turnoService.js";


export class MedicoService {

    constructor() {
        this.medicoRepository = new MedicoRepository();
        this.turnoRepository = new TurnoRepository();
        this.disponibilidadRepository = new DisponibilidadRepository();
        this.turnoService = new TurnoService()
    }

    async agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta) {
        const medico = await this.medicoRepository.findById(id);
        console.log("medico")
        const nuevaDisponibilidad = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta);
        console.log("nuevaDispo")
        await this.disponibilidadRepository.create(nuevaDisponibilidad);
        console.log("createDispo")

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
        const turnosYaDados = this.turnoRepository.filtrarPor(medicoId);
        return disponibilidadesMedico.some((d) => d.abarca(fecha)) && !turnosYaDados.some((t => this.turnoService.seSuperponen(t._fechaHora,t._fechaFinal, fechaHora)))
        // no tiene la disponibilidad o la fecha inicio del turno se superpone con algún turno que ya tiene en sus turnos
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