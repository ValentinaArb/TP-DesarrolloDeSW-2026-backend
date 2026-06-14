import { MedicoRepository } from "../repositories/medicoRepository.js";
import { TurnoRepository } from "../repositories/turnoRepository.js";
import { PacienteRepository } from "../repositories/pacienteRepository.js";
import { EstadoTurno } from "../domain/estadoTurno.js";
import { Turno } from "../domain/turno.js";
import { MedicoService } from "./medicoService.js";
import { UnprocessableEntityError } from "../errors/AppError.js";
import { ConflictError } from "../errors/AppError.js";
import { BadRequestError } from "../errors/AppError.js";
import { PlanRepository } from "../repositories/planRepository.js";
import { CambioEstadoTurno } from "../domain/cambioEstadoTurno.js";
import { FactoryNotificacion } from "../domain/factoryNotificacion.js";

export class TurnoService {
  constructor() {
    this.turnoRepository = new TurnoRepository();
    this.pacienteRepository = new PacienteRepository();
    this.medicoRepository = new MedicoRepository();
    this.medicoService = new MedicoService(this.medicoRepository);
    this.planRepository = new PlanRepository();
    this.factoryNotificacion = new FactoryNotificacion();
  }

  async darDeBaja(turnoId, motivo) {
    try {
      const turno = await this.turnoRepository.findById(turnoId);
      if (!turno.estaReservado()) {
        throw new ConflictError("El turno no está reservado.");
      }
      turno.darDeBaja(motivo);
      await this.turnoRepository.update(turno, turnoId);
      return turno;
    } catch (error) {
      console.error("Error al dar de baja el turno:", error);
      throw error;
    }
  }

  async darDeAlta(turnoId, pacienteId) {
    try {
      const paciente = await this.pacienteRepository.findById(pacienteId);
      const turno = await this.turnoRepository.findById(turnoId);
      const listaTurnos = await this.turnoRepository.turnosPara(pacienteId);
      const haySuperposicion = listaTurnos.find(
        (t) => !this.noSeSuperponen(t, turno),
      );
      if (haySuperposicion) {
        throw new ConflictError("El turno se superpone con uno existente.");
      }
      turno.darDeAlta(paciente);
      await this.turnoRepository.update(turno, turnoId);
    } catch (error) {
      console.error("Error al dar de alta el turno:", error);
      throw error;
    }
  }

  async crearTurno(
    { medicoId, fechaInicio, servicio, sede },
    medicoService = this.medicoService,
  ) {
    const medico = await this.medicoRepository.findById(medicoId);
    fechaInicio = new Date(fechaInicio);

    if (isNaN(fechaInicio.getTime())) {
      throw new BadRequestError(
        "El formato de la fecha de inicio es inválido.",
      );
    }

    if (fechaInicio < new Date()) {
      throw new UnprocessableEntityError(
        "No se pueden crear turnos en fechas pasadas.",
      );
    }

    const fechaFinal = new Date(
      fechaInicio.getTime() + servicio.duracionTurno * 60000,
    );

    const nuevoTurno = new Turno(
      null,
      medico,
      fechaInicio,
      fechaFinal,
      null,
      servicio,
      sede,
      EstadoTurno.DISPONIBLE,
      [
        new CambioEstadoTurno(
          null,
          Date.now(),
          EstadoTurno.DISPRESERVADO,
          null,
          null,
          null,
        ),
      ],
      servicio.costo,
    );

    const estaDisponible = await medicoService.estaDisponible(
      medicoId,
      nuevoTurno,
    );
    const perteneceASede = await medicoService.perteneceASede(
      medicoId,
      sede.id,
    );
    if (!estaDisponible) {
      throw new UnprocessableEntityError(
        "El medico no esta disponible en la fecha y hora indicada.",
      );
    }
    if (!(await nuevoTurno.servicioPerteneceAMedico(servicio.id))) {
      throw new UnprocessableEntityError(
        "El medico no realiza ese servicio especifico",
      );
    }
    if (!perteneceASede) {
      throw new UnprocessableEntityError("El medico no pertenece a esa sede");
    }
    const yaTieneTurno = await medicoService.yaTieneTurno(
      medicoId,
      nuevoTurno,
      this,
    );

    if (yaTieneTurno) {
      throw new ConflictError(
        "El medico ya tiene un turno asignado en la fecha y hora indicada.",
      );
    }
    return await this.turnoRepository.create(nuevoTurno);
  }

  async eliminarTurno(turnoId) {
    await this.turnoRepository.delete(turnoId);
  }

  async obtenerTurno(turnoId) {
    return await this.turnoRepository.findById(turnoId);
  }

  async obtenerTodos({
    pacienteId,
    filtros,
    orden,
    pagina = 1,
    limitePorPagina = 10,
  } = {}) {
    if (!this.validarPaginacion(pagina, limitePorPagina)) {
      throw new BadRequestError("Paginación errónea");
    }

    if (pacienteId) {
      return await this.buscarTurnosDisponibles(pacienteId, filtros, orden, {
        pagina,
        limitePorPagina,
      });
    }

    const { objetos: turno, totalObjetos: totalTurno } =
      await this.turnoRepository.findPaginated(pagina, limitePorPagina);
    const totalPaginas =
      totalTurno === 0 ? 0 : Math.ceil(totalTurno / limitePorPagina);

    return { turno, pagina, limitePorPagina, totalPaginas, totalTurno };
  }

