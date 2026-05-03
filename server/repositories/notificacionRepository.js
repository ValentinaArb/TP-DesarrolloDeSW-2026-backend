import {Notificacion} from "../domain/notificacion"
import { UsuarioRepository } from "./usuarioRepository";

const usuarioRepository = new UsuarioRepository();
const usuario1 = await usuarioRepository.findById(1);
const usuario2 = await usuarioRepository.findById(2);

let notificacion1 = new Notificacion(1,usuario1,usuario2, "Reservo turno","2027-04-19T20:00:00");
let notificacion1 = new Notificacion(1,usuario2,usuario1, "Cancelo turno","2026-08-19T10:00:00");

export class NotificacionRepository extends Repository {
    constructor() {
        super();
        this.objetos = [notificacion1, notificacion2];
    }
}