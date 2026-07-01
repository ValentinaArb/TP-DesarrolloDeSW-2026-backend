import mongoose from "mongoose";
import dotenv from "dotenv";
import { Usuario } from "./domain/usuario.js";
import { Sede } from "./domain/sede.js";
import { Paciente } from "./domain/paciente.js";
import { CambioEstadoTurno } from "./domain/cambioEstadoTurno.js";
import { CoberturaServicio } from "./domain/coberturaServicio.js";
import { Servicio } from "./domain/servicio.js";
import { ObraSocial } from "./domain/obraSocial.js";
import { Plan } from "./domain/plan.js";
import { Notificacion } from "./domain/notificacion.js";
import { DisponibilidadHoraria } from "./domain/disponibilidadHoraria.js";
import { Medico } from "./domain/medico.js";
import { Turno } from "./domain/turno.js";
import { EstadoTurno } from "./domain/estadoTurno.js";
import { NivelCobertura } from "./domain/nivelCobertura.js";
import { CambioEstadoTurnoRepository } from "./repositories/cambioEstadoTurnoRepository.js";
import { CoberturaRepository } from "./repositories/coberturaRepository.js";
import { ServicioRepository } from "./repositories/servicioRepository.js";
import { ObraSocialRepository } from "./repositories/obraSocialRepository.js";
import { NotificacionRepository } from "./repositories/notificacionRepository.js";
import { PacienteRepository } from "./repositories/pacienteRepository.js";
import { MedicoRepository } from "./repositories/medicoRepository.js";
import { TurnoRepository } from "./repositories/turnoRepository.js";
import { UsuarioRepository } from "./repositories/usuarioRepository.js";
import { SedeRepository } from "./repositories/sedeRepository.js";
import { PlanRepository } from "./repositories/planRepository.js";

const cambioEstadoTurnoRepository = new CambioEstadoTurnoRepository();
const coberturaRepository = new CoberturaRepository();
const servicioRepository = new ServicioRepository();
const obraSocialRepository = new ObraSocialRepository();
const notificacionRepository = new NotificacionRepository();
const pacienteRepository = new PacienteRepository();
const medicoRepository = new MedicoRepository();
const turnoRepository = new TurnoRepository();
const usuarioRepository = new UsuarioRepository();
const sedeRepository = new SedeRepository();
const planRepository = new PlanRepository();

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.info("Conexión a la base de datos establecida correctamente.");

    await mongoose.connection.db.dropDatabase();
    console.log("Base de datos reseteada por completo.");

    let sede1 = new Sede(null, "Av. Olazábal 5670", "Villa Urquiza");
    let sede2 = new Sede(null, "Rosario 866", "Caballito");
    sede1 = await sedeRepository.create(sede1);
    sede2 = await sedeRepository.create(sede2);

    let servicio1 = new Servicio(null, "Operación", 120, 10000);
    let servicio2 = new Servicio(null, "Odontología", 60, 1000);
    let servicio3 = new Servicio(null, "Cirugía Compleja", 240, 50000);
    let servicio4 = new Servicio(null, "Cardiología", 60, 5000);
    servicio1 = await servicioRepository.create(servicio1);
    servicio2 = await servicioRepository.create(servicio2);
    servicio3 = await servicioRepository.create(servicio3);
    servicio4 = await servicioRepository.create(servicio4);

    let coberturaServicio1 = new CoberturaServicio(servicio1, NivelCobertura.TOTAL);
    let coberturaServicio2 = new CoberturaServicio(servicio2, NivelCobertura.PARCIAL);
    let coberturaServicio3 = new CoberturaServicio(servicio3, NivelCobertura.PARCIAL);
    let coberturaServicio4 = new CoberturaServicio(servicio4, NivelCobertura.TOTAL);
    coberturaServicio1 = await coberturaRepository.create(coberturaServicio1);
    coberturaServicio2 = await coberturaRepository.create(coberturaServicio2);
    coberturaServicio3 = await coberturaRepository.create(coberturaServicio3);
    coberturaServicio4 = await coberturaRepository.create(coberturaServicio4);
    console.log("Coberturas creadas:", coberturaServicio1, coberturaServicio2, coberturaServicio3, coberturaServicio4);

    let plan1 = new Plan(null, "210", [coberturaServicio1, coberturaServicio2]);
    let plan2 = new Plan(null, "310", [coberturaServicio2]);
    let plan3 = new Plan(null, "410", [coberturaServicio3, coberturaServicio4]);
    plan1 = await planRepository.create(plan1);
    plan2 = await planRepository.create(plan2);
    plan3 = await planRepository.create(plan3);
    console.log("Planes creados:", plan1.id, plan2.id, plan3.id);
    
    plan1.coberturasServicio.push(coberturaServicio3);
    await planRepository.update(plan1, plan1.id);
    plan2.coberturasServicio.push(coberturaServicio4);
    await planRepository.update(plan2, plan2.id);

    let obraSocial1 = new ObraSocial(null, "OSDE", [plan2]);
    let obraSocial2 = new ObraSocial(null, "IPS", [plan1, plan2]);
    obraSocial1 = await obraSocialRepository.create(obraSocial1);
    obraSocial2 = await obraSocialRepository.create(obraSocial2);
    console.log("Obras sociales creadas:", obraSocial1.id, obraSocial2.id);

    console.log("Database populada correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

await seedDatabase();
