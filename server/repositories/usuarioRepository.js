import {Usuario} from "../domain/usuario.js"
import { Repository } from "./repository.js";
import { UsuarioMapper } from "../mappers/UsuarioMapper.js";
import { UsuarioModel } from "../schemas/usuario.schema.js";

const usuario1 = new Usuario(1, "Pepe", "holaquetal");

export class UsuarioRepository extends Repository {
    constructor() {
        super(UsuarioModel, new UsuarioMapper());
    }
}