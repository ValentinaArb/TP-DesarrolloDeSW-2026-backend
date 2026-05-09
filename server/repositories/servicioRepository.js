import { Servicio } from "../domain/servicio.js";
import { Repository } from "./repository.js";

let servicio1 = new Servicio(1, "odontología", 60, 0);
let servicio2 = new Servicio(1, "1234", 60, 0);

export  class ServicioRepository extends Repository {
    constructor() {
        super();
        this.objetos = [servicio1, servicio2];
    }
}