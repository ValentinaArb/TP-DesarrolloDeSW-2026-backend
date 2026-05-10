import { MedicoService } from '../services/medicoService.js';
import { MedicoRepository } from '../repositories/medicoRepository.js';
import {ServicioRepository} from "../repositories/servicioRepository.js";
import { TurnoRepository} from "../repositories/turnoRepository.js";

class MedicoController {
    constructor() {
        this.medicoService = new MedicoService(new MedicoRepository());
        this.servicioRepository = new ServicioRepository();
        this.turnoRepository = new TurnoRepository();
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
            const { usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades } = req.body;
            const nuevoMedico = await this.medicoService.crearMedico(usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades);
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
            const turnoCambiado = await this.turnoRepository.findById(turnoId)
            res.status(200).json(turnoCambiado)
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
            const turnoCancelado = await this.turnoRepository.findById(turnoId);
            res.status(200).json(turnoCancelado);
        }
        catch(error){
            return next(error);
        }
    }
    //GET /medicos/:MedicoId/pacientes/:pacienteId
    async consultarHistorialTurnos(req, res, next){
        try{
            const{pacienteId, medicoId} = req.params
            const {estado} = req.query;
            const historial = await this.medicoService.consultarHistorialTurnos(pacienteId, medicoId, estado);
            res.status(200).json(historial);
        }
        catch(error){
            return next(error);
        }
    }

    //GET medicos/:MedicoId/servicios/:ServiciosId
    async consultarDisponibilidad(req, res, next){
        try{
            const{medicoId, servicioId} = req.params
            const disponibilidad = await this.medicoService.consultarDisponibilidad(medicoId, servicioId);
            res.status(200).json(disponibilidad);
        }
        catch(error){
            return next(error);
        }
    }
    //POST /medicos/:idMedicos/servicios/servicios:id
    async darAltaServicio(req, res, next){
        try{
            const{medicoId, servicioId} = req.params;
            await this.medicoService.darDeAltaServicio(medicoId, servicioId)
            const servicioCreado = await this.servicioRepository.findById(servicioId);
            res.status(201).json(servicioCreado);
        }
        catch(error){
            return next(error);
        }
    }

    // DELETE /medicos/:id/servicios/:id
    async darDeBajaServicio(req, res, next){
        try{
            const{medicoId, ServicioId} = req.params;
            await this.medicoService.darDeBajaServicio(medicoId, ServicioId)
            res.status(200).json({mensaje: "Servicio dado de baja"})
        }
        catch(error){
            return next(error);
        }
    }
    //PATCH /servicios/:id
    async modificarServicio(req, res, next){
        try{
            const{servicioId} = req.params;
            const{nombre, duracionTurno, costo} = req.body;
            const servicioModificado = await this.medicoService.modificarServicio(servicioId, nombre, duracionTurno, costo);
            res.status(200).json(servicioModificado);
        }
        catch(error){
            return next(error);
        }
    }
}

const medicoController = new MedicoController();
export default medicoController;