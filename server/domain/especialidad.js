class Especialidad {
    _id;
    _nombre;
    _duracionTurno;
    _costo;

    constructor(id = null, nombre, duracionTurno, costo) {
        this._id = id;
        this._nombre = nombre;
        this._duracionTurno = duracionTurno;
        this._costo = costo;
    }

    get id() {
        return this._id;
    }
}
export {Especialidad}