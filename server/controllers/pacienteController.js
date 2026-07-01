import { PacienteService } from "../services/pacienteService.js";
import { TurnoService } from "../services/turnoService.js";

class PacienteController {
  constructor() {
    this.pacienteService = new PacienteService();
    this.turnoService = new TurnoService();
  }

  //POST /pacientes/:pacienteId/turnos/:turnoId
  async reservarTurno(req, res, next) {
    try {
      const { pacienteId, turnoId } = req.params;
      await this.turnoService.darDeAlta(turnoId, pacienteId);
      res.status(200).json({ mensaje: "Turno reservado exitosamente" });
    } catch (error) {
      return next(error);
    }
  }
  // PATCH pacientes/:pacienteId/turnos/:turnoId
  async actualizarTurno(req, res, next) {
    try {
      const { pacienteId, turnoId } = req.params;
      const { motivo, horaInicio, estado, respuesta } = req.body;
      const turnoActualizado = await this.pacienteService.orquestrador(
        turnoId,
        pacienteId,
        motivo,
        horaInicio,
        estado,
        respuesta,
      );
      res.status(200).json(turnoActualizado);
    } catch (error) {
      next(error);
    }
  }

  async actualizarPaciente(req, res, next) {
    try {
      const { pacienteId } = req.params;
      const { obraSocial, plan, mail } = req.body;
      const pacienteActualizado = await this.pacienteService.actualizarPaciente(
        pacienteId,
        obraSocial,
        plan,
        mail,
      );
      res.status(200).json(pacienteActualizado);
    } catch (error) {
      next(error);
    }
  }

  //GET /pacientes/:pacienteId/turnos?estado=realizado
  async obtenerHistorialTurnos(req, res, next) {
    try {
      const { pacienteId } = req.params;
      const { estado } = req.query;
      const turnosHistorial = await this.pacienteService.obtenerTurnosPorEstado(
        pacienteId,
        estado,
      );
      res.status(200).json(turnosHistorial);
    } catch (error) {
      return next(error);
    }
  }

  async obtenerObrasSociales(req, res, next) {
    try {
      const obrasSociales = await this.pacienteService.obtenerobrasSociales();
      res.status(200).json(obrasSociales);
    } catch (error) {
      return next(error);
    }
  }

  /*
    async evaluarTurnoPendiente(req, res, next){
        try{
            const {turnoId, pacienteId} = req.params;
            const {respuesta} = req.query;
            await this.pacienteService.evaluarTurnoPendiente(turnoId, pacienteId,respuesta);
            res.status(200).json({ mensaje: "Cambio realizado con éxito" });
        }
        catch(error){
            return next(error);
        }
    }
     */
}
const pacienteController = new PacienteController();
export default pacienteController;
