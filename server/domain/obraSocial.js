class ObraSocial{
    _id;
    _nombre;
    _planes;

    constructor(id = null, nombre, planes) {
        this._id = id;
        this._nombre = nombre;
        this._planes = planes;
    }

    get id() {
        return this._id;
    }

}