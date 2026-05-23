import mongoose from "mongoose"
import {Plan} from "../domain/plan.js";

const planSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    coberturasServicio: [{ servicio: { nombre: { type: String, required: true }, costo: { type: Number } }, nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true } }],
    });

planSchema.loadClass(Plan);

export const PlanModel = mongoose.model("Plan", planSchema);