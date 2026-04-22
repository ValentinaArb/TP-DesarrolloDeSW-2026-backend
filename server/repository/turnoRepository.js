import {Turno} from "../model/turno.js"
import {PacienteRepository} from "./pacienteRepository.js";
import {EstadoTurno} from "../model/estadoTurno.js";
import {CambioEstadoTurno} from "../model/cambioEstadoTurno.js";

const pacienteRepository = new PacienteRepository();
const paciente1 = await pacienteRepository.findById(1);

let turno1 = new Turno(1, null, "2026-04-19T20:00:00", null, null, null, EstadoTurno.DISPONIBLE, [EstadoTurno.DISPONIBLE], null);
let turno2 = new Turno(2, null, "2027-03-10T15:30:00", paciente1, null, null, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);

class TurnoRepository {
    constructor() {
        this.turnos = [turno1, turno2];
    }
    
    //CREATE (POST)
    async create(turno) {
        const indice = this.turnos.length - 1  
        const ultimoId = this.turnos[indice].id;
        turno.id = ultimoId + 1;
        this.turnos.push(turno);
        console.log("Turno creado correctamente.");
        return turno;
    }

    //DELETE (DELETE)
    async delete(turnoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(turnoId);

        if(indiceAEliminar !== -1) {
            this.turnos.splice(indiceAEliminar, 1);
            console.log("Turno eliminado correctamente.");
        }
        else {
            this._errorNoEncontrado();
        }
    }

    async findAll(){
        return this.turnos;
    }

    // READ (GET)
    async findById(turnoId) {
        const indiceBuscado = this._encontrarIndiceDeId(turnoId);

        if(indiceBuscado !== -1){
            return this.turnos[indiceBuscado];
        }
        else {
            this._errorNoEncontrado();
        }
    }

    //UPDATE (PUT/PATCH)
    async updateTurno(nuevoTurno, idTurnoViejo) {
        const indice = this._encontrarIndiceDeId(idTurnoViejo);

        this.turnos[indice] = nuevoTurno;
        
        console.log("Turno actualizado correctamente.");
    }

    // MÉTODOS INTERNOS
    _encontrarIndiceDeId(turnoId) {    
        return this.turnos.findIndex((t) => String(t.id) === String(turnoId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe.");
    }
}
export { TurnoRepository };