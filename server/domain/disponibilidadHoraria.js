export class DisponibilidadHoraria{
    id
    diaSemana;
    horaDesde;
    horaHasta;

    constructor(id=null, diaSemana, horaDesde, horaHasta) {
        this.id = id;
        this.diaSemana = diaSemana;
        this.horaDesde = new Date(horaDesde);
        this.horaHasta = new Date(horaHasta);
    }

    abarca(fecha) {
        return (fecha.getDay() === this.diaSemana) &&
            (fecha.getHours() <= this.horaHasta.getHours()) &&
            (fecha.getHours() >= this.horaDesde.getHours());
    }
}