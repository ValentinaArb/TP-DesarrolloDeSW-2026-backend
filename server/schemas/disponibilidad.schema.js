import mongoose from "mongoose";
import {DisponibilidadHoraria} from "../domain/disponibilidadHoraria.js";

const disponibilidadSchema = new mongoose.Schema({
    diaSemana: { type: Number, required: true },
    horaDesde: { type: String, required: true },
    horaHasta: { type: String, required: true },
    servicio: {
        _id: { type: String, required: true },
        nombre: { type: String, required: true },
        duracionTurno: { type: Number, required: true },
        costo: { type: Number, required: true }
    },
    sede: {
        _id: { type: String, required: true },
        nombre: { type: String, required: true },
        direccion: { type: String, required: true }
    }
});

disponibilidadSchema.loadClass(DisponibilidadHoraria);

export const DisponibilidadModel = mongoose.model("Disponibilidad", disponibilidadSchema);