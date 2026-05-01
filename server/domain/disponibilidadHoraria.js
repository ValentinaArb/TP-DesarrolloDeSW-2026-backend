export class DisponibilidadHoraria{
    _id
    _diaSemana;
    _horaDesde;
    _horaHasta;


    constructor(id=null, diaSemana, horaDesde, horaHasta) {
        this._id = id;
        this._diaSemana = diaSemana;
        this._horaDesde = new Date(horaDesde);
        this._horaHasta = new Date(horaHasta);
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    abarca(fecha) {
        return (fecha.getDay() === this._diaSemana) &&
            (fecha.getHours() <= this._horaHasta.getHours()) &&
            (fecha.getHours() >= this._horaDesde.getHours());
    }
}
