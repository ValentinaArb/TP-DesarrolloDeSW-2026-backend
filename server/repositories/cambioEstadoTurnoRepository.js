import { Repository } from "./repository.js";
import { CambioEstadoTurnoMapper } from "../mappers/CambioEstadoTurnoMapper.js";
import { CambioEstadoTurnoModel } from "../schemas/cambioEstadoTurno.schema.js";

export class CambioEstadoTurnoRepository extends Repository {
    constructor() {
        super(CambioEstadoTurnoModel, CambioEstadoTurnoMapper);
    }
}