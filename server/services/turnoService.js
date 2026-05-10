import { MedicoRepository } from '../repositories/medicoRepository.js';
import { TurnoRepository } from "../repositories/turnoRepository.js";
import { PacienteRepository } from "../repositories/pacienteRepository.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { Turno } from "../domain/turno.js";
import { MedicoService } from './medicoService.js';
import { UnprocessableEntityError } from "../errors/AppError.js";
import { ConflictError } from "../errors/AppError.js";
import { BadRequestError } from "../errors/AppError.js";

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.pacienteRepository = new PacienteRepository();
        this.medicoRepository = new MedicoRepository();
        this.medicoService = new MedicoService(this.medicoRepository);
    }

    async darDeBaja(turnoId, motivo) {
        try {
            const turno = await this.turnoRepository.findById(turnoId);
            if (!turno.estado === EstadoTurno.RESERVADO) {
                console.error("El turno no esta reservado")
            }
            turno.darDeBaja(motivo);
            await this.turnoRepository.update(turno, turnoId);
        } catch (error) {
            console.error("Error al dar de baja el turno:", error);
            throw error;
        }
    }

    async darDeAlta(turnoId, pacienteId) {
        try {
            const paciente = await this.pacienteRepository.findById(pacienteId)
            const turno = await this.turnoRepository.findById(turnoId);
            const listaTurnos = this.turnoRepository.turnosPara(paciente);
            if (listaTurnos.some(t => this.noSeSuperponen(t, turno))) {
                turno.darDeAlta(paciente);
                await this.turnoRepository.update(turno, turnoId);
            }
        }
        catch (error) {
            console.error("Error al dar de alta el turno:", error);
            throw error;
        }
    }

    async crearTurno({ medicoId, fechaInicio, servicio, sede }, medicoService = this.medicoService) {
        const medico = await this.medicoRepository.findById(medicoId);
        fechaInicio = new Date(fechaInicio);

        if (isNaN(fechaInicio.getTime())) {
            throw new BadRequestError("El formato de la fecha de inicio es inválido.");
        }

        if (fechaInicio < new Date()) {
            throw new UnprocessableEntityError("No se pueden crear turnos en fechas pasadas.");
        }

        const fechaFinal = new Date(fechaInicio.getTime() + servicio.duracionEnMins * 60000);

        const nuevoTurno = new Turno(null, medico, fechaInicio, fechaFinal, null, servicio, sede, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, null)], null);

        const estaDisponible = await medicoService.estaDisponible(medicoId, nuevoTurno);
        const servicioPerteneceAMedico = await this.servicioPerteneceAMedico(medicoId, servicio.id);
        const perteneceASede = await medicoService.perteneceASede(medicoId, sede.id);
        if (!estaDisponible) {
            throw new UnprocessableEntityError("El medico no esta disponible en la fecha y hora indicada.");
        }
        if (!servicioPerteneceAMedico) {
            throw new UnprocessableEntityError("El medico no realiza ese servicio especifico");
        }
        if (!perteneceASede) {
            throw new UnprocessableEntityError("El medico no pertenece a esa sede");
        }
        const yaTieneTurno = await medicoService.yaTieneTurno(medicoId, nuevoTurno, this);

        if (yaTieneTurno) {
            throw new ConflictError("El medico ya tiene un turno asignado en la fecha y hora indicada.");
        }
        return await this.turnoRepository.create(nuevoTurno);
    }

    async eliminarTurno(turnoId) {
        await this.turnoRepository.delete(turnoId);
    }

    async obtenerTurno(turnoId) {
        return await this.turnoRepository.findById(turnoId);
    }

    async obtenerTodos({ pagina = 1, limitePorPagina = 10 } = {}) {
        if (this.validarPaginacion(pagina, limitePorPagina)) {
            const { objetos: turno, totalObjetos: totalTurno } = await this.turnoRepository.findPaginated(pagina, limitePorPagina);
            const totalPaginas = totalTurno === 0 ? 0 : Math.ceil(totalTurno / limitePorPagina);

            return {
                turno,
                pagina,
                limitePorPagina,
                totalPaginas,
                totalTurno
            }
        }
        else {
            throw new BadRequestError("Paginación errónea");
        }
    }

    validarPaginacion(pagina, limitePagina) {
        return Number.isInteger(pagina) &&
            pagina > 0 &&
            Number.isInteger(limitePagina) &&
            limitePagina > 0;
    }

    filtrarPor(medicoId) {
        return this.turnoRepository.turnosDe(medicoId);
    }

    noSeSuperponen(turno1, turno2) {
        return turno2.fechaFinal < turno1.fechaInicio || turno2.fechaInicio > turno1.fechaFinal
    }

    async servicioPerteneceAMedico(medicoId, servicioId) {
        const medico = await this.medicoRepository.findById(medicoId);
        return medico.servicios.some(s => s.id === servicioId)
    }

}