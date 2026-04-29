import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";
import {Repository} from "./repository.js";

let disponibilidad1 = new DisponibilidadHoraria(1, 2, new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 12, 0));
let disponibilidad2 = new DisponibilidadHoraria(2, 4, new Date(0, 0, 0, 14, 0), new Date(0, 0, 0, 18, 0));

class DisponibilidadRepository extends Repository {
    constructor() {
        super();
        this.objetos = [disponibilidad1, disponibilidad2]; 
    }
}

export { DisponibilidadRepository };