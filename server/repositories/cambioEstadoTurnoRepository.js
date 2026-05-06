import { Repository } from "./repository";
import { CambioEstadoTurnoMapper } from "../mappers/CambioEstadoTurnoMapper";
import { CambioEstadoTurnoModel } from "../schemas/cambioEstadoTurno.schema.js";

export class CambioEstadoTurnoRepository extends Repository {
    constructor() {
        super(CambioEstadoTurnoModel, new CambioEstadoTurnoMapper());
    }
}