import {Notificacion} from "../domain/notificacion.js"
import { UsuarioRepository } from "./usuarioRepository.js";
import { Repository } from "./repository.js";

const usuarioRepository = new UsuarioRepository();
const usuario1 = await usuarioRepository.findById(1);
const usuario2 = await usuarioRepository.findById(2);

let notificacion1 = new Notificacion(1,usuario1,usuario2, "Reservo turno","2027-04-19T20:00:00",null, true);
let notificacion2 = new Notificacion(2,usuario2,usuario1, "Cancelo turno","2026-08-19T10:00:00",null, null);

export class NotificacionRepository extends Repository {
    constructor() {
        super();
        this.objetos = [notificacion1, notificacion2];
    }

    
}