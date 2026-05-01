import { DisponibilidadRepository} from "../repositories/disponibilidadRepository.js";
import {TurnoRepository} from "../repositories/turnoRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";

export class MedicoService {
    constructor(medicoRepository) {
        this.medicoRepository = medicoRepository;
        this.turnoRepository = new TurnoRepository();
        this.disponibilidadRepository = new DisponibilidadRepository();
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

    async estaDisponible(medicoId, fechaInicio, turnoService, fechaFinal) {
        
        const fecha = new Date(fechaInicio); //VER
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;
        const turnosYaDados = turnoService.filtrarPor(medicoId); //VER DEVUELVE LISTA VACIA

        console.log("turnos ya dados: ", turnosYaDados);
        console.log("DISPONIBILIDADES: ", disponibilidadesMedico);
        console.log("RESULTADO ABARCA: ", !disponibilidadesMedico.some((d) => d.abarca(fecha)));
        console.log("RESULTADO YA DADOS: ", !turnosYaDados.some((t) => turnoService.seSuperponen(t.fechaInicio, t.fechaFinal, fechaInicio, fechaFinal)));
        return !disponibilidadesMedico.some((d) => d.abarca(fecha)) && !turnosYaDados.some((t) => turnoService.seSuperponen(t.fechaInicio, t.fechaFinal, fechaInicio, fechaFinal));
        // no tiene la disponibilidad o la fecha inicio del turno se superpone con algún turno que ya tiene en sus turnos
    }

    async yaTieneTurno(medicoId, fechaInicio) {
        const medico = await this.medicoRepository.findById(medicoId);
        const turnos = await this.turnoRepository.findAll();

        return turnos.some((turno) => (turno.medico === medico) && (turno.fechaInicio === fechaInicio));
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

    async perteneceASede(medicoId, sedeId){
        const medico = await this.medicoRepository.findById(medicoId);
        console.log("medico completo:", medico);
        console.log("medico.sedes:", medico.sedes);
        console.log("sede buscada:", sedeId);
        return medico.sedes.some(s => s.id == sedeId);
    }
}