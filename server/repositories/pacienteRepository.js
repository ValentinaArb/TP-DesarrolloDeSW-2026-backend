import {Paciente} from "../domain/paciente.js"
import { Repository } from "./repository.js";
import {PacienteModel} from "../schemas/paciente.schema.js"
import { PacienteMapper } from "../mappers/PacienteMapper.js";

let paciente1 = new Paciente(1,"Juan", "Pérez", "12345678", "1990-01-01", "M");
let paciente2 = new Paciente(2,"María", "Gómez", "87654321", "1985-05-15", "F");

export class PacienteRepository extends Repository {
    constructor() {
        super(PacienteModel, new PacienteMapper());
    }
}