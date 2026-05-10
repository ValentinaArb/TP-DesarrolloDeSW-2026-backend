export class Especialidad {
    id;
    nombre;
    duracionEnMins;
    costo;

    constructor(id = null, nombre, duracionEnMins, costo) {
        this.id = id;
        this.nombre = nombre;
        this.duracionEnMins = duracionEnMins;
        this.costo = costo;
    }

}