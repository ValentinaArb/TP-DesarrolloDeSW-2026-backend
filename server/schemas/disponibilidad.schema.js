import mongoose from "mongoose";

const disponibilidadSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    diaSemana: { type: Number, required: true },
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true }
});

export const DisponibilidadModel = mongoose.model("Disponibilidad", disponibilidadSchema);