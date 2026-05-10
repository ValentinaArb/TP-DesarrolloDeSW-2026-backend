import { TurnoService } from '../services/turnoService.js';
import { MedicoService } from '../services/medicoService.js';
import {MedicoRepository} from "../repositories/medicoRepository.js";

class TurnoController{
    constructor() {
        this.turnoService = new TurnoService();
        this.medicoService = new MedicoService(new MedicoRepository());
    }

    async obtenerTodos(req,res,next){
        try{
            const paginacion = this.extraerPaginacion(req.query);
            const resultado = await this.turnoService.obtenerTodos(paginacion);
            res.status(200).json({
                status: 'success',
                data: resultado.turno,
                paginacion: {
                    numeroPagina: resultado.pagina,
                    limitePorPagina: resultado.limitePorPagina,
                    totalPaginas: resultado.totalPaginas,
                    totalTurnos: resultado.totalTurno
                }
            });
        }
        catch(error){
            return next(error);
        }
    }

    async obtenerTodos(req, res, next) {
        try {
            const { pacienteId, medicoId, servicioId, sede, fechaDesde, fechaHasta, sortBy, sortOrder } = req.query;
            const paginacion = this.extraerPaginacion(req.query);
            
            // si se recibe el id del paciente, llegaron queryparam
            if (pacienteId) {
                const filtros = { medicoId, servicioId, sede, fechaDesde, fechaHasta };
                const orden = {
                    sortBy: sortBy === 'costo' ? 'costo' : 'fecha',
                    sortOrder: sortOrder === 'desc' ? 'desc' : 'asc'
                };

                const resultado = await this.turnoService.buscarTurnosDisponibles(pacienteId, filtros, orden, paginacion);

                res.status(200).json({
                    status: 'success',
                    data: resultado.turno,
                    paginacion: {
                        numeroPagina: resultado.pagina,
                        limitePorPagina: resultado.limitePorPagina,
                        totalPaginas: resultado.totalPaginas,
                        totalTurnos: resultado.totalTurno
                    }
                });
            } else {
                // sino, se devuelven todos los turnos
                const resultado = await this.turnoService.obtenerTodos(paginacion);

                res.status(200).json({
                    status: 'success',
                    data: resultado.turno,
                    paginacion: {
                        numeroPagina: resultado.pagina,
                        limitePorPagina: resultado.limitePorPagina,
                        totalPaginas: resultado.totalPaginas,
                        totalTurnos: resultado.totalTurno
                    }
                });
            }
        } catch (error) {
            return next(error);
        }
    }

    extraerPaginacion(query){
        const pagina = query?.page === undefined ? 1 : Number(query.page);
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit);

        return {pagina, limitePorPagina};
    }

    //GET /turnos:id
    async obtenerTurno(req,res,next){
        try{
            const { id } = req.params;
            const turno = await this.turnoService.obtenerTurno(id);
            res.status(200).json(turno);
        }
        catch(error){
            return next(error);
        }
    }
    //POST /turnos
    async crearTurno(req, res,next){
        try{
            //const {medicoId, fechaInicio, servicio, sede} = req.body
            const turnoCreado = await this.turnoService.crearTurno(req.body, this.medicoService);
            res.status(201).json({mensaje: "Turno creado exitosamente.", data: turnoCreado})
        }
        catch(error){
            return next(error);
        }
    }

    //PATCH turnos/:id/alta
    async darDeAlta(req, res,next) {
        try {
            const {id} = req.params;
            const {pacienteId} = req.body;
            await this.turnoService.darDeAlta(id, pacienteId);
            res.status(200).json({mensaje : "Turno fue dado de alta con exito"});
        }
        catch(error){
            return next(error);
        }
    }
    //PATCH turnos/:id/baja
    async darDeBaja(req, res,next) {
        try {
            const {id} = req.params;
            const {motivo} = req.body;
            await this.turnoService.darDeBaja(id, motivo);
            res.status(200).json({mensaje: "Turno fue dado de baja con exito"});
        } catch (error) {
            return next(error);
        }
    }
    //DELETE turnos/:id
    async eliminarTurno(req,res,next){
        try{
            const {id} = req.params;
            await this.turnoService.eliminarTurno(id);
            res.status(200).json({mensaje : "Turno fue dado eliminado con exito"});
        }
        catch(error){
            return next(error);
        }
    }    
    
    async modificarEstado(req, res) {
    try {
        const { id } = req.params;
        const { operacion, estado, pacienteId, motivo } = req.body; 

        if (operacion === 'alta' || estado === 'activo') {
            if (!pacienteId) {
                return res.status(400).json({ error: 'Falta el pacienteId para dar de alta' });
            }
            await this.turnoService.darDeAlta(id, pacienteId);
            return res.status(200).json({ mensaje: "Turno fue dado de alta con éxito" });

        } else if (operacion === 'baja' || estado === 'inactivo') {
            if (!motivo) {
                return res.status(400).json({ error: 'Falta el motivo para dar de baja' });
            }
            await this.turnoService.darDeBaja(id, motivo);
            return res.status(200).json({ mensaje: "Turno fue dado de baja con éxito" });

        } else {
            return res.status(400).json({ error: 'Operación no válida' });
        }

    } catch (error) {
        return next(error);
        //res.status(ERRORES.BAD_REQUEST.status).json({ mensaje: ERRORES.BAD_REQUEST.mensaje });
        }
    }
}


const turnoController = new TurnoController();
export default turnoController;