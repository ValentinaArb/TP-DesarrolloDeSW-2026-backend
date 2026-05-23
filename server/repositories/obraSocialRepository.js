import { Repository } from "./repository.js";
import { ObraSocialModel } from "../schemas/obraSocial.schema.js";

export class ObraSocialRepository extends Repository {
    constructor() {
        super(ObraSocialModel);
    }
}