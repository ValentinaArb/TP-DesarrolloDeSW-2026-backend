class CoberturaEspecialidad{
    _especialidad;
    _nivel;


    constructor(especialidad, nivel) {
        this._especialidad = especialidad;
        this._nivel = nivel;
    }

    get especialidad() {
        return this._especialidad;
    }

    set especialidad(value) {
        this._especialidad = value;
    }

    get nivel() {
        return this._nivel;
    }

    set nivel(value) {
        this._nivel = value;
    }
}

