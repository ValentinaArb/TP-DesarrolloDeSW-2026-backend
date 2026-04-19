import {Usuario} from "../model/usuario.js"

let usuario1 = new Usuario(1, "Pepe", "holaquetal")

class UsuarioRepository {
    constructor() {
        this.usuarios = [usuario1];
    }

    //CREATE (POST)
    create(usuario) {
        this.usuarios.push(usuario);
        console.log("Usuario creado correctamente.");
    }

    // READ (GET)
    findById(usuarioId) {
        const indiceBuscado = this._encontrarIndiceDeId(usuarioId);
        console.log("indice" + indiceBuscado) //-1

        if(indiceBuscado !== -1){
            return this.usuarios[indiceBuscado];
        }
        else {
                    console.log("error")
            this._errorNoEncontrado(); //ver

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