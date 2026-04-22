import {Usuario} from "../model/usuario.js"




class UsuarioRepository {
    constructor() {
        const usuario1 = new Usuario(1, "Pepe", "holaquetal");
        this.usuarios = [usuario1];
    }

    //CREATE (POST)
    create(usuario) {
        this.usuarios.push(usuario);
        console.log("Usuario creado correctamente.");
    }

    // READ (GET)
    async findById(usuarioId) {
        const indiceBuscado = this._encontrarIndiceDeId(usuarioId);

        if(indiceBuscado !== -1){
            return this.usuarios[indiceBuscado];
        }
        else {
            this._errorNoEncontrado();
        }
    }

    findBy(nombre, password){
        const usuario = this.usuarios.find(
            u => u.nombre === nombre && u.password === password
        );
        if (!usuario) {
            this._errorNoEncontrado();
        }
    }

    // MÉTODOS INTERNOS
    _encontrarIndiceDeId(usuarioId) {

        return this.usuarios.findIndex((usuario)=> String(usuario.id) === String(usuarioId));
    }

    _errorNoEncontrado() {
        throw new Error("Whoops! El id buscado no existe.");
    }
}
export { UsuarioRepository };