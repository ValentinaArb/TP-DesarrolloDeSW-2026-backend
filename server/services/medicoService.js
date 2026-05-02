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
        const nuevaDisponibilidad = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta);
        await this.disponibilidadRepository.create(nuevaDisponibilidad);
        medico.agregarDisponibilidad(nuevaDisponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }

    async eliminarDisponibilidad(idMedico, idDisponibilidad) {
        const medico = await this.medicoRepository.findById(idMedico);
        const disponibilidad = await this.disponibilidadRepository.findById(idDisponibilidad);

        medico.eliminarDisponibilidad(disponibilidad);
        await this.disponibilidadRepository.delete(idDisponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }
//!!VER
    async estaDisponible(medicoId, turno) {
        const fechaInicio = turno.fechaInicio;
        const fechaFinal = turno.fechaFinal;
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;

        console.log("[DEBUG] fechaInicio:", fechaInicio);
        console.log("[DEBUG] fechaFinal:", fechaFinal);
        console.log("[DEBUG] diaSemana fechaInicio:", fechaInicio.getDay());
        console.log("[DEBUG] diaSemana fechaFinal:", fechaFinal.getDay());
        console.log("[DEBUG] disponibilidades:", JSON.stringify(disponibilidadesMedico, null, 2));

        return disponibilidadesMedico.some((d) => d.abarca(fechaInicio) || d.abarca(fechaFinal));
    }

    //!!VER
    async yaTieneTurno(medicoId, turnoChequear, turnoService) {
        const turnosYaDados = turnoService.filtrarPor(medicoId);

        console.log("[DEBUG] ----------------- turnosService del médico:", turnosYaDados);
        console.log("[DEBUG] ----------------------------turnoChequear:", turnoChequear);

        return turnosYaDados.some((t) => !turnoService.noSeSuperponen(t, turnoChequear));
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
        return medico.sedes.some(s => s.id === sedeId);
    }
}