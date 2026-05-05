import {Usuario} from "../domain/usuario.js"
import { Repository } from "./repository.js";

const usuario1 = new Usuario(1, "Pepe", "holaquetal");
const usuario2 = new Usuario(2, "Pablo", "todoBien");

export class UsuarioRepository extends Repository {
    constructor() {
        super();
        this.objetos = [usuario1, usuario2];
    }
}