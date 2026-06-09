import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioModel } from "../schemas/usuario.schema.js";
import { MedicoModel } from "../schemas/medico.schema.js";
import { PacienteModel } from "../schemas/paciente.schema.js";

export class AuthController {

    // POST /auth/login
    async login(req, res, next) {
        try {
            const { mail, password } = req.body;

            // busca el usuario por mail
            const usuario = await UsuarioModel.findOne({ mail });
            if (!usuario)
                return res.status(401).json({ error: "Credenciales inválidas" });

            // verifica password
            const passwordOk = await bcrypt.compare(password, usuario.password);
            if (!passwordOk)
                return res.status(401).json({ error: "Credenciales inválidas" });

            // determina rol buscando en medico o paciente
            let rol = null;
            let entidad = null;

            const medico = await MedicoModel.findOne({ "usuario.mail": mail });
            if (medico) {
                rol = "medico";
                entidad = medico;
            } else {
                const paciente = await PacienteModel.findOne({ "usuario.mail": mail });
                if (paciente) {
                    rol = "paciente";
                    entidad = paciente;
                }
            }

            if (!rol)
                return res.status(401).json({ error: "Usuario sin perfil asignado" });

            // genera JWT
            const token = jwt.sign(
                {
                    id: usuario._id,
                    entidadId: entidad._id,
                    mail: usuario.mail,
                    nombre: entidad.nombre,
                    rol
                },
                process.env.JWT_SECRET,
                { expiresIn: "8h" }
            );

            res.json({ token });

        } catch (error) {
            next(error);
        }
    }

    // POST /auth/register
    async register(req, res, next) {
        try {
            const { nombre, mail, password } = req.body;

            const existe = await UsuarioModel.findOne({ mail });
            if (existe)
                return res.status(400).json({ error: "El mail ya está registrado" });

            const hash = await bcrypt.hash(password, 10);
            const nuevoUsuario = await UsuarioModel.create({ nombre, mail, password: hash });

            res.status(201).json({ mensaje: "Usuario creado", id: nuevoUsuario._id });

        } catch (error) {
            next(error);
        }
    }
}