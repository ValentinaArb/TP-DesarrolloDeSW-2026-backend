import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true }
});

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);