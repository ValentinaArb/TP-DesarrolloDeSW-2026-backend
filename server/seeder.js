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
import { NivelCobertura} from "./domain/nivelCobertura.js";
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
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.info("Conexión a la base de datos establecida correctamente.");

        await mongoose.connection.db.dropDatabase();
        console.log("🧹 Base de datos reseteada por completo.");

        let usuario1 = new Usuario(null, "Valentina", "valentina@mail.com", "Valentina");
        let usuario2 = new Usuario(null, "Bautista", "bautista@mail.com", "Bautista");
        let usuario3 = new Usuario(null, "Sofia", "sofia@mail.com", "Sofia");
        let usuario4 = new Usuario(null, "Camila", "camila@mail.com", "Camila");
        let usuario5 = new Usuario(null, "Olaf", "olaf@mail.com", "Olaf");
        usuario1 = await usuarioRepository.create(usuario1);
        usuario2 = await usuarioRepository.create(usuario2);
        usuario3 = await usuarioRepository.create(usuario3);
        usuario4 = await usuarioRepository.create(usuario4);
        usuario5 = await usuarioRepository.create(usuario5);
        console.log("Usuarios creados:", usuario1.id, usuario2.id, usuario3.id, usuario4.id, usuario5.id);

        let sede1  = new Sede(null, "Av. Olazábal 5670", "Villa Urquiza");
        let sede2 = new Sede(null, "Rosario 866", "Caballito");
        sede1 = await sedeRepository.create(sede1);
        sede2 = await sedeRepository.create(sede2);

        let servicio1 = new Servicio(null, "Operación",60, 0);
        let servicio2 = new Servicio(null, "Odontología", 60, 0);
        let servicio3 = new Servicio(null, "Cirugía Compleja", 120, 50000);
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

        let paciente1 = new Paciente(null, usuario1, "Valentina", "Arbarello", "12345677", "1990-01-01", obraSocial1, plan1, "F");
        let paciente2 = new Paciente(null, usuario3, "Sofia", "Baudo", "12345678", "1990-01-01", obraSocial2, plan1, "F");
        let paciente3 = new Paciente(null, usuario4, "Camila", "Ramos", "87654321", "1985-05-15", obraSocial2, plan2, "F");
        paciente1 = await pacienteRepository.create(paciente1);
        paciente2 = await pacienteRepository.create(paciente2);
        paciente3 = await pacienteRepository.create(paciente3);
        console.log("Pacientes creados:", paciente1.id, paciente2.id, paciente3.id);

        let disponibilidad1 = new DisponibilidadHoraria(null, 2, "08:00:00", "12:00:00",servicio1, sede1);
        console.log("Disponibilidades horarias creadas (embebidas en médicos");

        let medico1 = new Medico(null, usuario2, 456, "Dr. Bautista", "Leguia", [servicio1, servicio2,servicio3, servicio4], [sede1],  [disponibilidad1]);
        let medico2 = new Medico(null, usuario5, 123, "Dr. Olaf", "Querol", [servicio1], [sede2],  [disponibilidad1]);
        medico1 = await medicoRepository.create(medico1);
        medico2 = await medicoRepository.create(medico2);
        console.log("Médicos creados:", medico1.id, medico2.id);

        let notificacion1 = new Notificacion(null,medico1,paciente2, "Reservo turno","2027-04-19T20:00:00",null, false);
        let notificacion2 = new Notificacion(null,paciente2,medico1, "Cancelo turno","2026-08-19T10:00:00",null, false);
        notificacion1 = await notificacionRepository.create(notificacion1);
        notificacion2 = await notificacionRepository.create(notificacion2);
        console.log("Notificaciones creadas:", notificacion1.id, notificacion2.id);

        let turno1 = new Turno(null, medico1, "2027-04-19T20:00:00", "2027-04-19T21:00:00", paciente1, servicio1,sede1, EstadoTurno.RESERVADO, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, "CREACION")], 2000);
        let turno2 = new Turno(null, medico2, "2027-03-10T15:30:00", "2027-03-10T16:30:00" , null, servicio2,sede2, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.RESERVADO, null, null, "ALTA")], 3000);
        let turno3 = new Turno(null, medico1, "2027-05-12T09:00:00", "2027-05-12T11:00:00", paciente1, servicio3, sede1, EstadoTurno.RESERVADO, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.RESERVADO, null, null, "CREACION")], 50000);
        let turno4 = new Turno(null, medico1, "2027-05-20T15:00:00", "2027-05-20T16:00:00", paciente2, servicio4, sede1, EstadoTurno.RESERVADO, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.RESERVADO, null, null, "CREACION")], 5000);

        turno3 = await turnoRepository.create(turno3);
        turno4 = await turnoRepository.create(turno4);
        turno1 = await turnoRepository.create(turno1);
        turno2 = await turnoRepository.create(turno2);
        console.log("Turnos creados:", turno1.id, turno2.id);

        let cambioEstadoTurno1 = new CambioEstadoTurno(null, new Date(), EstadoTurno.DISPONIBLE, turno1, paciente1, "ALTA");
        let cambioEstadoTurno2 = new CambioEstadoTurno(null, new Date(), EstadoTurno.CANCELADO, turno2, paciente2, "No puedo al final");
        cambioEstadoTurno1 = await cambioEstadoTurnoRepository.create(cambioEstadoTurno1);
        cambioEstadoTurno2 = await cambioEstadoTurnoRepository.create(cambioEstadoTurno2);
        console.log("Cambios de estado de turno creados:", cambioEstadoTurno1.id, cambioEstadoTurno2.id);

        console.log("Database populada correctamente.");
        process.exit(0);
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

await seedDatabase();