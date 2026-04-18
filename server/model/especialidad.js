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


    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get duracionTurno() {
        return this._duracionTurno;
    }

    set duracionTurno(value) {
        this._duracionTurno = value;
    }

    get costo() {
        return this._costo;
    }

    set costo(value) {
        this._costo = value;
    }
}