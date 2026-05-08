import mongoose from "mongoose";

const notificacionSchema = new mongoose.Schema({
    destinatario: {
        id: {type: String, required: true},
        nombre: { type: String, required: true },
        apellido: { type: String, required: true }
    },
    remitente: {
        id: { type: String, required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true }
    },
    mensaje: {
        type: String,
        required: true
    },
    fechaHoraCreacion: {
        type: Date,
        default: Date.now
    },
    fechaHoraLeida: {
        type: Date
    },
    leida: {
        type: Boolean,
        default: false
    }
});

export const NotificacionModel = mongoose.model("Notificacion", notificacionSchema);