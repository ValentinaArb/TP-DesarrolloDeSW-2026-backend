import { Repository } from "./repository.js";
import {PacienteModel} from "../schemas/paciente.schema.js"
import { PacienteMapper } from "../mappers/PacienteMapper.js";

export class PacienteRepository extends Repository {
    constructor() {
        super(PacienteModel, PacienteMapper);
    }
}