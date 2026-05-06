import { no } from "zod/locales";
import { Notificacion } from "../domain/notificacion.js";

export class NotificacionMapper {
    static toPersistence(notificacion) {
        return {
            id: notificacion.id,
            destinatarioInfo: {
                nombre: notificacion.destinatario.nombre,
                apellido: notificacion.destinatario.apellido,
                usuarioId: notificacion.destinatario.usuarioId
            },
            remitenteInfo: {
                nombre: notificacion.remitente.nombre,
                apellido: notificacion.remitente.apellido,
                usuarioId: notificacion.remitente.usuarioId
            },
            mensaje: notificacion.mensaje,
            fechaHoraCreacion: notificacion.fechaHoraCreacion.toISOString(),
            fechaHoraLeida: notificacion.fechaHoraLeida ? notificacion.fechaHoraLeida.toISOString() : null,
            leida: notificacion.leida
        };
    }

    static toDomain(notificacionDoc) {
        return new Notificacion(
            notificacionDoc.id,
            {
                nombre: notificacionDoc.destinatarioInfo.nombre,
                apellido: notificacionDoc.destinatarioInfo.apellido,
                usuarioId: notificacionDoc.destinatarioInfo.usuarioId
            },
            {
                nombre: notificacionDoc.remitenteInfo.nombre,
                apellido: notificacionDoc.remitenteInfo.apellido,
                usuarioId: notificacionDoc.remitenteInfo.usuarioId
            },
            notificacionDoc.mensaje,
            new Date(notificacionDoc.fechaHoraCreacion),
            notificacionDoc.fechaHoraLeida ? new Date(notificacionDoc.fechaHoraLeida) : null,
            notificacionDoc.leida
        );
    }
}