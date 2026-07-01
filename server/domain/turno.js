import { CambioEstadoTurno } from "./cambioEstadoTurno.js";
import { EstadoTurno } from "./estadoTurno.js";
import { BadRequestError, ConflictError } from "../errors/AppError.js";
import { FactoryNotificacion } from "./factoryNotificacion.js";

export class Turno {
  id;
  medico;
  fechaInicio;
  fechaFinal;
  paciente;
  servicio;
  sede;
  estado;
  historialDeEstados;
  costo;

  constructor(
    id = null,
    medico,
    fechaInicio,
    fechaFinal,
    paciente = null,
    servicio,
    sede,
    estado,
    estados,
    costo = null,
  ) {
    this.id = id;
    this.medico = medico;
    this.fechaInicio =
      fechaInicio instanceof Date ? fechaInicio : new Date(fechaInicio);
    this.fechaFinal =
      fechaFinal instanceof Date ? fechaFinal : new Date(fechaFinal);
    this.paciente = paciente;
    this.servicio = servicio;
    this.sede = sede;
    this.estado = estado;
    this.historialDeEstados = estados;
    this.costo = costo;
  }

  async darDeBaja(motivo) {
    if (this.verificarBaja()) {
      await this.actualizarEstado(
        EstadoTurno.DISPONIBLE,
        this.paciente,
        motivo,
      );
    } else {
      throw new ConflictError(
        "Los turnos se deben cancelar con al menos una hora de antelación.",
      );
    }
  }

  async darDeAlta(paciente) {
    if (this.estado === EstadoTurno.DISPONIBLE) {
      await this.actualizarEstado(EstadoTurno.RESERVADO, paciente);
    } else {
      throw new ConflictError("Whoops! El turno no está disponible.");
    }
  }

  async actualizarEstado(nuevoEstado, paciente, motivo) {
    if (this.medico && typeof this.set === 'function') {
      this.set('medico.usuario', { _id: this.medico._id });
    }

    let cambio = new CambioEstadoTurno(
      null,
      Date.now(),
      nuevoEstado,
      this.id,
      paciente,
      motivo,
    );
    const factoryNotificacion = new FactoryNotificacion();
    this.historialDeEstados.push(cambio);
    this.estado = nuevoEstado;
    if (
      nuevoEstado === EstadoTurno.DISPONIBLE ||
      nuevoEstado === EstadoTurno.CANCELADO
    ) {
       await factoryNotificacion.crearNotificacion(this);
      this.paciente = null; 
    } else {
      this.paciente = paciente;
       await factoryNotificacion.crearNotificacion(this);
    }

    return null;
  }

  verificarBaja() {
    const ahora = new Date();
    const horaTurno = this.fechaInicio;

    const tiempoQueFaltaParaTurno = horaTurno - ahora;
    const unaHora = 60 * 60 * 1000;

    return tiempoQueFaltaParaTurno >= unaHora;
  }
  estaReservado() {
    return this.estado === EstadoTurno.RESERVADO;
  }

  async servicioPerteneceAMedico(servicioId) {
    return this.medico.servicios.some((s) => s._id.toString() === servicioId);
  }

  crearMensaje() {
    const fechaLimpia =
      this.fechaInicio.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " a las " +
      this.fechaInicio.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Caso especial: respuesta del paciente a un cambio de horario
    if (this.origenNotificacion === "RESPUESTA_CAMBIO_HORARIO") {
      const fueAceptado = this.estado === EstadoTurno.RESERVADO;
      const mensaje = fueAceptado
        ? `El paciente ${this.paciente?.nombre ?? ""} aceptó el cambio de horario para el turno del ${fechaLimpia}.`
        : `El paciente rechazó el cambio de horario propuesto para el turno del ${fechaLimpia}. El turno quedó DISPONIBLE nuevamente.`;

      return { mensaje, destinatario: this.medico, remitente: this.paciente };
    }

    let mensaje = "";
    let destinatario;
    let remitente;

    switch (this.estado) {
      case "REALIZADO":
        mensaje = `Tu turno para el ${fechaLimpia} fue realizado.`;
        destinatario = this.paciente;
        remitente = this.medico;
        break;
      case "CANCELADO":
        mensaje = `El turno del día ${fechaLimpia} fue cancelado.`;
        destinatario = this.paciente;
        remitente = this.medico;
        break;
      case "DISPONIBLE":
        mensaje = `El turno del ${fechaLimpia} fue cancelado.`;
        destinatario = this.medico;
        remitente = this.paciente;
        break;
      case "RESERVADO":
        mensaje = `El turno del ${fechaLimpia} fue reservado por el paciente ${this.paciente.nombre} para el servicio ${this.servicio.nombre}.`;
        destinatario = this.medico;
        remitente = this.paciente;
        break;
      case "PENDIENTE":
        mensaje = `El turno del ${fechaLimpia} fue modificado por el médico ${this.medico.nombre}. Por favor, revisa los detalles del turno y acepta o rechaza.`;
        destinatario = this.paciente;
        remitente = this.medico;
        break;
      default:
        throw new BadRequestError(
          "Estado de turno no reconocido para notificar",
        );
    }
    return { mensaje, destinatario, remitente };
  }

  async cambiarHorario(nuevaFechaInicio, nuevaFechaFinal, motivo) {
    if (this.estado !== EstadoTurno.RESERVADO) {
      throw new ConflictError("Solo se puede modificar el horario de un turno reservado.");
    }
    this.fechaInicio = nuevaFechaInicio;
    this.fechaFinal = nuevaFechaFinal;
    await this.actualizarEstado(EstadoTurno.PENDIENTE, this.paciente, motivo);
  }

  async responderCambioHorario(aceptado, motivo) {
    if (this.estado !== EstadoTurno.PENDIENTE) {
      throw new ConflictError("El turno no tiene un cambio de horario pendiente.");
    }
    const nuevoEstado = aceptado ? EstadoTurno.RESERVADO : EstadoTurno.DISPONIBLE;
    this.origenNotificacion = "RESPUESTA_CAMBIO_HORARIO"; // flag transitorio, no se persiste
    await this.actualizarEstado(nuevoEstado, this.paciente, motivo);
    this.origenNotificacion = null;
  }
}
