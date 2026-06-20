import { TurnoRepository } from "../repositories/turnoRepository.js";
import { MedicoRepository } from "../repositories/medicoRepository.js";
import { PacienteRepository } from "../repositories/pacienteRepository.js";
import { TurnoService } from "./turnoService.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { ConflictError, NotFoundError } from "../errors/AppError.js";
import { BadRequestError } from "../errors/AppError.js";
import { actualizarTurnoSchema } from "../schemas/actualizarTurno.schema.js";
import { actualizarPacienteSchema } from "../schemas/actualizarPacienteSchema.js";

export class PacienteService {
  constructor() {
    this.turnoService = new TurnoService();
    this.turnoRepository = new TurnoRepository();
    this.pacienteRepository = new PacienteRepository();
    this.medicoRepository = new MedicoRepository();
  }

  async orquestrador(
    turnoId,
    pacienteId,
    motivo,
    horaInicio,
    estado,
    respuesta,
  ) {
    const resultado = actualizarTurnoSchema.safeParse({
      horaInicio,
      motivo,
      estado,
      respuesta,
    });

    if (!resultado.success) {
      throw new BadRequestError(
        resultado.error.errors.map((e) => e.message).join(", "),
      );
    }

    const validado = resultado.data;

    if (validado.horaInicio !== undefined) {
      return await this.hacerCambioFecha(
        pacienteId,
        turnoId,
        new Date(validado.horaInicio),
      );
    }
    if (validado.motivo !== undefined) {
      const turno = await this.turnoRepository.findById(turnoId);
      if (turno.paciente.id !== pacienteId) {
        throw new NotFoundError("El turno no pertenece a este paciente.");
      }
      return await this.turnoService.darDeBaja(
        turnoId,
        validado.motivo,
        EstadoTurno.DISPONIBLE,
      );
    }
    if (validado.estado === "PENDIENTE" && validado.respuesta !== undefined) {
      return await this.evaluarTurnoPendiente(turnoId, validado.respuesta);
    }
  }

  async actualizarPaciente(pacienteId, obraSocial, plan, mail) {
    const paciente = await this.pacienteRepository.findById(pacienteId);
    if (!paciente) {
      throw new NotFoundError("Paciente no encontrado");
    }
    const resultado = actualizarPacienteSchema.safeParse({
      obraSocial,
      plan,
      mail,
    });

    if (!resultado.success) {
      throw new BadRequestError(
        resultado.error.errors.map((e) => e.message).join(", "),
      );
    }

    const validado = resultado.data;

    if (validado.obraSocial !== undefined) {
      return await paciente.cambiarObraSocial(validado.obraSocial);
    }
    if (validado.plan !== undefined) {
      return await paciente.cambiarPlan(validado.plan);
    }
    if (validado.mail !== undefined) {
      return await paciente.cambiarMail(validado.mail);
    }
  }

  async obtenerTurnosPorEstado(pacienteId, estadoPedido) {
    const turnos = await this.turnoRepository.turnosPara(pacienteId);
    return turnos.filter((t) => String(t.estado) === String(estadoPedido));
  }

  async hacerCambioFecha(pacienteId, turnoId, horaInicio) {
    const turno = await this.turnoRepository.findById(turnoId);
    const horaFinal = new Date(
      horaInicio.getTime() + turno.servicio.duracionTurno * 60000,
    );
    const medicoId = turno.medico.id;
    const medico = await this.medicoRepository.findById(medicoId);
    if (!medico.tieneDisponibilidadEnHorario(horaInicio, horaFinal)) {
      throw new NotFoundError(
        "El médico no tiene disponibilidad en el horario solicitado.",
      );
    }
    const turnosDelMedico = await this.turnoRepository.turnosDe(
      turno.medico.id,
    );
    const turnoNuevo = {
      fechaInicio: horaInicio,
      fechaFinal: horaFinal,
    };
    const tieneConflicto = turnosDelMedico.some((t) => {
      if (t.id === turnoId) return false;
      return !this.turnoService.noSeSuperponen(t, turnoNuevo);
    });
    if (tieneConflicto) {
      throw new ConflictError(
        "El médico ya tiene un turno asignado en ese horario.",
      );
    }
    turno.fechaInicio = horaInicio;
    turno.fechaFinal = horaFinal;
    await this.turnoRepository.update(turno, turnoId);
    return turno;
  }

  async evaluarTurnoPendiente(turnoId, respuestaAceptar) {
    const turno = await this.turnoRepository.findById(turnoId);
    if (turno.fechaInicio > Date.now()) {
      if (respuestaAceptar === "true") {
        turno.actualizarEstado(
          EstadoTurno.RESERVADO,
          turno.paciente,
          "Reprogramación aceptada",
        );
        await this.turnoRepository.update(turno, turnoId);
      } else {
        await turno.darDeBaja("No se aceptó la reprogramación");
        await this.turnoRepository.delete(turno.id);
      }
    } else {
      throw new BadRequestError(
        "El paciente no esta asignado a ese turno o la fecha de inicio del turno ya paso.",
      );
    }
  }
}
