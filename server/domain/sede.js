export class Sede{
    id;
    nombre;
    direccion;

    constructor(id = null, nombre, direccion) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
    }
}