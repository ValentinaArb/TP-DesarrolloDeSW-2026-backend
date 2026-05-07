import { Repository } from "./repository";
import { ObraSocialModel } from "../schemas/obraSocial.schema";
import { ObraSocialMapper } from "../mappers/ObraSocialMapper";

export class ObraSocialRepository extends Repository {
    constructor() {
        super(ObraSocialModel, new ObraSocialMapper());
    }
}