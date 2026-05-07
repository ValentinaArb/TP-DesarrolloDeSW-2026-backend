import {Repository} from "./repository.js";
import {Sede} from '../domain/sede.js';
import { SedeMapper } from "../mappers/SedeMapper.js";
import { SedeModel } from "../schemas/sede.schema.js";

export class SedeRepository extends Repository {
    constructor() {
        super(SedeModel, new SedeMapper());
    }
}