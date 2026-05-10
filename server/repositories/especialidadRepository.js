import { Repository } from "./repository.js";
import { EspecialidadMapper } from "../mappers/EspecialidadMapper.js";
import { EspecialidadModel } from "../schemas/especialidad.schema.js";

export  class EspecialidadRepository extends Repository {
    constructor() {
        super(EspecialidadModel, EspecialidadMapper);
    }
}