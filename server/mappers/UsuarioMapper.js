import { Usuario } from "../domain/usuario.js";

export class UsuarioMapper {
    static toPersistence(usuario) {
        return {
            nombre: usuario.nombre,
            mail: usuario.mail,
            password: usuario.password
        };
    }

    static toDomain(usuarioDoc) {
        return new Usuario(usuarioDoc._id.toString(), usuarioDoc.nombre, usuarioDoc.mail, usuarioDoc.password);
    }
}