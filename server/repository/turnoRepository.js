import {Turno} from "../model/turno.js"
import { Paciente } from "../model/paciente.js";
import {EstadoTurno} from "../model/estadoTurno.js";

let paciente1 = new Paciente("1","Juan", "Pérez", "12345678", "1990-01-01", "M");

let turno1 = new Turno(1, null, "2023-10-10", null, null, null, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, null, "2026-10-10", paciente1, null, null, EstadoTurno.RESERVADO, [EstadoTurno.RESERVADO], null);

class TurnoRepository {
    constructor() {
        this.turnos = [turno1, turno2]; // O con algunos datos de prueba
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