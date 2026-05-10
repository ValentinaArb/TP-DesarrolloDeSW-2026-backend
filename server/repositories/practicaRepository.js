import { Repository } from "./repository.js";
import { PracticaMapper } from "../mappers/PracticaMapper.js";
import { PracticaModel } from "../schemas/practica.schema.js";

export class PracticaRepository extends Repository {
    constructor() {
        super(PracticaModel, PracticaMapper);
    }
}
