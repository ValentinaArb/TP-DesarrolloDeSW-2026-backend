import mongoose from "mongoose";

const sedeSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true }
});

export const SedeModel = mongoose.model("Sede", sedeSchema);