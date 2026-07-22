import { TurnoService } from "../services/turnoService.js";
import { MedicoService } from "../services/medicoService.js";
import { MedicoRepository } from "../repositories/medicoRepository.js";
import { EstadoTurno } from "../domain/estadoTurno.js";

class TurnoController {
  constructor() {
    this.turnoService = new TurnoService();
    this.medicoService = new MedicoService(new MedicoRepository());
  }

  async obtenerTodos(req, res, next) {
    try {
      const {
        pacienteId,
        medicoId,
        servicioId,
        sede,
        fechaDesde,
        fechaHasta,
        sortBy,
        sortOrder,
      } = req.query;
      const paginacion = this.extraerPaginacion(req.query);

      const filtros = { medicoId, servicioId, sede, fechaDesde, fechaHasta };
      const orden = {
        sortBy: sortBy === "costo" ? "costo" : "fecha",
        sortOrder: sortOrder === "desc" ? "desc" : "asc",
      };

      const resultado = await this.turnoService.obtenerTodos({
        pacienteId,
        filtros,
        orden,
        ...paginacion,
      });

      if (resultado.errorNegocio) {
        return res.status(200).json({
          status: "success",
          data: [],
          errorNegocio: resultado.errorNegocio,
        });
      }

      res.status(200).json({
        status: "success",
        data: resultado.data,
        paginacion: {
          numeroPagina: resultado.paginacion?.numeroPagina || resultado.pagina,
          limitePorPagina:
            resultado.paginacion?.limitePorPagina || resultado.limitePorPagina,
          totalPaginas:
            resultado.paginacion?.totalPaginas || resultado.totalPaginas,
          totalTurnos:
            resultado.paginacion?.totalTurnos || resultado.totalTurno,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  extraerPaginacion(query) {
    const pagina = query?.page === undefined ? 1 : Number(query.page);
    const limitePorPagina =
      query?.limit === undefined ? 12 : Number(query.limit);

    return { pagina, limitePorPagina };
  }

  //GET /turnos:id
  async obtenerTurno(req, res, next) {
    try {
      const { id } = req.params;
      const turno = await this.turnoService.obtenerTurno(id);
      res.status(200).json(turno);
    } catch (error) {
      return next(error);
    }
  }
  //POST /turnos
  async crearTurno(req, res, next) {
    try {
      //const {medicoId, fechaInicio, servicio, sede} = req.body
      const turnoCreado = await this.turnoService.crearTurno(
        req.body,
        this.medicoService,
      );
      res
        .status(201)
        .json({ mensaje: "Turno creado exitosamente.", data: turnoCreado });
    } catch (error) {
      return next(error);
    }
  }

  //PATCH turnos/:id/alta
  async darDeAlta(req, res, next) {
    try {
      const { id } = req.params;
      const { pacienteId } = req.body;
      await this.turnoService.darDeAlta(id, pacienteId);
      res.status(200).json({ mensaje: "Turno fue dado de alta con exito" });
    } catch (error) {
      return next(error);
    }
  }
  //PATCH turnos/:id/baja
  async darDeBaja(req, res, next) {
    try {
      const { id } = req.params;
      const { motivo } = req.body;
      await this.turnoService.darDeBaja(id, motivo);
      res.status(200).json({ mensaje: "Turno fue dado de baja con exito" });
    } catch (error) {
      return next(error);
    }
  }

  // PATCH /turnos/:id/horario
  async editarHorario(req, res, next) {
    try {
      const { id } = req.params;
      const { medicoId, horaInicio } = req.body;
      const turno = await this.turnoService.modificarTurno(medicoId, id, horaInicio);
      res.status(200).json({ mensaje: "Horario del turno modificado, notificación enviada al paciente", data: turno });
    } catch (error) {
      return next(error);
    }
  }

  //DELETE turnos/:id
  async eliminarTurno(req, res, next) {
    try {
      const { id } = req.params;
      await this.turnoService.eliminarTurno(id);
      res.status(200).json({ mensaje: "Turno fue eliminado con exito" });
    } catch (error) {
      return next(error);
    }
  }

  async modificarEstado(req, res, next) {
    try {
      const { id } = req.params;

      await this.turnoService.modificarEstado(id, req.body);
      res
        .status(200)
        .json({ mensaje: "Estado del turno modificado con éxito" });
    } catch (error) {
      return next(error);
    }
  }

  async responderCambioHorario(req, res, next) {
    try {
      const { id } = req.params;
      const { pacienteId, aceptado } = req.body;
      const turno = await this.turnoService.responderCambioHorario(id, pacienteId, aceptado);
      res.status(200).json({
        mensaje: aceptado ? "Cambio de horario aceptado" : "Cambio de horario rechazado",
        data: turno,
      });
    } catch (error) {
      return next(error);
    }
  }
}


const turnoController = new TurnoController();
export default turnoController;
