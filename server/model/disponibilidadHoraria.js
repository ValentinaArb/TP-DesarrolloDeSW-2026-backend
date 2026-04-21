export class DisponibilidadHoraria{
    _id
    _diaSemana;
    _horaDesde;
    _horaHasta;


    constructor(id=null, diaSemana, horaDesde, horaHasta) {
        this._id = id;
        this._diaSemana = diaSemana;
        this._horaDesde = horaDesde;
        this._horaHasta = horaHasta;
    }

    get diaSemana() {
        return this._diaSemana;
    }

    set diaSemana(value) {
        this._diaSemana = value;
    }

    get horaDesde() {
        return this._horaDesde;
    }

    set horaDesde(value) {
        this._horaDesde = value;
    }

    get horaHasta() {
        return this._horaHasta;
    }

    set horaHasta(value) {
        this._horaHasta = value;
    }

    get id() {
        return this._id;
    }

    abarca(fecha) {
        return (fecha.getDay() === this._diaSemana) &&
            (fecha.getTime() <= this._horaHasta) &&
            (fecha.getTime() >= this._horaDesde);
    }
}
