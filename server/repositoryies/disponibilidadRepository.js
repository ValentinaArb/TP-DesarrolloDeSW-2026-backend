import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {Repository} from "./repository.js";

let disponibilidad1 = new DisponibilidadHoraria(1, 2, new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 12, 0));
let disponibilidad2 = new DisponibilidadHoraria(2, 4, new Date(0, 0, 0, 14, 0), new Date(0, 0, 0, 18, 0));

class DisponibilidadRepository extends Repository {
    constructor() {
        super();
        this.objetos = [disponibilidad1, disponibilidad2]; 
    }
    
    /* // CREATE (POST)
    async create(disponibilidad) {
        const indice = this.disponibilidades.length - 1  
        const ultimoId = this.disponibilidades[indice].id;
        disponibilidad.id = ultimoId + 1;
        this.disponibilidades.push(disponibilidad);
        console.log("Disponibilidad creada");
        return disponibilidad;
    }

    // DELETE (DELETE)
    async delete(disponibilidadId) {
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
    async findAll() {
        return this.disponibilidades;
    }

    // by ID
    async findById(disponibilidadId) {
        const indiceBuscado = this._encontrarIndiceDeId(disponibilidadId);

        if(indiceBuscado !== -1){
            return this.disponibilidades[indiceBuscado];
        } else {
            this._errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    async update(nuevaDisponibilidad, idDispoVieja) {
        await this.delete(idDispoVieja);
        await this.create(nuevaDisponibilidad);
        console.log("Disponibilidad actualizada correctamente.");
    }

    // metodos internos
    _encontrarIndiceDeId(disponibilidadId) {
        return this.disponibilidades.findIndex((d) => String(d.id) === String(disponibilidadId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id de disponibilidad buscado no existe");
    } */
}

export { DisponibilidadRepository };