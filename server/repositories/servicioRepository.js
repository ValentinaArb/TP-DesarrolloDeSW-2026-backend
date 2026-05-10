import { Servicio } from "../domain/servicio.js";
import { Repository } from "./repository.js";

let servicio1 = new Servicio(1, "odontología", 60, 0);
let servicio2 = new Servicio(2, "1234", 60, 0);
let servicio3 = new Servicio(3, "hola", 60, 0);

export  class ServicioRepository extends Repository {
    constructor() {
        super();
        this.objetos = [servicio1, servicio2, servicio3];
    }
}