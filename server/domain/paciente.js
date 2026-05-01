class Paciente {
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

    get id() {
        return this._id;
    }
}

export { Paciente };