import {MedicoRepository} from "../repository/medicoRepository.js";
import {TurnoRepository} from "../repository/TurnoRepository.js";

export class MedicoService {

    constructor() {
        this.medicoRepository = new MedicoRepository();
        this.turnoRepository = new TurnoRepository();
    }

    estaDisponible(medicoId, fechaHora) {
        const fecha = new Date(fechaHora);
        const medico = this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;


        return disponibilidadesMedico.some((disponibilidad) => {disponibilidad.abarca(fecha)})
    }

    yaTieneTurno(medicoId, fechaHora) {
        const fecha = new Date(fechaHora);
        const medico = this.medicoRepository.findById(medicoId);
        const turnos = this.turnoRepository.findAll();

        return turnos.some((turno) => (turno.medico === medico) && (turno.fechaHora === fechaHora));
    }
}