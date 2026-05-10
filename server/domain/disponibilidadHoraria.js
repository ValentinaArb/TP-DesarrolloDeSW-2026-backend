export class DisponibilidadHoraria{
    id;
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
        const horaFecha = fecha.getHours() * 60 + fecha.getMinutes();
        const desde = this.horaDesde.getHours() * 60 + this.horaDesde.getMinutes();
        const hasta = this.horaHasta.getHours() * 60 + this.horaHasta.getMinutes();

        return (fecha.getDay() === this.diaSemana) &&
            (horaFecha >= desde) &&
            (horaFecha <= hasta);
    }
}