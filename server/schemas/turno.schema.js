import mongoose from "mongoose";
import { es } from "zod/locales";

const turnoSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    medicoInfo: {
        medicoId: { type: mongoose.Schema.Types.ObjectId, ref: "Medico", required: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
    },
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    pacienteInfo: {
        pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Paciente" },
        nombre: { type: String },
        apellido: { type: String },
    },
    servicioInfo: {
        nombre: { type: String, required: true },
        duracion: { type: Number, required: true }
    },
    sedeInfo: {
        nombre: { type: String, required: true },
        direccion: { type: String, required: true }
    },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
    historialDeEstados: [
        {
            fecha: { type: Date, required: true },
            nuevoEstado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
            motivo: { type: String },
        }
    ],
    costo: { type: Number }
});

export const TurnoModel = mongoose.model("Turno", turnoSchema);