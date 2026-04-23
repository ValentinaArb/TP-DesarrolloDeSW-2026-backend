import {Medico} from "../model/medico.js"
import {DisponibilidadRepository} from "./disponibilidadRepository.js";
import { Repository } from "./repository.js";

const disponibilidad = new DisponibilidadRepository();
const disponibilidad1 = await disponibilidad.findById(1);

let medico1 = new Medico(1, "Pepe", 456, "Juan", "Pérez", ["Cardiología"], ["practica1"], "Sede Villa Urquiza",  [disponibilidad1]);
let medico2 = new Medico(2, "Maria", 123, "Maria", "Gómez", ["Neurología"], ["practica1"], "Sede Villa Urquiza",  [disponibilidad1]);

export class MedicoRepository extends Repository {
    constructor() {
        super();
        this.objetos = [medico1,medico2];
    }
}