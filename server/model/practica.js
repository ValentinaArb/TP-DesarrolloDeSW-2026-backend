class Practica{
    _id
    _codigo
    _nombre
    _duracionEnMins
    _costo

    constructor(id = null, codigo, nombre, duracionEnMins, costo) {
        this._id = id;
        this._codigo = codigo;
        this._nombre = nombre;
        this._duracionEnMins = duracionEnMins;
        this._costo = costo;
    }


    get codigo() {
        return this._codigo;
    }

    set codigo(value) {
        this._codigo = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get duracionEnMins() {
        return this._duracionEnMins;
    }

    set duracionEnMins(value) {
        this._duracionEnMins = value;
    }

    get costo() {
        return this._costo;
    }

    set costo(value) {
        this._costo = value;
    }
}