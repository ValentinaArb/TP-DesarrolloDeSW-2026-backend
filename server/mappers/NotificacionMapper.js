import { Notificacion } from "../domain/notificacion.js";

export class NotificacionMapper {
    static toPersistence(notificacion) {
        return {
            destinatario: {
                id: notificacion.destinatario.id,
                nombre: notificacion.destinatario.nombre,
                apellido: notificacion.destinatario.apellido
            },
            remitente: {
                id: notificacion.remitente.id,
                nombre: notificacion.remitente.nombre,
                apellido: notificacion.remitente.apellido
            },
            mensaje: notificacion.mensaje,
            fechaHoraCreacion: notificacion.fechaHoraCreacion.toISOString(),
            fechaHoraLeida: notificacion.fechaHoraLeida ? notificacion.fechaHoraLeida.toISOString() : null,
            leida: notificacion.leida
        };
    }

    static toDomain(notificacionDoc) {
        return new Notificacion(
            notificacionDoc._id.toString(),
            {
                nombre: notificacionDoc.destinatario.nombre,
                apellido: notificacionDoc.destinatario.apellido,
                id: notificacionDoc.destinatario.id
            },
            {
                nombre: notificacionDoc.remitente.nombre,
                apellido: notificacionDoc.remitente.apellido,
                id: notificacionDoc.remitente.id
            },
            notificacionDoc.mensaje,
            new Date(notificacionDoc.fechaHoraCreacion),
            notificacionDoc.fechaHoraLeida ? new Date(notificacionDoc.fechaHoraLeida) : null,
            notificacionDoc.leida
        );
    }
}