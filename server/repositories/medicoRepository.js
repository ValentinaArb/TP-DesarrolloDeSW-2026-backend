import {Medico} from "../domain/medico.js"
import {DisponibilidadRepository} from "./disponibilidadRepository.js";
import { Repository } from "./repository.js";
import {SedeRepository} from "./sedeRepository.js";
import { ServicioRepository } from "./servicioRepository.js";


const disponibilidad = new DisponibilidadRepository();
const disponibilidad1 = await disponibilidad.findById(1);
const disponibilidad3 = await disponibilidad.findById(3);
const disponibilidad4 = await disponibilidad.findById(4);

const servicio = new ServicioRepository();
const servicio1 = await servicio.findById(1);
const servicio2 = await servicio.findById(1);

const sede = new SedeRepository();
const sede1 = await sede.findById(1);
const sede2 = await sede.findById(2);

let medico1 = new Medico(1, "Pepe", 456, "Juan", "Pérez", [servicio1], [sede1],  [disponibilidad1]);
let medico2 = new Medico(2, "Maria", 123, "Maria", "Gómez", [servicio1, servicio2], [sede2],  [disponibilidad1]);
let medico3 = new Medico(3, "Sofia", 789, "Sofia", "Baudo", [servicio2], [sede1],  [disponibilidad1, disponibilidad3, disponibilidad4]);

export class MedicoRepository extends Repository {
    constructor() {
        super();
        this.objetos = [medico1,medico2, medico3];
    }

    async findByMatricula(matricula) {
        const indiceBuscado = this.encontrarIndiceDeMatricula(matricula);

        if(indiceBuscado !== -1){
            return this.objetos[indiceBuscado];
        } else {
            this.errorNoEncontrado();
        }
    }

    // methods internos
    encontrarIndiceDeMatricula(objetoMatricula) {
        return this.objetos.findIndex((o) => String(o.matricula) === String(objetoMatricula));
    }
}