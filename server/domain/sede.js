export class Sede{
    _id;
    _nombre;
    _direccion;


    constructor(id = null, nombre, direccion) {
        this._id = id;
        this._nombre = nombre;
        this._direccion = direccion;
    }

    get id() {
        return this._id;
    }
    

}