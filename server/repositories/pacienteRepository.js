import { Repository } from "./repository.js";
import {PacienteModel} from "../schemas/paciente.schema.js";

export class PacienteRepository extends Repository {
    constructor() {
        super(PacienteModel);
    }
}