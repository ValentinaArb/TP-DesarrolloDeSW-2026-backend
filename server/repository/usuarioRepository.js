import {Usuario} from "../model/usuario.js"
import { Repository } from "./repository.js";

const usuario1 = new Usuario(1, "Pepe", "holaquetal");

class UsuarioRepository extends Repository {
    constructor() {
        super();
        this.objetos = [usuario1];
    }
}
export { UsuarioRepository };