import {TurnoRepository} from "../repositories/turnoRepository.js";
import {ServicioRepository} from "../repositories/servicioRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {BadRequestError, ConflictError, NotFoundError} from "../errors/AppError.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {UsuarioService} from "./usuarioService.js";
import {Turno} from "../domain/turno.js";
import {FactoryNotificacion} from "../domain/factoryNotificacion.js";


export class MedicoService {
    constructor(medicoRepository) {
        this.medicoRepository = medicoRepository;
        this.turnoRepository = new TurnoRepository();
        this.servicioRepository = new ServicioRepository();
        this.factoryNotificacion = new FactoryNotificacion();

    }

    get usuarioService() {
        if (!this._usuarioService) {
            this._usuarioService = new UsuarioService();
        }
        return this._usuarioService;
    }

    async agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta) {
        const medico = await this.medicoRepository.findById(id);
        const nuevaDisponibilidad = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta);
        medico.agregarDisponibilidad(nuevaDisponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }

    async eliminarDisponibilidad(idMedico, idDisponibilidad) {
        const medico = await this.medicoRepository.findById(idMedico);
        
        // Buscar la disponibilidad dentro del médico por ID
        const disponibilidad = medico.disponibilidades.find(d => d.id === idDisponibilidad);
        
        if (!disponibilidad) {
            throw new NotFoundError("La disponibilidad no existe");
        }

        medico.eliminarDisponibilidad(disponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }
    
    async estaDisponible(medicoId, turno) {
        const fechaInicio = turno.fechaInicio;
        const fechaFinal = turno.fechaFinal;
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;

        return disponibilidadesMedico.some((d) => d.abarca(fechaInicio) || d.abarca(fechaFinal));
    }

    async yaTieneTurno(medicoId, turnoChequear, turnoService) {
        const turnosYaDados = await turnoService.filtrarPor(medicoId);

        return turnosYaDados.some((t) => !turnoService.noSeSuperponen(t, turnoChequear));
    }
    async crearMedico(usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades) {
        try {
            const medicoExistente = await this.medicoRepository.findByMatricula(matricula);
            if (medicoExistente) {
                throw new ConflictError("El médico que intentas crear ya existe.");
            }
            else {
                const nuevoMedico = new Medico(null, usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades);
                return await this.medicoRepository.create(nuevoMedico);
            }
        }
        catch (error) {
            throw error;
        }
    }

    async eliminarMedico(medicoId) {
        return await this.medicoRepository.delete(medicoId);
    }

    async obtenerMedico(medicoId) {
        return await this.medicoRepository.findById(medicoId);
    }

    async obtenerTodos() {
        return await this.medicoRepository.findAll();
    }

    async perteneceASede(medicoId, sedeId) {
        const medico = await this.medicoRepository.findById(medicoId);
        return medico.sedes.some(s => s.id === sedeId);
    }

    async modificarDisponibilidad(medicoId, disponibilidadAModificarId, diaSemana, horaDesde, horaHasta){
        const medico = await this.medicoRepository.findById(medicoId);
        
        // Buscar la disponibilidad dentro del médico por ID
        const disponibilidadExistente = medico.disponibilidades.find(d => d.id === disponibilidadAModificarId);
        
        if (!disponibilidadExistente) {
            throw new NotFoundError("La disponibilidad no existe");
        }
        
        // Eliminar la disponibilidad existente
        medico.eliminarDisponibilidad(disponibilidadExistente);
        
        // Agregar la nueva disponibilidad con los datos actualizados
        const disponibilidadNueva = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta);
        medico.agregarDisponibilidad(disponibilidadNueva);
        
        return await this.medicoRepository.update(medico, medico.id);
    }

    async marcarTurnoComo(medicoId, turnoId, estado){
        const turnosDeMedico = await this.turnoRepository.turnosDe(medicoId);
        const turno = turnosDeMedico.find(t => String(t.id) === String(turnoId));
        if (!turno) {
            throw new NotFoundError("El turno no pertenece a este médico.");
        }
        if(estado === "CANCELADO"){
            await turno.darDeBaja("El médico canceló el turno");
        }else{
            await turno.actualizarEstado(estado, turno.paciente, `El médico marcó el turno como ${estado}`);
        }
        return await this.turnoRepository.update(turno, turnoId);
    }

    async consultarHistorialTurnos(pacienteId, medicoId, estado){
        const turnosPaciente = await this.usuarioService.obtenerTurnosPorEstado(pacienteId, estado);
        return turnosPaciente.filter(t=> String(t.medico.id) === String(medicoId));
    }

    async consultarDisponibilidad(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        return (medico.servicios.filter(s => s.id === servicioId))
    }

    async darDeBajaServicio(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        medico.darDeBajaServicio(servicioId);
        return await this.medicoRepository.update(medico, medicoId);
    }
    async darDeAltaServicio(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        const servicio = await this.servicioRepository.findById(servicioId);

        medico.darDeAltaServicio(servicio);
        return await this.medicoRepository.update(medico, medicoId);
    }

    async modificarServicio(servicioId, nombre, duracionTurno, costo){
        const servicio = await this.servicioRepository.findById(servicioId);
        servicio.modificarServicio(nombre, duracionTurno, costo);
        await this.servicioRepository.update(servicio, servicioId);
        return servicio;
    }

    async modificarTurno(medicoId, turnoId, horaInicio){
        const turno = await this.turnoRepository.findById(turnoId);
        if(turno.medico.id === medicoId && turno.horaHasta !== horaInicio) {
            const horaFinalPropuesta = new Date(horaInicio.getTime() + turno.servicio.duracionTurno * 60000);
            
            turno.fechaInicio = horaInicio;
            turno.fechaFinal = horaFinalPropuesta;
            turno.estado = EstadoTurno.PENDIENTE;
            await this.turnoRepository.update(turno, turnoId);
            return await this.factoryNotificacion.crearNotificacion(turno);
        }
        else{
            throw new BadRequestError("El turno no pertenece a este médico o la hora de inicio es la misma que la actual.");
        }
    }
}