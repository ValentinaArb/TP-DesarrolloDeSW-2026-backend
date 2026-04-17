import Turno from "../model/turno.js";



const turno1 = Turno(
    medico1,
    Date("03-03-2005"),
    practica1,
    "Belgrano"
    )

const turno2 = Turno(
    medico1,
    Date("2303-2005"),
    practica1,
    "Lugano"
    )

class TurnoRepository {
    turnos = [];

    //CREATE (POST)
    crearTurno(turno) {
        this.turnos.push(turno);
        console.log("Turno creado correctamente.");
    }

    //DELETE (DELETE)
    eliminarTurno(turnoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(turnoId);

        if(indiceAEliminar !== -1) {
            this.turnos.splice(indiceAEliminar, 1);
            console.log("Turno eliminado correctamente.");
        }
        else {
            this._errorNoEncontrado();
        }
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
    actualizarTurno(nuevoTurno, idTurnoViejo) {
        this.eliminarTurno(idTurnoViejo);
        this.crearTurno(nuevoTurno);
    }

    _encontrarIndiceDeId(turnoId) {
        return this.turnos.findIndex((turno)=>turno.id === turnoId);
    }

    _errorNoEncontrado() {
        return throw new Error("Whoops! El id buscado no existe.");
    }
}