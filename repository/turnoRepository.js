class TurnoRepository {
    turnos = [];

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
        return this.turnos.findIndex((turno)=>turno.id === turnoId);
    }

    _errorNoEncontrado() {
        return throw new Error("Whoops! El id buscado no existe.");
    }
}
export { TurnoRepository };