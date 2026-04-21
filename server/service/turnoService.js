import { TurnoRepository } from '../repository/turnoRepository.js';
import { PacienteRepository } from '../repository/pacienteRepository.js';
import {MedicoService} from './medicoService.js';
import {EstadoTurno} from "../model/estadoTurno.js";
import {Turno} from "../model/turno.js";

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.pacienteRepository = new PacienteRepository();
        this.medicoService = new MedicoService();
    }

    async darDeBaja(turnoId, motivo) {
        try {
            const turno = await this.turnoRepository.findById(turnoId);

            turno.darDeBaja(motivo);

            this.turnoRepository.updateTurno(turno, turnoId);
            console.log(this.turnoRepository.turnos);
            console.log(this.turnoRepository.turnos[1]._historialDeEstados[1].estado)
        } catch(error) {
            console.error("Error al dar de baja el turno:", error);

            throw error;
        }
    }

    crearTurno(medico, fechaHora, practica, sede) {
        const nuevoTurno = new Turno(null, medico, fechaHora, null, practica, sede, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
        if(this.medicoService.estaDisponible(medico.id, fechaHora) && this.medicoService.yaTieneTurno(medico.id, fechaHora)) {
            this.turnoRepository.create(nuevoTurno);
        }

    }

    eliminarTurno(turnoId) {
        this.turnoRepository.delete(turnoId);
    }

    obtenerTurno(turnoId) {
        return this.turnoRepository.findById(turnoId);
    }

    obtenerTodos() {
        return this.turnoRepository.findAll();
    }

    async darDeAlta(turnoId, pacienteId){
        try {
            const paciente = this.pacienteRepository.findById(pacienteId)
            const turno = this.turnoRepository.findById(turnoId);
            turno.darDeAlta(paciente);
            this.turnoRepository.updateTurno(turno, turnoId);
        }
        catch (error) {
            console.error("Error al dar de alta el turno:", error);

            throw error;
        }
    }

}