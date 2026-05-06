import {Medico} from "../domain/medico.js"
import {DisponibilidadRepository} from "./disponibilidadRepository.js";
import { Repository } from "./repository.js";
import {SedeRepository} from "./sedeRepository.js";
import { PracticaRepository } from "./practicaRepository.js";
import { EspecialidadRepository } from "./especialidadRepository.js";
import { MedicoModel } from "../schemas/medico.schema.js";
import { MedicoMapper } from "../mappers/MedicoMapper.js";

const disponibilidad = new DisponibilidadRepository();
/* const disponibilidad1 = await disponibilidad.findById(1);
const disponibilidad3 = await disponibilidad.findById(3);
const disponibilidad4 = await disponibilidad.findById(4); */

const practica = new PracticaRepository();
//const practica1 = await practica.findById(1);

const especialidad = new EspecialidadRepository();
//const especialidad1 = await especialidad.findById(1);

const sede = new SedeRepository();
//const sede1 = await sede.findById(1);
//const sede2 = await sede.findById(2);

/* let medico1 = new Medico(1, "Pepe", 456, "Juan", "Pérez", [especialidad1], [practica1], [sede1],  [disponibilidad1]);
let medico2 = new Medico(2, "Maria", 123, "Maria", "Gómez", [especialidad1], [practica1], [sede2],  [disponibilidad1]);
let medico3 = new Medico(3, "Sofia", 789, "Sofia", "Baudo", [especialidad1], [practica1], [sede1],  [disponibilidad1, disponibilidad3, disponibilidad4]); */

export class MedicoRepository extends Repository {
    constructor() {
        super(MedicoModel, new MedicoMapper());
    }

    async findByMatricula(matricula) {
        const documento = await this.mongooseModel.findOne({ matricula: matricula });
        return this.mapper.toDomain(documento);
    }
}