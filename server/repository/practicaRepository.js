import { Practica } from "../model/practica.js";
import { Repository } from "./repository.js";

let practica1 = new Practica(tipoPracticas.CATARATAS, TiposEspecialidad.OFTALMOLOGIA);

class PracticaRepository extends Repository {
    constructor() {
        super();
        this.objetos = [practica1];
    }
}

export { PracticaRepository };