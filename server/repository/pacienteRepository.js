import {Paciente} from "../model/paciente.js"
import { Repository } from "./repository.js";

let paciente1 = new Paciente(1,"Juan", "Pérez", "12345678", "1990-01-01", "M");
let paciente2 = new Paciente(2,"María", "Gómez", "87654321", "1985-05-15", "F");

class PacienteRepository extends Repository {
    constructor() {
        super();
        this.objetos = [paciente1, paciente2];
    }
}
export { PacienteRepository };