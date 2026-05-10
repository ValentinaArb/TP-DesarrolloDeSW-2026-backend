import { Repository } from "./repository.js";
import { ServicioMapper } from "../mappers/ServicioMapper.js";
import { ServicioModel } from "../schemas/servicio.schema.js";

export  class ServicioRepository extends Repository {
    constructor() {
        super(ServicioModel, ServicioMapper);
    }
}