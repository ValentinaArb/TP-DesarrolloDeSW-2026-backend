class TurnoService {
    turnoRepository;
    usuarioRepository;

    darDeBaja(turnoId, usuarioId, motivo) {
        const usuario = null; // falta repository de usuario, pero acá va un findById con el usuarioId
        const turno = this.turnoRepository.findById(turnoId);

        if(turno.fechaHora - Date.now() > (60 * 60 * 1000)) {
            turno.actualizarEstado(EstadoTurno.DISPONIBLE, usuario, motivo);
            this.turnoRepository.update(turno, turnoId);
        }
        else {
            throw new Error("Whoops! Los turnos se deben cancelar con al menos una hora de antelación.");
        }
    }

    crearTurno(medico, fechaHora, practica, sede) {
        const nuevoTurno = Turno(null, medico, fechaHora, null, practica, sede, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
        this.turnoRepository.create(nuevoTurno);
    }

    eliminarTurno(turno) {
        this.turnoRepository.delete(turno);
    }

    obtenerTurno(turnoId) {
        return this.turnoRepository.findById(turnoId);
    }

}