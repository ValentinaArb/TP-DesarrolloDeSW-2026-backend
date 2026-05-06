import {Turno} from "../domain/turno.js"
import {EstadoTurno} from "../domain/estadoTurno.js";
import {CambioEstadoTurno} from "../domain/cambioEstadoTurno.js";
import { Repository } from "./repository.js";
import { SedeRepository } from "./sedeRepository.js";
import {PacienteRepository} from "./pacienteRepository.js"
import { PracticaRepository } from "./practicaRepository.js";
import {MedicoRepository} from "./medicoRepository.js";
import { TurnoMapper } from "../mappers/TurnoMapper.js";
import { TurnoModel } from "../schemas/turno.schema.js";

const pacienteRepository = new PacienteRepository();
const paciente1 = await pacienteRepository.findById(1);

const sedeRepository = new SedeRepository();
const sede1 = await sedeRepository.findById(1);
const sede2 = await sedeRepository.findById(2);

/*
const especialidadRepository = new EspecialidadRepository();
const especialidad1 = await especialidadRepository.findById(1);
*/

const practicaRepository = new PracticaRepository();
const practica1 = await practicaRepository.findById(1);

const medicoRepository = new MedicoRepository();
const medico1 = await medicoRepository.findById(1);
const medico3 = await medicoRepository.findById(3);

let turno1 = new Turno(1, medico1, "2026-04-19T20:00:00", null, paciente1, practica1,sede1, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, medico3, "2027-03-10T15:30:00", null , null, practica1,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);

export class TurnoRepository extends Repository {
    constructor() {
        super(TurnoModel, new TurnoMapper());
    }

    turnosDe(medicoId){
        const documentos = await this.mongooseModel.find({"medicoInfo.medicoId": medicoId});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }

    turnosPara(paciente){
        const documentos = await this.mongooseModel.find({"pacienteInfo.pacienteId": paciente.id});
        return documentos.map(doc => this.mapper.toDomain(doc));
    }
}