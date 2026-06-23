import {TurnoRepository} from "../repositories/turnoRepository.js";
import {ServicioRepository} from "../repositories/servicioRepository.js";
import { SedeRepository } from "../repositories/sedeRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {PacienteService} from "./pacienteService.js";
import {ConflictError, NotFoundError, BadRequestError} from "../errors/AppError.js";
import { modificarTurnoMedicoSchema } from "../schemas/modificarTurnoMedico.schema.js";

export class MedicoService {
    constructor(medicoRepository) {
        this.medicoRepository = medicoRepository;
        this.turnoRepository = new TurnoRepository();
        this.servicioRepository = new ServicioRepository();
        this.sedeRepository = new SedeRepository();
    }

    get pacienteService() {
        if (!this._pacienteService) {
            this._pacienteService = new PacienteService();
        }
        return this._pacienteService;
    }

    async orquestradorMedico(medicoId, turnoId, horaInicio, estado, turnoService){
        const resultado = modificarTurnoMedicoSchema.safeParse({
            horaInicio,
            estado
        });

        if (!resultado.success) {
            throw new BadRequestError(resultado.error.errors.map(e => e.message).join(", "));
        }

        const validado = resultado.data;

        if (validado.horaInicio !== undefined) {
            return await turnoService.modificarTurno(medicoId, turnoId, validado.horaInicio);
        }
        if (validado.estado !== undefined) {
            return await this.marcarTurnoComo(turnoId, validado.estado);
        }
    }

    async agregarDisponibilidad(id, diaSemana, horaDesde, horaHasta, servicio, sede) {
        const medico = await this.medicoRepository.findById(id);
        const nuevaDisponibilidad = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta, servicio, sede);
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
        return disponibilidadesMedico.some((d) => {
            const dispoConMetodos = new DisponibilidadHoraria(null, d.diaSemana, d.horaDesde, d.horaHasta, null, null);
            return dispoConMetodos.abarca(fechaInicio) || dispoConMetodos.abarca(fechaFinal)
        });
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

    async modificarDisponibilidad(medicoId, disponibilidadAModificarId, diaSemana, horaDesde, horaHasta, servicio, sede){
        const medico = await this.medicoRepository.findById(medicoId);

        if (!medico.tieneEsaDisponibilidad(disponibilidadAModificarId)) {
            throw new NotFoundError("La disponibilidad no existe");
        }
        medico.eliminarDisponibilidad(disponibilidadAModificarId);

        const disponibilidadNueva = new DisponibilidadHoraria(null, diaSemana, horaDesde, horaHasta, servicio, sede);
        medico.agregarDisponibilidad(disponibilidadNueva);
        
        return await this.medicoRepository.update(medico, medico.id);
    }

    async marcarTurnoComo(turnoId, estado){
        const turno = await this.turnoRepository.findById(turnoId);
        if (!turno) {
            throw new NotFoundError("El turno no pertenece a este médico.");
        }
        if(estado === "CANCELADO"){
            await turno.darDeBaja("El médico canceló el turno");
        }else{
            await turno.actualizarEstado(estado, turno.paciente, `El médico marcó el turno como ${estado}`);
        }
        await this.turnoRepository.update(turno, turnoId);
        return turno;
    }

   async consultarHistorialTurnos(pacienteId, medicoId, estado) {
    const turnosPaciente = await this.pacienteService.obtenerTurnosPorEstado(pacienteId, estado);
    
    console.log("turnosPaciente:", turnosPaciente);
    turnosPaciente.forEach(t => console.log("medico en turno:", t.medico));
    
    return turnosPaciente.filter(t => String(t.medico._id ?? t.medico.id) === String(medicoId));
}

    async consultarDisponibilidad(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        return (medico.servicios.filter(s => s.id === servicioId))
    }

    async darDeAltaServicio(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        const servicio = await this.servicioRepository.findById(servicioId);

        medico.darDeAltaServicio(servicio);
        return await this.medicoRepository.update(medico, medicoId);
    }

    async darDeBajaServicio(medicoId, servicioId){
        const medico = await this.medicoRepository.findById(medicoId);
        medico.darDeBajaServicio(servicioId);
        return await this.medicoRepository.update(medico, medicoId);
    }

    async darDeAltaSede(medicoId, sedeId) {
        const medico = await this.medicoRepository.findById(medicoId);
        const sede = await this.sedeRepository.findById(sedeId);
 
        medico.darDeAltaSede(sede);
        return await this.medicoRepository.update(medico, medicoId);
    }
 
    async darDeBajaSede(medicoId, sedeId) {
        const medico = await this.medicoRepository.findById(medicoId);
        medico.darDeBajaSede(sedeId);
        return await this.medicoRepository.update(medico, medicoId);
    }

    async modificarServicio(servicioId, nombre, duracionTurno, costo){
        const servicio = await this.servicioRepository.findById(servicioId);
        servicio.modificarServicio(nombre, duracionTurno, costo);
        await this.servicioRepository.update(servicio, servicioId);
        return servicio;
    }
}