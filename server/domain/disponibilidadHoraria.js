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

    abarca(fecha) {
        return (fecha.getDay() === this._diaSemana) &&
            (fecha.getHours() <= this._horaHasta.getHours()) &&
            (fecha.getHours() >= this._horaDesde.getHours());
    }

    compararFecha() {
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
