export class UsuarioMapper {
    static toPersistence(usuario) {
        return {
            id: usuario.id,
            nombre: usuario.nombre,
            mail: usuario.mail,
            password: usuario.password
        };
    }

    static toDomain(usuarioDoc) {
        return new Usuario(usuarioDoc.id, usuarioDoc.nombre, usuarioDoc.mail, usuarioDoc.password);
    }
}