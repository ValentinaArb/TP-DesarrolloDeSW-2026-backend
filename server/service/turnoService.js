import { TurnoRepository } from '../repository/turnoRepository.js';
import { PacienteRepository } from '../repository/pacienteRepository.js';
import {EstadoTurno} from "../model/estadoTurno.js";

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.pacienteRepository = new PacienteRepository();
    }

    darDeBaja(turnoId, pacienteId, motivo) {
        const paciente = this.pacienteRepository.findById(pacienteId);
        const turno = this.turnoRepository.findById(turnoId);

        if(turno.fechaHora - Date.now() > (60 * 60 * 1000)) {
            turno.actualizarEstado(EstadoTurno.DISPONIBLE, paciente, motivo);
            this.turnoRepository.updateTurno(turno, turnoId);
        }
        else {
            throw new Error("Whoops! Los turnos se deben cancelar con al menos una hora de antelación.");
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

        console.log(turno.estado)
        if(turno.estado === EstadoTurno.DISPONIBLE) {
            turno.actualizarEstado(EstadoTurno.RESERVADO, paciente, "ALTA")
            //this.turnoRepository.updateTurno(turno, turnoId);
            console.log("turno disponible")
        }
        else{
            throw new Error("Whoops! El turno no está disponible.");

        }
    }

}