  async modificarEstado(turnoId, { operacion, pacienteId, motivo }) {
    if (operacion === "alta") {
      if (!pacienteId)
        throw new BadRequestError("Falta el pacienteId para dar de alta");
      await this.darDeAlta(turnoId, pacienteId);
    } else if (operacion === "baja") {
      if (!motivo)
        throw new BadRequestError("Falta el motivo para dar de baja");
      await this.darDeBaja(turnoId, motivo);
    } else {
      throw new BadRequestError("Operación no válida");
    }
  }

  validarPaginacion(pagina, limitePagina) {
    return (
      Number.isInteger(pagina) &&
      pagina > 0 &&
      Number.isInteger(limitePagina) &&
      limitePagina > 0
    );
  }

  async filtrarPor(medicoId) {
    return await this.turnoRepository.turnosDe(medicoId);
  }

  noSeSuperponen(turno1, turno2) {
    return (
      turno2.fechaFinal < turno1.fechaInicio ||
      turno2.fechaInicio > turno1.fechaFinal
    );
  }

  async buscarTurnosDisponibles(
    pacienteId,
    filtros,
    orden,
    { pagina = 1, limitePorPagina = 10 } = {},
  ) {
    if (!this.validarPaginacion(pagina, limitePorPagina)) {
      throw new BadRequestError("Paginación errónea");
    }

    const paciente = await this.pacienteRepository.findById(pacienteId);

    let plan = null;
    plan = await this.planRepository.findByNombre(paciente.plan.nombre);
    console.log("Plan encontrado:", plan);
    if (!plan) {
      return {
        status: "success",
        data: [],
        errorNegocio: {
          icono: "plan",
          titulo: "Tu plan no cubre este servicio",
          descripcion: `Tu plan "${paciente.plan?.nombre || "actual"}" no tiene cobertura disponible. Consultá con tu obra social o buscá otro servicio.`,
        },
      };
    }

    const turnosDB =
      await this.turnoRepository.findDisponiblesByFilters(filtros);

    if (!turnosDB || turnosDB.length === 0) {
      return {
        status: "success",
        data: [],
        errorNegocio: {
          icono: "filtros",
          titulo: "No encontramos turnos disponibles",
          descripcion:
            "No hay turnos que coincidan con tu búsqueda para los filtros seleccionados. Probá cambiando los filtros o buscando en otra sede.",
        },
      };
    }

    const turnosCotizados = turnosDB.map((turno) =>
      this._cotizarTurno(turno, plan),
    );

    const turnosCubiertos = turnosCotizados.filter(
      (t) => t.estadoPrestacion !== "NO_CUBIERTO",
    );

    if (turnosCubiertos.length === 0 && turnosCotizados.length > 0) {
      return {
        status: "success",
        data: [],
        errorNegocio: {
          icono: "plan",
          titulo: "Tu plan no cubre este servicio",
          descripcion:
            "No hay turnos disponibles con cobertura para tu obra social y plan actual. Consultá con tu obra social o buscá otro servicio.",
        },
      };
    }

    turnosCubiertos.sort((a, b) => {
      let valorA =
        orden.sortBy === "costo"
          ? a.montoAAbonar
          : new Date(`${a.fecha}T${a.hora}`).getTime();
      let valorB =
        orden.sortBy === "costo"
          ? b.montoAAbonar
          : new Date(`${b.fecha}T${b.hora}`).getTime();

      if (valorA < valorB) return orden.sortOrder === "asc" ? -1 : 1;
      if (valorA > valorB) return orden.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    const totalTurno = turnosCubiertos.length;
    const totalPaginas =
      totalTurno === 0 ? 0 : Math.ceil(totalTurno / limitePorPagina);
    const startIndex = (pagina - 1) * limitePorPagina;
    const turno = turnosCubiertos.slice(
      startIndex,
      startIndex + limitePorPagina,
    );

    return {
      status: "success",
      data: turno,
      paginacion: {
        numeroPagina: pagina,
        limitePorPagina,
        totalPaginas,
        totalTurno,
      },
    };
  }

  async modificarTurno(turnoId, horaInicio) {
    const turno = await this.turnoRepository.findById(turnoId);
    if (turno.horaHasta !== horaInicio) {
      const horaFinalPropuesta = new Date(
        horaInicio.getTime() + turno.servicio.duracionTurno * 60000,
      );
      turno.fechaInicio = horaInicio;
      turno.fechaFinal = horaFinalPropuesta;
      turno.estado = EstadoTurno.PENDIENTE;
      await this.turnoRepository.update(turno, turnoId);
      return await this.factoryNotificacion.crearSegunEstadoTurno(turno);
    } else {
      throw new BadRequestError(
        "El turno no pertenece a este médico o la hora de inicio es la misma que la actual.",
      );
    }
  }

  _cotizarTurno(turno, plan) {
    const cotizacion = plan.calcularCostoAbonar(turno.servicio.id, turno.costo);
    const fechaObj = new Date(turno.fechaInicio);

    return {
      turnoId: turno.id,
      estadoPrestacion: cotizacion.estadoPrestacion,
      montoAAbonar: cotizacion.monto,
      profesional:
        `${turno.medico.nombre || ""} ${turno.medico.apellido || ""}`.trim(),
      servicio: turno.servicio.nombre || "N/A",
      fecha: fechaObj.toISOString().split("T")[0],
      hora: fechaObj.toTimeString().split(" ")[0],
      sede: turno.sede?.nombre || "N/A",
    };
  }
}
