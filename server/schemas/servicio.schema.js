import mongoose from "mongoose";
import {Servicio} from "../domain/servicio.js";

const servicioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    duracionTurno: { type: Number, required: true },
    costo: { type: Number, required: true }
});

servicioSchema.loadClass(Servicio);

export const ServicioModel = mongoose.model("Servicio", servicioSchema,"servicios");