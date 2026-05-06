import mongoose from "mongoose";
import { required } from "zod/mini";

const notificacionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    destinatarioInfo: {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
    },
    remitenteInfo: {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
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