import { Repository } from "./repository";
import { CoberturaMapper } from "../mappers/CoberturaMapper";
import { CoberturaModel } from "../schemas/cobertura.schema.js";

export class CoberturaRepository extends Repository {
    constructor() {
        super(CoberturaModel, new CoberturaMapper());
    }
}