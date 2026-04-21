import {Paciente} from "../model/paciente.js"

let paciente1 = new Paciente(1,"Juan", "Pérez", "12345678", "1990-01-01", "M");
let paciente2 = new Paciente(2,"María", "Gómez", "87654321", "1985-05-15", "F");

class PacienteRepository {
    constructor() {
        this.pacientes = [paciente1, paciente2];
    }

    //CREATE (POST)
    async create(paciente) {
        this.pacientes.push(paciente);
        console.log("paciente creado correctamente.");
    }

    // READ (GET)
    async findById(pacienteId) {
        const indiceBuscado = this._encontrarIndiceDeId(pacienteId);

        if(indiceBuscado !== -1){

            return this.pacientes[indiceBuscado];
        }
        else {
            this._errorNoEncontrado(); //ver

        }
    }

    async findBy(nombre, password){
        const paciente = this.pacientes.find(
            u => u.nombre === nombre && u.password === password
        );
        if (!paciente) {
            this._errorNoEncontrado();
        }
        return paciente;
    }

    // MÉTODOS INTERNOS
    _encontrarIndiceDeId(pacienteId) {
        return this.pacientes.findIndex((paciente)=> String(paciente.id) === String(pacienteId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe.");
    }
}
export { PacienteRepository };