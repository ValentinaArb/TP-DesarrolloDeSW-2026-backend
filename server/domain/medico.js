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

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get disponibilidades() {
        return this._disponibilidades;
    }

    set disponibilidades(value) {
        this._disponibilidades = value;
    }

    agregarDisponibilidad(disponibilidad) {
        this._disponibilidades.push(disponibilidad);
        console.log("agregarDisponibilidadDominio");
    }

    eliminarDisponibilidad(disponibilidad) {
        const indice = this._disponibilidades.indexOf(disponibilidad);

        this._disponibilidades.splice(indice, 1);
    }
}

export {Medico}