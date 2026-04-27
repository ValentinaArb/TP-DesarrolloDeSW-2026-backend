import {MedicoRepository} from "../repositories/medicoRepository.js";
import {TurnoRepository} from "../repositories/TurnoRepository.js";
import {Medico} from "../domain/medico.js";

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

    async crearMedico(usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades) {
        try{const nuevoMedico = new Medico(null, usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades);
        return await this.medicoRepository.create(nuevoMedico);}
        catch(error) {
            console.error(error)
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
}