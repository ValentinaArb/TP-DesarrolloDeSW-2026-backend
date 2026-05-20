import { Repository } from "./repository.js";
import { UsuarioMapper } from "../mappers/UsuarioMapper.js";
import { UsuarioModel } from "../schemas/usuario.schema.js";

export class UsuarioRepository extends Repository {
    constructor() {
        super(UsuarioModel, UsuarioMapper);
    }
}