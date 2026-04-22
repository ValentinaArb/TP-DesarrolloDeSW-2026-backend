import {Medico} from "../model/medico.js"
import {DisponibilidadRepository} from "./disponibilidadRepository.js";

const disponibilidad = new DisponibilidadRepository();
const disponibilidad1 = await disponibilidad.findById(1);

let medico1 = new Medico(1, "Pepe", 456, "Juan", "Pérez", ["Cardiología"], ["practica1"], "Sede Villa Urquiza",  [disponibilidad1]);
let medico2 = new Medico(2, "Maria", 123, "Maria", "Gómez", ["Neurología"], ["practica1"], "Sede Villa Urquiza",  [disponibilidad1]);

export class MedicoRepository {
    constructor() {
        this.medicos = [medico1,medico2];
    }

    // CREATE (POST)
    async create(medico) {
        const indice = this.medicos.length - 1;
        const ultimoId = this.medicos[indice].id;
        medico.id = ultimoId + 1;
        this.medicos.push(medico);
        console.log("Médico creado");
    }

    // DELETE (DELETE)
    async delete(medicoId) {
        const indiceAEliminar = this._encontrarIndiceDeId(medicoId);

        if(indiceAEliminar !== -1) {
            this.medicos.splice(indiceAEliminar, 1);
            console.log("Médico eliminado");
        } else {
            this._errorNoEncontrado();
        }
    }

    // READ (GET)
    async findAll() {
        return this.medicos;
    }

    // by ID
    async findById(medicoId) {
        const indiceBuscado = this._encontrarIndiceDeId(medicoId);
        if(indiceBuscado !== -1){
            return this.medicos[indiceBuscado];
        } else {
            this._errorNoEncontrado();
        }
    }

    // UPDATE (PUT/PATCH)
    async update(nuevoMedico, idMedicoViejo) {
        await this.delete(idMedicoViejo);
        await this.create(nuevoMedico);
        console.log("medico actualizada correctamente.");
    }

    // metodos internos
    _encontrarIndiceDeId(medicoId) {
        return this.medicos.findIndex((m) => String(m.id) === String(medicoId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id de medico buscado no existe");
    }
}