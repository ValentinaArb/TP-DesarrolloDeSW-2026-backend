class CoberturaPractica{
    _practica;
    _nivel;

    constructor(practica, nivel) {
        this._practica = practica;
        this._nivel = nivel;
    }

    get practica() {
        return this._practica;
    }

    set practica(value) {
        this._practica = value;
    }

    get nivel() {
        return this._nivel;
    }

    set nivel(value) {
        this._nivel = value;
    }
}