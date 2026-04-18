const turno1 = { id: "1", fecha: "2023-10-10", hora: "10:00", paciente: "paciente1" };
const turno2 = { id: "2", fecha: "2023-10-11", hora: "11:00", paciente: "paciente2" };

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
    console.log("--- DEBUG ELIMINAR ---");
    console.log("ID que busco:", turnoId);
    console.log("Contenido actual del array:", JSON.stringify(this.turnos, null, 2));
    
    const indice = this.turnos.findIndex((t) => String(t.id) === String(turnoId));
    
    console.log("Índice encontrado:", indice);
    return indice;
}

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe.");
    }
}
export { TurnoRepository };