import mongoose from "mongoose";

const coberturaSchema = new mongoose.Schema({
    servicio: {
        nombre: { type: String, required: true },
        costo: { type: Number }
    },
    nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true }
});

export const CoberturaModel = new mongoose.model("Cobertura", coberturaSchema);