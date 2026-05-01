import { MedicoRepository } from '../repositories/medicoRepository.js';
import {TurnoRepository} from "../repositories/turnoRepository.js";
import {PacienteRepository} from "../repositories/pacienteRepository.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {Turno} from "../domain/turno.js";

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.pacienteRepository = new PacienteRepository();
        this.medicoRepository = new MedicoRepository();
    }

    async darDeBaja(turnoId, motivo) {
        try {
            const turno = await this.turnoRepository.findById(turnoId);
            if(!turno._estado === EstadoTurno.RESERVADO){
                console.error("El turno no esta reservado")
            }
            turno.darDeBaja(motivo);
            await this.turnoRepository.update(turno, turnoId);
        } catch(error) {
            console.error("Error al dar de baja el turno:", error);
            throw error;
        }
    }

    async darDeAlta(turnoId, pacienteId){
        try {
            const paciente = await this.pacienteRepository.findById(pacienteId)
            const turno = await this.turnoRepository.findById(turnoId);
            const listaTurnos = this.turnoRepository.turnosPara(paciente);
            if(!listaTurnos.some(t => this.seSuperponen(t._fechaHora, t._fechaFinal, turno._fechaHora))) {
                turno.darDeAlta(paciente);
                await this.turnoRepository.update(turno, turnoId);
            }
        }
        catch (error) {
            console.error("Error al dar de alta el turno:", error);
            throw error;
        }
    }

    async crearTurno({medicoId, fechaHora, practica, sede}, medicoService) {
        const medico = await this.medicoRepository.findById(medicoId);
        const estaDisponible = await medicoService.estaDisponible(medicoId, fechaHora, this);
        const perteneceASede = await medicoService.perteneceASede(medicoId, sede)
        if (!estaDisponible) {
            throw new Error("El medico no esta disponible en la fecha y hora indicada.");
        }
        if (!await this.servicioPerteneceAMedico(medicoId, practica)){
            throw new Error("El medico no realiza esa practica especifica");
        }
        if(!perteneceASede){
            throw new Error("El medico no pertenece a esa sede");
        }
        const yaTieneTurno = await medicoService.yaTieneTurno(medicoId, fechaHora);
        if (yaTieneTurno) {
            throw new Error("El medico ya tiene un turno asignado en la fecha y hora indicada.");
        }
        const nuevoTurno = new Turno(null, medico, fechaHora, null, practica, sede, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
        return await this.turnoRepository.create(nuevoTurno);
    }

    async eliminarTurno(turnoId) {
        await this.turnoRepository.delete(turnoId);
    }

    async obtenerTurno(turnoId) {
        return await this.turnoRepository.findById(turnoId);
    }

    async obtenerTodos({pagina = 1, limitePorPagina = 10} = {}) {
        if(this.validarPaginacion(pagina, limitePorPagina)){
            const {objetos: turno, totalObjetos: totalTurno} = await this.turnoRepository.findPaginated(pagina, limitePorPagina);
            console.log("turno total turno")
            const totalPaginas = totalTurno === 0 ? 0 : Math.ceil(totalTurno / limitePorPagina);
            console.log("totalPaginas")

            return {
                turno,
                pagina,
                limitePorPagina,
                totalPaginas,
                totalTurno
            }
        }
        else {
            throw new Error("Paginación errónea");
        }
    }

    validarPaginacion(pagina, limitePagina) {
        return Number.isInteger(pagina) &&
                pagina > 0 &&
                Number.isInteger(limitePagina) &&
                limitePagina > 0;
    }

    filtrarPor(medicoId){
        return this.turnoRepository.turnosDe(medicoId);
    }

    seSuperponen(fechaInicioTurno1, fechaFinalTurno1, fechaInicioTurno2){
        return fechaInicioTurno2 > fechaInicioTurno1 && fechaInicioTurno2 < fechaFinalTurno1
    }

    async servicioPerteneceAMedico(medicoId, practica) { //que el médico brinde la práctica por la cual quieren usarlo
        const medico = await this.medicoRepository.findById(medicoId);
        return medico._practicas.some(p => p === practica)
    }

}