import { Repository } from "./repository.js";
import { CambioEstadoTurnoModel } from "../schemas/cambioEstadoTurno.schema.js";

export class CambioEstadoTurnoRepository extends Repository {
    constructor() {
        super(CambioEstadoTurnoModel);
    }
}