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

    get id() {
        return this._id;
    }
}

export { Practica };