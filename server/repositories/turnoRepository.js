import {Turno} from "../domain/turno.js"
import {PacienteRepository} from "./pacienteRepository.js";
import {EstadoTurno} from "../domain/estadoTurno.js";
import {CambioEstadoTurno} from "../domain/cambioEstadoTurno.js";
import { Repository } from "./repository.js";

const pacienteRepository = new PacienteRepository();
const paciente1 = await pacienteRepository.findById(1);

let turno1 = new Turno(1, null, "2026-04-19T20:00:00", null, null, null, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, null, "2027-03-10T15:30:00", paciente1, null, null, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);

class TurnoRepository extends Repository {
    constructor() {
        super();
        this.objetos = [turno1, turno2];
    }
}
export { TurnoRepository };