import { Repository } from "./repository.js";
import { CoberturaMapper } from "../mappers/CoberturaMapper.js";
import { CoberturaModel } from "../schemas/cobertura.schema.js";

export class CoberturaRepository extends Repository {
    constructor() {
        super(CoberturaModel, CoberturaMapper);
    }
}