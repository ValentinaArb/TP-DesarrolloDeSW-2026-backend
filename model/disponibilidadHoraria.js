class DisponibilidadHoraria{
    _diaSemana;
    _horaDesde;
    _horaHasta;


    constructor(diaSemana, horaDesde, horaHasta) {
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
}
