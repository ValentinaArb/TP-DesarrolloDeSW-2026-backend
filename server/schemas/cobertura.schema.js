import mongoose from "mongoose";

const coberturaSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    servicio: {
        nombre: { type: String, required: true },
        costo: { type: Number }
    },
    nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true }
});