import { DisponibilidadRepository } from "../repositories/disponibilidadRepository.js";
import { TurnoRepository } from "../repositories/turnoRepository.js";
import { Medico } from "../domain/medico.js";
import { DisponibilidadHoraria } from "../domain/disponibilidadHoraria.js";
import { ConflictError } from "../errors/AppError.js";
import { NotFoundError } from "../errors/AppError.js";

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
    
    async estaDisponible(medicoId, turno) {
        const fechaInicio = turno.fechaInicio;
        const fechaFinal = turno.fechaFinal;
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;

        return disponibilidadesMedico.some((d) => d.abarca(fechaInicio) || d.abarca(fechaFinal));
    }

    async yaTieneTurno(medicoId, turnoChequear, turnoService) {
        const turnosYaDados = turnoService.filtrarPor(medicoId);

        return turnosYaDados.some((t) => !turnoService.noSeSuperponen(t, turnoChequear));
    }
    async crearMedico(usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades) {
        try {
            const medicoExistente = await this.medicoRepository.findByMatricula(matricula);
            if (medicoExistente) {
                throw new ConflictError("El médico que intentas crear ya existe.");
            }
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                const nuevoMedico = new Medico(null, usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades);
                return await this.medicoRepository.create(nuevoMedico);
            }

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

    async perteneceASede(medicoId, sedeId) {
        const medico = await this.medicoRepository.findById(medicoId);
        return medico.sedes.some(s => s.id === sedeId);
    }
}