import {MedicoRepository} from "../repository/medicoRepository.js";
import {TurnoRepository} from "../repository/TurnoRepository.js";

export class MedicoService {

    constructor() {
        this.medicoRepository = new MedicoRepository();
        this.turnoRepository = new TurnoRepository();
    }

    async estaDisponible(medicoId, fechaHora) {
        const fecha = new Date(fechaHora);
        const medico = await this.medicoRepository.findById(medicoId);
        const disponibilidadesMedico = medico.disponibilidades;

        return disponibilidadesMedico.some((d) => d.abarca(fecha));
    }

    async yaTieneTurno(medicoId, fechaHora) {
        const medico = await this.medicoRepository.findById(medicoId);
        const turnos = await this.turnoRepository.findAll();

        return turnos.some((turno) => (turno.medico === medico) && (turno.fechaHora === fechaHora));
    }
}