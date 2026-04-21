export class MedicoRepository {
    constructor() {
        // array vacio por ahora
        this.medicos = [];
    }

    // CREATE (POST)
    create(medico) {
        this.medicos.push(medico);
        console.log("Médico creado");
    }

    // DELETE (DELETE)
    delete(medicoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(medicoId);

        if(indiceAEliminar !== -1) {
            this.medicos.splice(indiceAEliminar, 1);
            console.log("Médico eliminado");
        } else {
            this._errorNoEncontrado();
        }
    }

    // READ (GET)
    // all
    findAll() {
        return this.medicos;
    }

    // by ID
    findById(medicoId) {
        const indiceBuscado = this._encontrarIndiceDeId(medicoId);

        if(indiceBuscado !== -1){
            return this.medicos[indiceBuscado];
        } else {
            this._errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    update(nuevoMedico, idMedicoViejo) {
        this.delete(idMedicoViejo);
        this.create(nuevoMedico);
        console.log("medico actualizada correctamente.");
    }

    // metodos internos
    _encontrarIndiceDeId(medicoId) {
        return this.medicos.findIndex((d) => String(d.id) === String(medicoId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id de medico buscado no existe");
    }
}