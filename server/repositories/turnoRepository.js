import {Turno} from "../domain/turno.js"
import {EstadoTurno} from "../domain/estadoTurno.js";
import {CambioEstadoTurno} from "../domain/cambioEstadoTurno.js";
import { Repository } from "./repository.js";
import { SedeRepository } from "./sedeRepository.js";
import {PacienteRepository} from "./pacienteRepository.js"

const pacienteRepository = new PacienteRepository();
const paciente1 = await pacienteRepository.findById(1);

const sedeRepository = new SedeRepository();
const sede1 = await sedeRepository.findById(1);
const sede2 = await sedeRepository.findById(2);

let turno1 = new Turno(1, null, "2026-04-19T20:00:00", null, null, null,sede1, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, null, "2027-03-10T15:30:00", null , paciente1, null,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);

class TurnoRepository extends Repository {
    constructor() {
        super();
        this.objetos = [turno1, turno2];
    }

    turnosDe(medicoId){
        return this.objetos.filter(tur => tur._medicoId = medicoId);
    }

    turnosPara(paciente){
        return this.objetos.filter(tur => tur._paciente = paciente);
    }


}
export { TurnoRepository };