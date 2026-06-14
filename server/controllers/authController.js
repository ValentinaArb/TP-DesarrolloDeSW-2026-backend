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

      const usuario = await UsuarioModel.findOne({ mail });
      if (!usuario)
        return res.status(401).json({ error: "Credenciales inválidas" });

      const passwordOk = await bcrypt.compare(password, usuario.password);
      if (!passwordOk)
        return res.status(401).json({ error: "Credenciales inválidas" });

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
          rol,
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" },
      );

      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  // POST /auth/register
async register(req, res, next) {
    try {
        console.log("BODY RECIBIDO:", req.body);

        const { nombre, mail, password, rol, ...datos } = req.body;

        const existe = await UsuarioModel.findOne({ mail });
        if (existe)
            return res.status(400).json({ error: "El mail ya está registrado" });

        if (!["medico", "paciente"].includes(rol)) {
            console.log("ROL INVALIDO:", rol);
            return res.status(400).json({ error: "Rol inválido" });
        }

        const hash = await bcrypt.hash(password, 10);
        const nuevoUsuario = await UsuarioModel.create({ nombre, mail, password: hash });
        console.log("USUARIO CREADO:", nuevoUsuario);

        let entidad;
        try {
            if (rol === "medico") {
                const { apellido, matricula, servicios, sedes, disponibilidades } = datos;
                entidad = await MedicoModel.create({
                    usuario: { mail },
                    nombre,
                    apellido,
                    matricula,
                    servicios,
                    sedes,
                    disponibilidades
                });
            } else {
                const { apellido, dni, fechaNacimiento, obraSocial, plan, sexo } = datos;
                entidad = await PacienteModel.create({
                    usuario: { nombre, mail },
                    nombre,
                    apellido,
                    dni,
                    fechaNacimiento,
                    obraSocial,
                    plan,
                    sexo
                });
            }
            console.log("ENTIDAD CREADA:", entidad);
        } catch (errEntidad) {
            console.log("ERROR AL CREAR ENTIDAD:", errEntidad.message);
            await UsuarioModel.deleteOne({ _id: nuevoUsuario._id });
            return res.status(400).json({ error: "Datos inválidos para " + rol, detalle: errEntidad.message });
        }

        res.status(201).json({ mensaje: "Usuario creado", id: nuevoUsuario._id, entidadId: entidad._id });

    } catch (error) {
        console.log("ERROR GENERAL:", error.message);
        next(error);
    }
}
}
