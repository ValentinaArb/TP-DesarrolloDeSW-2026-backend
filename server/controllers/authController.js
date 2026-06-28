import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UsuarioModel } from "../schemas/usuario.schema.js";
import { MedicoModel } from "../schemas/medico.schema.js";
import { PacienteModel } from "../schemas/paciente.schema.js";
import { ServicioModel } from "../schemas/servicio.schema.js";
import { SedeModel } from "../schemas/sede.schema.js";

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

      const payloadToken = {
        id: usuario._id,
        entidadId: entidad._id,
        mail: usuario.mail,
        nombre: entidad.nombre,
        apellido: entidad.apellido,
        rol,
      };

      if (rol === "paciente") {
        payloadToken.dni = entidad.dni;
        payloadToken.fechaNacimiento = entidad.fechaNacimiento;
        payloadToken.obraSocial = entidad.obraSocial;
        payloadToken.plan = entidad.plan;
        payloadToken.sexo = entidad.sexo;
      }

      if (rol === "medico") {
        payloadToken.matricula = entidad.matricula;
        payloadToken.servicios = entidad.servicios;
        payloadToken.disponibilidades = entidad.disponibilidades;
        payloadToken.disponibilidadesAnteriores = entidad.disponibilidadesAnteriores;
      }

      const token = jwt.sign(
        payloadToken,
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
          const serviciosResueltos = await Promise.all(
            (servicios ?? []).map(async (s) => {
              const nombre = typeof s === "string" ? s : s.nombre;
              const existente = await ServicioModel.findOne({ nombre });
              if (existente) return { nombre: existente.nombre, _id: existente._id };
              const nuevo = await ServicioModel.create({ nombre, duracionTurno: 60, costo: 0 });
              return { nombre: nuevo.nombre, _id: nuevo._id };
            })
          );
          const sedesResueltas = await Promise.all(
            (sedes ?? []).map(async (s) => {
              const nombreSede = typeof s === "string" ? s : s.nombre;
              const existente = await SedeModel.findOne({ nombre: nombreSede });
              if (existente) return { nombre: existente.nombre, _id: existente._id };
              const nueva = await SedeModel.create({ nombre: nombreSede, direccion: "" });
              return { nombre: nueva.nombre, _id: nueva._id };
            })
          );

          entidad = await MedicoModel.create({
            usuario: nuevoUsuario,
            nombre,
            apellido,
            matricula,
            servicios: serviciosResueltos,
            sedes: sedesResueltas,
            disponibilidades,
          });
        } else {
          const { apellido, dni, fechaNacimiento, obraSocial, plan, sexo } = datos;
          entidad = await PacienteModel.create({
            usuario: nuevoUsuario,
            nombre,
            apellido,
            dni,
            fechaNacimiento,
            obraSocial,
            plan,
            sexo,
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