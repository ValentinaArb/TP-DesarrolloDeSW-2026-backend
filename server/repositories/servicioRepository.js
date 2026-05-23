import { Repository } from "./repository.js";
import { ServicioModel } from "../schemas/servicio.schema.js";

export  class ServicioRepository extends Repository {
    constructor() {
        super(ServicioModel);
    }
}