export class DisponibilidadHoraria{
    id;
    diaSemana;
    horaDesde;
    horaHasta;

    constructor(id=null, diaSemana, horaDesde, horaHasta) {
        this.id = id;
        this.diaSemana = diaSemana;
        // Convierte a string si es Date, para evitar problemas de zona horaria
        this.horaDesde = typeof horaDesde === 'string' ? horaDesde : horaDesde instanceof Date ? this.extraerHora(horaDesde) : horaDesde;
        this.horaHasta = typeof horaHasta === 'string' ? horaHasta : horaHasta instanceof Date ? this.extraerHora(horaHasta) : horaHasta;
    }

    extraerHora(date) {
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        const segundos = String(date.getSeconds()).padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }

    abarca(fecha) {
        const horaFecha = fecha.getHours() * 60 + fecha.getMinutes();
        const [desdeH, desdeM] = this.horaDesde.split(':').map(Number);
        const [hastaH, hastaM] = this.horaHasta.split(':').map(Number);
        const desde = desdeH * 60 + desdeM;
        const hasta = hastaH * 60 + hastaM;

        return (fecha.getDay() === this.diaSemana) &&
            (horaFecha >= desde) &&
            (horaFecha <= hasta);
    }
}