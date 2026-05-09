import { MedicoService } from '../services/medicoService.js';
import { MedicoRepository } from '../repositories/medicoRepository.js';

class MedicoController {
    constructor() {
        this.medicoService = new MedicoService(new MedicoRepository());
    }

    // GET /medicos
    async obtenerTodos(req, res,next) {
        try {
            const medicos = await this.medicoService.obtenerTodos();
            res.status(200).json(medicos);
        } catch(error) {
            return next(error);
        }
    }

    // GET /medicos/:id
    async obtenerMedico(req, res,next) {
        try {
            const { id } = req.params;
            const medico = await this.medicoService.obtenerMedico(id);
            res.status(200).json(medico);
        } catch(error) {
            return next(error);
        }
    }

    // POST /medicos
    async crearMedico(req, res,next) {
        try {
            const { usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades } = req.body;
            const nuevoMedico = await this.medicoService.crearMedico(usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades);
            res.status(201).json({mensaje: "Médico creado", data: nuevoMedico});
        } 
        catch(error) {
            return next(error);
        }
    }

    // DELETE /medicos/:id
    async eliminarMedico(req, res,next) {
        try {
            const { id } = req.params;
            await this.medicoService.eliminarMedico(id);
            res.status(200).json({mensaje : "Médico eliminado"});
        } catch(error) {
            return next(error);
        }
    }

    // POST /medicos/:id/disponibilidad
    async agregarDisponibilidad(req, res, next) {
        try{
            const { id } = req.params;
            const { diaSemana, horaDesde, horaHasta } = req.body;

            await this.medicoService.agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta);
            res.status(200).json({mensaje: "Horario actualizado"});
        }
        catch(error) {
            return next(error);        
        }
    }

    // DELETE /medicos/:id/disponibilidad
    async eliminarDisponibilidad(req, res, next) {
        try{
            const { id, idDisponibilidad } = req.params;

            await this.medicoService.eliminarDisponibilidad(id, idDisponibilidad);
            res.status(200).json({mensaje: "Horario actualizado"});
        }
        catch(error) {
            return next(error);
        }
    }


    //PUT /medicos/:medicoId/disponibilidades/:disponibilidadAModificarId
    async modificarDisponibilidad(req, res, next){
        try {
            const {medicoId, disponibilidadAModificarId} = req.params;
            const {diaSemana, horaDesde, horaHasta} = req.body

            await this.medicoService.modificarDisponibilidad(medicoId, disponibilidadAModificarId, diaSemana, horaDesde, horaHasta);
            res.status(200).json({mensaje: "Disponibilidad Modificada"})
        }
        catch (error){
            return next(error)
        }
    }

    //PATCH /medicos/:medicoId/turnos/:turnoId
    async marcarTurnoComo(req, res, next){
        try{
            const {medicoId, turnoId} = req.params;
            const {estado} = req.body;
            await this.medicoService.marcarTurnoComo(medicoId, turnoId, estado);
            res.status(200).json({mensaje: "Estado de turno cambiado"})
        }
        catch (error){
            return next(error);
        }
    }

    //PATCH /medicos/:medicoId/turnos/:turnoId/cancelar
    async cancelarTurno(req, res, next){
        try{
            const {medicoId, turnoId} = req.params;
            const {motivo} = req.body;
            await this.medicoService.cancelarTurno(medicoId, turnoId, motivo);
            res.status(200).json({mensaje: "Turno Cancelado"});
        }
        catch(error){
            return next(error);
        }
    }
}

const medicoController = new MedicoController();
export default medicoController;