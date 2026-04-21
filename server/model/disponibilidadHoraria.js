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

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
        const fechaDisponibilidad = new Date()
        console.log("Fecha a verificar:", fecha);

        console.log("fecha.getDay()", fecha.getDay());
        console.log("this._diaSemana:", this._diaSemana);

        console.log("fecha.getTime()", fecha.getHours());
        console.log("this._horaHasta:", this._horaHasta);

        console.log("fecha.getTime()", fecha.getHours());
        console.log("this._horaDesde:", this._horaDesde);
        
        return (fecha.getDay() === this._diaSemana) &&
            (fecha.getHours() <= this._horaHasta.getHours()) &&
            (fecha.getHours() >= this._horaDesde.getHours());
    }

    comparFecha(fechaMedico, fechaTurno) {
                // 1. Convertir la fecha que recibes a minutos del día
        const minutosFecha = (fecha.getHours() * 60) + fecha.getMinutes();

        // 2. Función auxiliar para convertir tus strings "HH:mm" a minutos
        const convertirAMinutos = (horaString) => {
            const [horas, minutos] = horaString.split(':').map(Number);
            return (horas * 60) + minutos;
        };

        const minutosDesde = convertirAMinutos(this._horaDesde); // 08:00 -> 480
        const minutosHasta = convertirAMinutos(this._horaHasta); // 12:00 -> 720

        // 3. Comparación final
        const mismoDia = nombreDia === this._diaSemana;
        const enRango = minutosFecha >= minutosDesde && minutosFecha <= minutosHasta;

        return mismoDia && enRango;
    }

}
