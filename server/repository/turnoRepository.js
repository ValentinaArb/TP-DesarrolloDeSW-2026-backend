import {Turno} from "../model/turno.js"
import { PacienteRepository } from "./pacienteRepository.js";
import {EstadoTurno} from "../model/estadoTurno.js";

const paciente1 = PacienteRepository.findById(1);

let turno1 = new Turno(1, null, "2026-04-19T20:00:00", null, null, null, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, null, "2026-10-10T15:30:00", paciente1, null, null, EstadoTurno.RESERVADO, [EstadoTurno.RESERVADO], null);

class TurnoRepository {
    constructor() {
        this.turnos = [turno1, turno2];
    }
    
    //CREATE (POST)
    create(turno) {
        this.turnos.push(turno);
        console.log("Turno creado correctamente.");
    }

    //DELETE (DELETE)
    delete(turnoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(turnoId);

        if(indiceAEliminar !== -1) {
            this.turnos.splice(indiceAEliminar, 1);
            console.log("Turno eliminado correctamente.");
        }
        else {
            this._errorNoEncontrado();
        }
    }

    findAll(){
        return this.turnos;
    }

    // READ (GET)
    findById(turnoId) {
        const indiceBuscado = this._encontrarIndiceDeId(turnoId);

        if(indiceBuscado !== -1){
            return this.turnos[indiceBuscado];
        }
        else {
            this._errorNoEncontrado();
        }
    }

    //UPDATE (PUT/PATCH)
    updateTurno(nuevoTurno, idTurnoViejo) {
        this.delete(idTurnoViejo);
        this.create(nuevoTurno);
        console.log("Turno actualizado correctamente.");
    }

    // MÉTODOS INTERNOS
    _encontrarIndiceDeId(turnoId) {    
    const indice = this.turnos.findIndex((t) => String(t.id) === String(turnoId));
    return indice;
}

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe.");
    }
}
export { TurnoRepository };