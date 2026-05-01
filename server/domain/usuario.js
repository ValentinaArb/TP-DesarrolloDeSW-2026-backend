export class Usuario{
    id;
    nombre;
    password;

    constructor(id = null, nombre, password) {
        this.id = id;
        this.nombre = nombre;
        this.password = password;
    }
}