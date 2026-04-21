import {DisponibilidadHoraria} from "../model/disponibilidadHoraria.js";

class DisponibilidadRepository {
    constructor() {
        // array vacio por ahora
        this.disponibilidades = []; 
    }
    
    // CREATE (POST)
    create(disponibilidad) {
        this.disponibilidades.push(disponibilidad);
        console.log("Disponibilidad creada");
    }

    // DELETE (DELETE)
    delete(disponibilidadId) {
        const indiceAEliminar = this._encontrarIndiceDeId(disponibilidadId);

        if(indiceAEliminar !== -1) {
            this.disponibilidades.splice(indiceAEliminar, 1);
            console.log("Disponibilidad eliminada");
        } else {
            this._errorNoEncontrado();
        }
    }

    // READ (GET)
    // all
    findAll() {
        return this.disponibilidades;
    }

    // by ID
    findById(disponibilidadId) {
        const indiceBuscado = this._encontrarIndiceDeId(disponibilidadId);

        if(indiceBuscado !== -1){
            return this.disponibilidades[indiceBuscado];
        } else {
            this._errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    update(nuevaDisponibilidad, idDispoVieja) {
        this.delete(idDispoVieja);
        this.create(nuevaDisponibilidad);
        console.log("Disponibilidad actualizada correctamente.");
    }

    // metodos internos
    _encontrarIndiceDeId(disponibilidadId) {
        return this.disponibilidades.findIndex((d) => String(d.id) === String(disponibilidadId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id de disponibilidad buscado no existe");
    }
}

export { DisponibilidadRepository };