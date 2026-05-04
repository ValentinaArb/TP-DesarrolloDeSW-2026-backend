export class Notificacion {
    id
    destinatario
    remitente
    mensaje
    fechaHoraCreacion
    fechaHoraLeida
    leida

    constructor(id = null, destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida, leida) {
        this.id = id;
        this.destinatario = destinatario;
        this.remitente = remitente;
        this.mensaje = mensaje;
        this.fechaHoraCreacion = fechaHoraCreacion;
        this.fechaHoraLeida = fechaHoraLeida;
        this.leida= false;
    }

    marcarComoLeida(disponibilidad) {
        this.fechaHoraLeida = new Date()
        this.leida = true;
    }
}