export class Usuario{
    _id;
    _nombre;
    _password;

    constructor(id = null, nombre, password) {
        this._id = id;
        this._nombre = nombre;
        this._password = password;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    set password(value) {
        this._password = value;
    }
}