class Sede{
    _id;
    _nombre;
    _direccion;


    constructor(id = null, nombre, direccion) {
        this._id = id;
        this._nombre = nombre;
        this._direccion = direccion;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get direccion() {
        return this._direccion;
    }

    set direccion(value) {
        this._direccion = value;
    }
}