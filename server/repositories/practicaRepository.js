import { Practica } from "../domain/practica.js";
import { Repository } from "./repository.js";
import { PracticaMapper } from "../mappers/PracticaMapper.js";
import { PracticaModel } from "../schemas/practica.schema.js";

let practica1 = new Practica(1, "1234","Operación", 60, 0);

export class PracticaRepository extends Repository {
    constructor() {
        super(PracticaModel, new PracticaMapper());
    }
}
