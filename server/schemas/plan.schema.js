import mongoose from "mongoose"
import { id } from "zod/locales"

const planSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: { type: String, required: true },
    coberturas: [{ servicio: { nombre: { type: String, required: true }, costo: { type: Number } }, nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true } }],
    });

export const PlanModel = mongoose.model("Plan", planSchema);