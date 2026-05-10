export class Practica{
    id
    codigo
    nombre
    duracion
    costo

    constructor(id = null, codigo, nombre, duracion, costo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracion = duracion;
        this.costo = costo;
    }
}