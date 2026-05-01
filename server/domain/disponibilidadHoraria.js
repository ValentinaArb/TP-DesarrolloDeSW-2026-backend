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
        console.log("diaSemana disponibilidad:", this.diaSemana);
        console.log("diaSemana fecha:", fecha.getDay());
        console.log("horaDesde:", this.horaDesde.getHours());
        console.log("horaHasta:", this.horaHasta.getHours());
        console.log("hora fecha:", fecha.getHours());

        console.log("primero:", fecha.getDay() === this.diaSemana);
        console.log("segundo:", fecha.getHours() <= this.horaHasta.getHours());
        console.log("tercero:", fecha.getHours() >= this.horaDesde.getHours());
        return (fecha.getDay() === this.diaSemana) &&
            (fecha.getHours() <= this.horaHasta.getHours()) &&
            (fecha.getHours() >= this.horaDesde.getHours());
    }
}
