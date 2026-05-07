import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {Repository} from "./repository.js";
import {DisponibilidadMapper} from "../mappers/DisponibilidadMapper.js";
import { DisponibilidadModel } from "../schemas/disponibilidad.schema.js";

export class DisponibilidadRepository extends Repository {
    constructor() {
        super(DisponibilidadModel, new DisponibilidadMapper());
    }
}