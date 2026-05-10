import mongoose from "mongoose";

const disponibilidadSchema = new mongoose.Schema({
    diaSemana: { type: Number, required: true },
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true }
});

export const DisponibilidadModel = mongoose.model("Disponibilidad", disponibilidadSchema);