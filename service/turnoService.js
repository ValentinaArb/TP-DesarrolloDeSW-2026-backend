class TurnoService {
    turnoRepository;
    usuarioRepository;

    darDeBaja(turnoId, usuarioId, motivo) {
        const usuario = null; // falta repository de usuario, pero acá va un findById con el usuarioId
        const turno = this.turnoRepository.findById(turnoId);

        if(turno.fechaHora - Date.now() > (60 * 60 * 1000)) {
            turno.actualizarEstado(EstadoTurno.DISPONIBLE, usuario, motivo);
            this.turnoRepository.actualizarTurno(turno, turnoId);
        }
        else {
            throw new Error("Whoops! Los turnos se deben cancelar con al menos una hora de antelación.");
        }

    }
}