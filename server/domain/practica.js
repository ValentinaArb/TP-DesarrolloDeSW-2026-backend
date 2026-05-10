export class Practica{
    id
    codigo
    nombre
    duracionEnMins
    costo

    constructor(id = null, codigo, nombre, duracionEnMins, costo) {
        this.id = id;
        this.codigo = codigo;
        this.nombre = nombre;
        this.duracionEnMins = duracionEnMins;
        this.costo = costo;
    }
}