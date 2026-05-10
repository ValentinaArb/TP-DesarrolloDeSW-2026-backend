import {DisponibilidadRepository} from "../repositories/disponibilidadRepository.js";
import {TurnoRepository} from "../repositories/turnoRepository.js";
import {ServicioRepository} from "../repositories/servicioRepository.js";
import {Medico} from "../domain/medico.js";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {ConflictError, NotFoundError} from "../errors/AppError.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {UsuarioService} from "./usuarioService.js";


export class MedicoService {
    constructor(medicoRepository) {
        this.medicoRepository = medicoRepository;
        this.turnoRepository = new TurnoRepository();
        this.disponibilidadRepository = new DisponibilidadRepository();
        this.servicioRepository = new ServicioRepository();
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
        await this.disponibilidadRepository.create(nuevaDisponibilidad);
        medico.agregarDisponibilidad(nuevaDisponibilidad);

        return await this.medicoRepository.update(medico, medico.id);
    }

    async eliminarDisponibilidad(idMedico, idDisponibilidad) {
        const medico = await this.medicoRepository.findById(idMedico);
        const disponibilidad = await this.disponibilidadRepository.findById(idDisponibilidad);

        medico.eliminarDisponibilidad(disponibilidad);
        await this.disponibilidadRepository.delete(idDisponibilidad);

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
        const turnosYaDados = turnoService.filtrarPor(medicoId);

        return turnosYaDados.some((t) => !turnoService.noSeSuperponen(t, turnoChequear));
    }
    async crearMedico(usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades) {
        try {
            const medicoExistente = await this.medicoRepository.findByMatricula(matricula);
            if (medicoExistente) {
                throw new ConflictError("El médico que intentas crear ya existe.");
            }
        }
        catch (error) {
            if (error instanceof NotFoundError) {
                const nuevoMedico = new Medico(usuario, matricula, nombre, apellido, servicios, sedes, disponibilidades);
                return this.medicoRepository.create(nuevoMedico);
            }

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
        const disponibilidadNueva = new DisponibilidadHoraria(diaSemana, horaDesde, horaHasta);
        const medico = await this.medicoRepository.findById(medicoId);
        medico.eliminarDisponibilidad(disponibilidadAModificarId);
        medico.agregarDisponibilidad(disponibilidadNueva);
    }

    async marcarTurnoComo(medicoId, turnoId, estado){
        const turnosDeMedico = this.turnoRepository.turnosDe(medicoId);
        const turno = turnosDeMedico.find(t => t.id === Number(turnoId));
        if (!turno) {
            throw new NotFoundError("El turno no pertenece a este médico.");
        }
        turno.estado = estado;
        await this.turnoRepository.update(turno, turnoId);
    }
    async cancelarTurno(medicoId, turnoId, motivo){
        const turno = await this.turnoRepository.findById(turnoId);
        console.log("turno encontrado:", turno?.id, "medico.id:", turno?.medico?.id, "medicoId:", Number(medicoId));
        try {
            if (turno.medico.id === Number(medicoId)) {
                console.log("estado", turno?.estado);
                await this.marcarTurnoComo(medicoId, turnoId, EstadoTurno.CANCELADO);
                console.log("turno estado despues de marcar turno:", turno?.estado);
                turno.actualizarEstado(EstadoTurno.CANCELADO, turno.paciente, motivo);
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
        console.log
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


}