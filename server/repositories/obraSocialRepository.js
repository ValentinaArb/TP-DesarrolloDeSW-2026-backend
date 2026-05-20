import { Repository } from "./repository.js";
import { ObraSocialModel } from "../schemas/obraSocial.schema.js";
import { ObraSocialMapper } from "../mappers/ObraSocialMapper.js";

export class ObraSocialRepository extends Repository {
    constructor() {
        super(ObraSocialModel, ObraSocialMapper);
    }
}