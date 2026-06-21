import { MedicoService } from '../services/medicoService.js';
import { TurnoService } from '../services/turnoService.js';
import { MedicoRepository } from '../repositories/medicoRepository.js';

class MedicoController {
    constructor() {
        this.medicoService = new MedicoService(new MedicoRepository());
        this.turnoService = new TurnoService();
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
            const { diaSemana, horaDesde, horaHasta, servicio, sede } = req.body;

            await this.medicoService.agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta, servicio, sede);
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
            const {medicoId, disponibilidadId} = req.params;
            const {diaSemana, horaDesde, horaHasta, servicio, sede} = req.body

            await this.medicoService.modificarDisponibilidad(medicoId, disponibilidadId, diaSemana, horaDesde, horaHasta, servicio, sede);
            res.status(200).json({mensaje: "Disponibilidad Modificada"})
        }
        catch (error){
            return next(error)
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
            const servicioCreado = await this.medicoService.darDeAltaServicio(medicoId, servicioId)
            res.status(201).json(servicioCreado);
        }
        catch(error){
            return next(error);
        }
    }

    // DELETE /medicos/:id/servicios/:id
    async darDeBajaServicio(req, res, next){
        try{
            const{medicoId, servicioId} = req.params;
            await this.medicoService.darDeBajaServicio(medicoId, servicioId)
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

    async modificarTurno(req, res, next){
        try{
            const{medicoId, turnoId} = req.params;
            const {horaInicio, estado} = req.body;
            await this.medicoService.orquestradorMedico(medicoId, turnoId, new Date(horaInicio), estado, this.turnoService);
            res.status(200).json("El turno fue modificado");
        }catch(error){
            return next(error);
        }
    }

    async turnosDeMedico(req, res, next){
        try{
            const {medicoId} = req.params;
            const { estado } = req.query;
            const turnos = await this.turnoService.filtrarPor(medicoId, estado);
            res.status(200).json(turnos);
        }
        catch(error){
            return next(error);
        }
    }
}

const medicoController = new MedicoController();
export default medicoController;