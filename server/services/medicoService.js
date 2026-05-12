import {TurnoRepository} from "../repositories/turnoRepository.js";
import {ServicioRepository} from "../repositories/servicioRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {ConflictError, NotFoundError} from "../errors/AppError.js";
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
        turno.estado = estado;
        await this.turnoRepository.update(turno, turnoId);
    }
    async cancelarTurno(medicoId, turnoId, motivo){
        const turno = await this.turnoRepository.findById(turnoId);
        console.log("turno encontrado:", turno?.id, "medico.id:", turno?.medico?.id, "medicoId:", medicoId);
        try {
            if (String(turno.medico.id) === String(medicoId)) {
                console.log("estado", turno?.estado);
                await this.marcarTurnoComo(medicoId, turnoId, EstadoTurno.CANCELADO);
                console.log("turno estado despues de marcar turno:", turno?.estado);
                await turno.actualizarEstado(EstadoTurno.CANCELADO, turno.paciente, motivo);
            }
        }
        catch(error){
            console.error("No se pudo dar de baja el turno", error);
            throw error;
        }
    }

    async consultarHistorialTurnos(pacienteId, medicoId, estado){
        const turnosPaciente = await this.usuarioService.obtenerTurnosPorEstado(pacienteId, estado);
        return turnosPaciente.filter(t=> t.medico = Number(medicoId));
    }

    async consultarDisponibilidad(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(Number(medicoId));
        console.log("servicios:", JSON.stringify(medico.servicios));
        console.log("buscando servicioId:", Number(servicioId), typeof Number(servicioId));
        console.log("s.id:", medico.servicios[0]?.id, typeof medico.servicios[0]?.id);
        return (medico.servicios.filter(s => s.id === Number(servicioId)))
    }

    async darDeBajaServicio(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        medico.darDeBajaServicio(servicioId);
    }
    async darDeAltaServicio(medicoId, servicioId){
        console.log("entre a la alta de servicio:");
        console.log("medico id", medicoId);
        const medico = await this.medicoRepository.findById(Number(medicoId));
        console.log("despues del medico find by id");
        const servicio = await this.servicioRepository.findById(Number(servicioId));
        console.log("medico:", medico?.id, "servicio:", servicio?.id);
        medico.darDeAltaServicio(medico, servicio);
        await this.medicoRepository.update(medico, Number(medicoId));
        console.log("servicios despues:", medico.servicios);

    }

    async modificarServicio(servicioId, nombre, duracionTurno, costo){
        const servicio = await this.servicioRepository.findById(servicioId);
        servicio.modificarServicio(this,nombre, duracionTurno, costo);
        return servicio;
    }

    async modificarTurno(medicoId, turnoId, horaInicio){
        const turno = await this.turnoRepository.findById(turnoId);
        if(turno.medico.id === medicoId && turno.horaHasta !== horaInicio) {
            const horaFinalPropuesta = new Date(horaInicio.getTime() + turno.servicio.duracionTurno * 60000);
            const turnoPropuesto = new Turno(null, horaInicio, horaFinalPropuesta, turno.servicio, turno.paciente, EstadoTurno.PENDIENTE);
            return await this.factoryNotificacion.crearSegunEstadoTurno(turnoPropuesto);
        }
        else{
            console.log("El turno no pertenece a este médico o la hora de inicio es la misma que la actual.");
        }
    }


}