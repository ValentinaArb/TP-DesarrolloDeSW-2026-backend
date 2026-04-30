import { Practica } from "../domain/practica.js";
import { Repository } from "./repository.js";

let practica1 = new Practica(1, "1234","Operación", 60, 0);

class PracticaRepository extends Repository {
    constructor() {
        super();
        this.objetos = [practica1];
    }
}

export { PracticaRepository };

