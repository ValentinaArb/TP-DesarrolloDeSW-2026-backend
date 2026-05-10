import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    medicoInfo: {
        id: {type: String, required: true},
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
    },
    fechaInicio: { type: Date, required: true },
    fechaFinal: { type: Date, required: true },
    pacienteInfo: {
        id: {type: String},
        nombre: { type: String },
        apellido: { type: String },
    },
    servicioInfo: {
        nombre: { type: String, required: true },
        duracionEnMins: { type: Number, required: true }
    },
    sedeInfo: {
        nombre: { type: String, required: true },
        direccion: { type: String, required: true }
    },
    estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
    historialDeEstados: [
        {
            fechaInicioIngreso: { type: Date, required: true },
            estado: { type: String, enum: ["DISPONIBLE", "RESERVADO", "CANCELADO", "CONFIRMADO", "REALIZADO"], required: true },
            motivo: { type: String },
        }
    ],
    costo: { type: Number }
});

export const TurnoModel = mongoose.model("Turno", turnoSchema);