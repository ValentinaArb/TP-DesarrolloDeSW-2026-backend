export class Servicio{
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

    modificarServicio(servicioAModificar, nombre, duracionTurno, costo){
        servicioAModificar.nombre = nombre;
        servicioAModificar.duracionTurno = duracionTurno;
        servicioAModificar.costo = costo;
    }

}