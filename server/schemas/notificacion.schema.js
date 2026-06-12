import mongoose from "mongoose";
import {Notificacion} from "../domain/notificacion.js";

const notificacionSchema = new mongoose.Schema({
    destinatario: {
        _id: {type: String, required: true},
        nombre: { type: String, required: true },
        apellido: { type: String, required: true }
    },
    remitente: {
        _id: { type: String, required: true },
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
    estaLeida: {
        type: Boolean,
        default: false
    }
});

notificacionSchema.loadClass(Notificacion);

export const NotificacionModel = mongoose.model("Notificacion", notificacionSchema, "notificacions");