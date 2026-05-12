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

        let usuario1 = new Usuario(null, "Pepe", "pepe@mail.com", "holaQueTal");
        let usuario2 = new Usuario(null, "Pablo", "pablo@mail.com", "comoAndas");
        usuario1 = await usuarioRepository.create(usuario1);
        usuario2 = await usuarioRepository.create(usuario2);
        console.log("Usuarios creados:", usuario1.id, usuario2.id);

        let sede1  = new Sede(null, "Sede 1", "Villa Urquiza");
        let sede2 = new Sede(null, "Sede 2", "Caballito");
        sede1 = await sedeRepository.create(sede1);
        sede2 = await sedeRepository.create(sede2);

        let servicio1 = new Servicio(null, "operacion",60, 0);
        let servicio2 = new Servicio(null, "odontologia", 60, 0);
        servicio1 = await servicioRepository.create(servicio1);
        servicio2 = await servicioRepository.create(servicio2);

        let coberturaServicio1 = new CoberturaServicio(servicio1, NivelCobertura.TOTAL);
        let coberturaServicio2 = new CoberturaServicio(servicio2, NivelCobertura.PARCIAL);
        coberturaServicio1 = await coberturaRepository.create(coberturaServicio1);
        coberturaServicio2 = await coberturaRepository.create(coberturaServicio2);

        let plan1 = new Plan(null, "Plan 100", [coberturaServicio1, coberturaServicio2]);
        let plan2 = new Plan(null, "Plan 200", [coberturaServicio2]);
        plan1 = await planRepository.create(plan1);
        plan2 = await planRepository.create(plan2);
        console.log("Planes creados:", plan1.id, plan2.id);

        let obraSocial1 = new ObraSocial(null, "OSDE", [plan2]);
        let obraSocial2 = new ObraSocial(null, "IPS", [plan1, plan2]);
        obraSocial1 = await obraSocialRepository.create(obraSocial1);
        obraSocial2 = await obraSocialRepository.create(obraSocial2);
        console.log("Obras sociales creadas:", obraSocial1.id, obraSocial2.id);

        let paciente1 = new Paciente(null, usuario1, "Juan", "Pérez", "12345678", "1990-01-01", obraSocial1, plan1, "M");
        let paciente2 = new Paciente(null, usuario2, "María", "Gómez", "87654321", "1985-05-15", obraSocial2, plan2, "F");
        paciente1 = await pacienteRepository.create(paciente1);
        paciente2 = await pacienteRepository.create(paciente2);
        console.log("Pacientes creados:", paciente1.id, paciente2.id);

        let disponibilidad1 = new DisponibilidadHoraria(null, 2, "08:00:00", "12:00:00");
        console.log("Disponibilidades horarias creadas (embebidas en médicos");

        let medico1 = new Medico(null, usuario1, 456, "Juan", "Pérez", [servicio1, servicio2], [sede1],  [disponibilidad1]);
        let medico2 = new Medico(null, usuario2, 123, "Maria", "Gómez", [servicio1], [sede2],  [disponibilidad1]);
        medico1 = await medicoRepository.create(medico1);
        medico2 = await medicoRepository.create(medico2);
        console.log("Médicos creados:", medico1.id, medico2.id);

        let notificacion1 = new Notificacion(null,medico1,paciente2, "Reservo turno","2027-04-19T20:00:00",null, false);
        let notificacion2 = new Notificacion(null,paciente2,medico1, "Cancelo turno","2026-08-19T10:00:00",null, false);
        notificacion1 = await notificacionRepository.create(notificacion1);
        notificacion2 = await notificacionRepository.create(notificacion2);
        console.log("Notificaciones creadas:", notificacion1.id, notificacion2.id);

        let turno1 = new Turno(null, medico1, "2026-04-19T20:00:00", "2026-04-19T21:00:00", paciente1, servicio1,sede1, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, "CREACION")], null);
        let turno2 = new Turno(null, medico2, "2027-03-10T15:30:00", "2027-03-10T16:30:00" , paciente2, servicio2,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.RESERVADO, null, null, "ALTA")], null);
        turno1 = await turnoRepository.create(turno1);
        turno2 = await turnoRepository.create(turno2);
        console.log("Turnos creados:", turno1.id, turno2.id);

        let cambioEstadoTurno1 = new CambioEstadoTurno(null, new Date(), EstadoTurno.DISPONIBLE, turno1, paciente1, "ALTA");
        let cambioEstadoTurno2 = new CambioEstadoTurno(null, new Date(), EstadoTurno.CANCELADO, turno2, paciente2, "No puedo al final");
        cambioEstadoTurno1 = await cambioEstadoTurnoRepository.create(cambioEstadoTurno1);
        cambioEstadoTurno2 = await cambioEstadoTurnoRepository.create(cambioEstadoTurno2);
        console.log("Cambios de estado de turno creados:", cambioEstadoTurno1.id, cambioEstadoTurno2.id);


        let practicaCara = new Servicio(null, "Cirugía Compleja", 120, 50000);
        practicaCara = await servicioRepository.create(practicaCara);

        let coberturaCara = new CoberturaServicio(practicaCara, NivelCobertura.PARCIAL);
        coberturaCara = await coberturaRepository.create(coberturaCara);
        
        plan1.coberturasServicio.push(coberturaCara);
        await planRepository.update(plan1, plan1.id);

        let especialidad2 = new Servicio(null, "Cardiología", 60, 5000);
        especialidad2 = await servicioRepository.create(especialidad2);

        let coberturaEsp = new CoberturaServicio(especialidad2, NivelCobertura.TOTAL);
        coberturaEsp = await coberturaRepository.create(coberturaEsp);
        
        plan2.coberturasServicio.push(coberturaEsp);
        await planRepository.update(plan2, plan2.id);

        let turno3 = new Turno(null, medico1, "2026-05-12T09:00:00", "2026-05-12T11:00:00", paciente1, practicaCara, sede1, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, "CREACION")], null);
        let turno4 = new Turno(null, medico1, "2026-05-20T15:00:00", "2026-05-20T16:00:00", paciente2, especialidad2, sede1, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, "CREACION")], null);

        await turnoRepository.create(turno3);
        await turnoRepository.create(turno4);


        console.log("Database populada correctamente.");
        process.exit(0);
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

await seedDatabase();