import {Repository} from "./repository.js";
import {Sede} from '../domain/sede.js';
import { SedeMapper } from "../mappers/SedeMapper.js";
import { SedeModel } from "../schemas/sede.schema.js";

let sede1  = new Sede(1, "Sede 1", "Villa Urquiza");
let sede2 = new Sede(2, "Sede 2", "Caballito");

export class SedeRepository extends Repository {
    constructor() {
        super(SedeModel, new SedeMapper());
    }
}