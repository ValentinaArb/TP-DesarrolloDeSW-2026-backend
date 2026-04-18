class Plan{
    _id;
    _nombre;
    _coberturasEspecialidad
    _coberturasPractica;


    constructor(id = null, nombre, coberturasEspecialidad, coberturasPractica) {
        this._id = id;
        this._nombre = nombre;
        this._coberturasEspecialidad = coberturasEspecialidad;
        this._coberturasPractica = coberturasPractica;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        this._nombre = value;
    }

    get coberturasEspecialidad() {
        return this._coberturasEspecialidad;
    }

    set coberturasEspecialidad(value) {
        this._coberturasEspecialidad = value;
    }

    get coberturasPractica() {
        return this._coberturasPractica;
    }

    set coberturasPractica(value) {
        this._coberturasPractica = value;
    }

    _obtenerNivelDeLista(lista, propiedad, valorBuscado) {
        const cobertura = lista.find((item) => item[propiedad] === valorBuscado);
        return cobertura?.nivel || null;
    }

    obtenerCoberturaPorEspecialidad(especialidad) {
        return this._obtenerNivelDeLista(this._coberturasEspecialidad, 'especialidad', especialidad);
    }

    obtenerCoberturaPorPractica(practica) {
        return this._obtenerNivelDeLista(this._coberturasPractica, 'practica', practica);
    }
}