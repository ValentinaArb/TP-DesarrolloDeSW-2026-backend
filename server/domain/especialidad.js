class Especialidad {
    id;
    nombre;
    duracionTurno;
    costo;

    constructor(id = null, nombre, duracionTurno, costo) {
        this.id = id;
        this.nombre = nombre;
        this.duracionTurno = duracionTurno;
        this.costo = costo;
    }

}
export {Especialidad}