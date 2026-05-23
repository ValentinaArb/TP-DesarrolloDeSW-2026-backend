import mongoose from "mongoose";
import {CoberturaServicio} from "../domain/coberturaServicio.js";

const coberturaSchema = new mongoose.Schema({
    servicio: {
        nombre: { type: String, required: true },
        costo: { type: Number }
    },
    nivel: { type: String, enum: ["TOTAL", "PARCIAL", "NO_CUBIERTA"], required: true }
});

coberturaSchema.loadClass(CoberturaServicio);

export const CoberturaModel = new mongoose.model("Cobertura", coberturaSchema);