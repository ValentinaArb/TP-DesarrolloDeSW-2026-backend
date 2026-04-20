import { TurnoRepository } from '../repository/turnoRepository.js';
import { PacienteRepository } from '../repository/pacienteRepository.js';
import {EstadoTurno} from "../model/estadoTurno.js";

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.pacienteRepository = new PacienteRepository();
    }

    async darDeBaja(turnoId, pacienteId, motivo) {
        const paciente = await this.pacienteRepository.findById(pacienteId); //VER cambiar de service a dominio
        const turno = await this.turnoRepository.findById(turnoId);
        const fechaTurno = new Date(turno.fechaHora);
        const ahora = new Date();
        const diferencia = fechaTurno.getTime() - ahora.getTime();
        const unaHoraEnMs = 60 * 60 * 1000;

        console.log("DEBUG: Diferencia calculada:", diferencia); // VER - chequear que pasa si el turno ya pasó.

        if(diferencia > unaHoraEnMs) {
            turno.actualizarEstado(EstadoTurno.DISPONIBLE, paciente, motivo);
            //this.turnoRepository.updateTurno(turno, turnoId); VER
        }
        else {
            throw new Error("Whoops! Los turnos se deben cancelar con al menos una hora de antelación."); // VER - corta la ejecución
        }
    }

    crearTurno(medico, fechaHora, practica, sede) {
        const nuevoTurno = Turno(null, medico, fechaHora, null, practica, sede, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
        this.turnoRepository.create(nuevoTurno);
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

    darDeAlta(turnoId, pacienteId){
        const paciente = this.pacienteRepository.findById(pacienteId)
        const turno = this.turnoRepository.findById(turnoId);
        if(turno.estado === EstadoTurno.DISPONIBLE) {
            turno.actualizarEstado(EstadoTurno.RESERVADO, paciente, "ALTA")
            //this.turnoRepository.updateTurno(turno, turnoId); VER
        }
        else{
            throw new Error("Whoops! El turno no está disponible.");
        }
    }

}