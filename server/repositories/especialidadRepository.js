import { Especialidad } from "../domain/especialidad.js";
import { Repository } from "./repository.js";
import { EspecialidadMapper } from "../mappers/EspecialidadMapper.js";
import { EspecialidadModel } from "../schemas/especialidad.schema.js";

/* let especialidad1 = new Especialidad(1, "odontologia", 60, 0);
 */
export  class EspecialidadRepository extends Repository {
    constructor() {
        super(EspecialidadModel, new EspecialidadMapper());
    }
}