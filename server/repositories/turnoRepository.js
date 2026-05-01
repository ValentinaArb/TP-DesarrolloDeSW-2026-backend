import {Turno} from "../domain/turno.js"
import {EstadoTurno} from "../domain/estadoTurno.js";
import {CambioEstadoTurno} from "../domain/cambioEstadoTurno.js";
import { Repository } from "./repository.js";
import { SedeRepository } from "./sedeRepository.js";
import {PacienteRepository} from "./pacienteRepository.js"
import {EspecialidadRepository} from "./especialidadRepository.js"
import { PracticaRepository } from "./practicaRepository.js";

const pacienteRepository = new PacienteRepository();
const paciente1 = await pacienteRepository.findById(1);

const sedeRepository = new SedeRepository();
const sede1 = await sedeRepository.findById(1);
const sede2 = await sedeRepository.findById(2);

const especialidadRepository = new EspecialidadRepository();
const especialidad1 = await especialidadRepository.findById(1);

const practicaRepository = new PracticaRepository();
const practica1 = await practicaRepository.findById(1);

let turno1 = new Turno(1, null, "2026-04-19T20:00:00", null, paciente1, practica1,sede1, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, 3, "2027-03-10T15:30:00", null , null, practica1,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);

class TurnoRepository extends Repository {
    constructor() {
        super();
        this.objetos = [turno1, turno2];
    }

    turnosDe(medicoId){
        return this.objetos.filter(tur => tur.medicoId == medicoId);
    }

    turnosPara(paciente){
        return this.objetos.filter(tur => tur.paciente == paciente);
    }
}
export { TurnoRepository };