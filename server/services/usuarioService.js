import { PacienteRepository } from "../repositories/pacienteRepository.js";
import {TurnoService} from "/turnoService.js";

export class UsuarioService{
    constructor() {
        this.turnoService = new TurnoService();
        this.pacienteRepository = new PacienteRepository();
    }

    async reservarTurno(turnoId, pacienteId){
        await this.turnoService.darDeAlta(turnoId, pacienteId);
    }

}