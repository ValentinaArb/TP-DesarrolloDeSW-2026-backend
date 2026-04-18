class ObraSocial{
    _id;
    _nombre;
    _planes;


    constructor(id = null, nombre, planes) {
        this._id = id;
        this._nombre = nombre;
        this._planes = planes;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get planes() {
        return this._planes;
    }

    set planes(value) {
        this._planes = value;
    }
}