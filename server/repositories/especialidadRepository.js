import { Especialidad } from "../domain/especialidad.js";
import { Repository } from "./repository.js";

let especialidad1 = new Especialidad(1, "odontologia", 60, 0);

export  class EspecialidadRepository extends Repository {
    constructor() {
        super();
        this.objetos = [especialidad1];
    }
}