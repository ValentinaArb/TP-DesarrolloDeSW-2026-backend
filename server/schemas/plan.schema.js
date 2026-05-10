import mongoose from "mongoose"

const planSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    coberturas: [{ servicio: { nombre: { type: String, required: true }, costo: { type: Number } }, nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true } }],
    });

export const PlanModel = mongoose.model("Plan", planSchema);