export class Notificacion {
    id
    destinatario
    remitente
    mensaje
    fechaHoraCreacion
    fechaHoraLeida
    estaLeida

    constructor(id = null, destinatario, remitente, mensaje, fechaHoraCreacion, fechaHoraLeida, leida) {
        this.id = id;
        this.destinatario = destinatario;
        this.remitente = remitente;
        this.mensaje = mensaje;
        this.fechaHoraCreacion = fechaHoraCreacion instanceof Date ? fechaHoraCreacion : new Date(fechaHoraCreacion);
        this.fechaHoraLeida = fechaHoraLeida;
        this.estaLeida = false;
    }

    marcarComoLeida() {
        this.fechaHoraLeida = new Date()
        this.estaLeida = true;
    }
}