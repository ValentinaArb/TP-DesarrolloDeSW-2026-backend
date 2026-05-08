export class Especialidad {
    id;
    nombre;
    duracion;
    costo;

    constructor(id = null, nombre, duracion, costo) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.costo = costo;
    }

}