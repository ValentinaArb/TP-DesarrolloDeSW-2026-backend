import {Repository} from "./repository.js";
import { DisponibilidadModel } from "../schemas/disponibilidad.schema.js";

export class DisponibilidadRepository extends Repository {
    constructor() {
        super(DisponibilidadModel);
    }
}