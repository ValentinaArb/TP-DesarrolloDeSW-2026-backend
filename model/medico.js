class Medico {
    _id
    _usuario
    _matricula
    _nombre
    _apellido
    _especialidades
    _practicas
    _sedes
    _disponibilidades


    constructor(id = null, usuario, matricula, nombre, apellido, especialidades, practicas, sedes, disponibilidades) {
        this._id = id;
        this._usuario = usuario;
        this._matricula = matricula;
        this._nombre = nombre;
        this._apellido = apellido;
        this._especialidades = especialidades;
        this._practicas = practicas;
        this._sedes = sedes;
        this._disponibilidades = disponibilidades;
    }


    get usuario() {
        return this._usuario;
    }

    set usuario(value) {
        this._usuario = value;
    }

    get matricula() {
        return this._matricula;
    }

    set matricula(value) {
        this._matricula = value;
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

    get especialidades() {
        return this._especialidades;
    }

    set especialidades(value) {
        this._especialidades = value;
    }

    get practicas() {
        return this._practicas;
    }

    set practicas(value) {
        this._practicas = value;
    }

    get sedes() {
        return this._sedes;
    }

    set sedes(value) {
        this._sedes = value;
    }

    get disponibilidades() {
        return this._disponibilidades;
    }

    set disponibilidades(value) {
        this._disponibilidades = value;
    }

    definirDisponibilidad(disponibilidad) { // No es lo mismo que el setter?

    }
}