import { TurnoRepository } from '../repository/turnoRepository.js';
import { UsuarioRepository } from '../repository/usuarioRepository.js';

export class TurnoService {
    constructor() {
        this.turnoRepository = new TurnoRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    darDeBaja(turnoId, usuarioId, motivo) {
        const usuario = this.usuarioRepository.findById(usuarioId);
        const turno = this.turnoRepository.findById(turnoId);

        if(turno.fechaHora - Date.now() > (60 * 60 * 1000)) {
            turno.actualizarEstado(EstadoTurno.DISPONIBLE, usuario, motivo);
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

    darDeAlta(turnoId, usuarioId){
        const usuario = this.usuarioRepository.findById(usuarioId)
        const turno = this.turnoRepository.findById(turnoId);
        if(turno.estado() === EstadoTurno.DISPONIBLE) {
            turno.actualizarEstado(EstadoTurno.RESERVADO, usuario, "ALTA")
            this.turnoRepository.updateTurno(turno, turnoId);
        }
    }

}