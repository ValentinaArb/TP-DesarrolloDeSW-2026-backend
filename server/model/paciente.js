class Paciente{
    id
    _usuario
    _nombre
    _apellido
    _dni
    _fechaNacimiento
    _obraSocial
    _plan
    _sexo


    constructor(id, usuario, nombre, apellido, dni, fechaNacimiento, obraSocial, plan, sexo) {
        this.id = id;
        this._usuario = usuario;
        this._nombre = nombre;
        this._apellido = apellido;
        this._dni = dni;
        this._fechaNacimiento = fechaNacimiento;
        this._obraSocial = obraSocial;
        this._plan = plan;
        this._sexo = sexo;
    }


    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get apellido() {
        return this._apellido;
    }

    set apellido(value) {
        this._apellido = value;
    }

    get dni() {
        return this._dni;
    }

    set dni(value) {
        this._dni = value;
    }

    get fechaNacimiento() {
        return this._fechaNacimiento;
    }

    set fechaNacimiento(value) {
        this._fechaNacimiento = value;
    }

    get obraSocial() {
        return this._obraSocial;
    }

    set obraSocial(value) {
        this._obraSocial = value;
    }

    get plan() {
        return this._plan;
    }

    set plan(value) {
        this._plan = value;
    }

    get sexo() {
        return this._sexo;
    }

    set sexo(value) {
        this._sexo = value;
    }
}

export { Paciente };