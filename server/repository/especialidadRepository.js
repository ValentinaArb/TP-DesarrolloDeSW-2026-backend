import { Especialidad } from "../model/especialidad.js";
import { Repository } from "./repository.js";

let especialidad1 = new Especialidad(1, "odontologia", 60, 0);

class EspecialidadRepository extends Repository {
    constructor() {
        super();
        this.objetos = [especialidad1];
    }
}

export { EspecialidadRepository };