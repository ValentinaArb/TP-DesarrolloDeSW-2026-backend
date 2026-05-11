import mongoose from "mongoose";
import dotenv from "dotenv";
import { Usuario } from "./domain/usuario.js";
import { Sede } from "./domain/sede.js";
import { Practica } from "./domain/practica.js";
import { Paciente } from "./domain/paciente.js";
import { CambioEstadoTurno } from "./domain/cambioEstadoTurno.js";
import { CoberturaServicio } from "./domain/coberturaServicio.js";
import { Especialidad } from "./domain/especialidad.js";
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
import { EspecialidadRepository } from "./repositories/especialidadRepository.js";
import { ObraSocialRepository } from "./repositories/obraSocialRepository.js";
import { DisponibilidadRepository } from "./repositories/disponibilidadRepository.js";
import { NotificacionRepository } from "./repositories/notificacionRepository.js";
import { PacienteRepository } from "./repositories/pacienteRepository.js";
import { MedicoRepository } from "./repositories/medicoRepository.js";
import { TurnoRepository } from "./repositories/turnoRepository.js";
import { UsuarioRepository } from "./repositories/usuarioRepository.js";
import { SedeRepository } from "./repositories/sedeRepository.js";
import { PracticaRepository } from "./repositories/practicaRepository.js";
import { PlanRepository } from "./repositories/planRepository.js";

const cambioEstadoTurnoRepository = new CambioEstadoTurnoRepository();
const coberturaRepository = new CoberturaRepository();
const especialidadRepository = new EspecialidadRepository();
const obraSocialRepository = new ObraSocialRepository();
const disponibilidadRepository = new DisponibilidadRepository();
const notificacionRepository = new NotificacionRepository();
const pacienteRepository = new PacienteRepository();
const medicoRepository = new MedicoRepository();
const turnoRepository = new TurnoRepository();
const usuarioRepository = new UsuarioRepository();
const sedeRepository = new SedeRepository();
const practicaRepository = new PracticaRepository();
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
        await usuarioRepository.create(usuario1);
        await usuarioRepository.create(usuario2);

        let sede1  = new Sede(null, "Sede 1", "Villa Urquiza");
        let sede2 = new Sede(null, "Sede 2", "Caballito");
        await sedeRepository.create(sede1);
        await sedeRepository.create(sede2);

        let practica1 = new Practica(null, "1234","Operación", 60, 0);
        practica1 = await practicaRepository.create(practica1);

        let especialidad1 = new Especialidad(null, "odontologia", 60, 0);
        await especialidadRepository.create(especialidad1);

        let coberturaServicio1 = new CoberturaServicio(especialidad1, NivelCobertura.TOTAL);
        let coberturaServicio2 = new CoberturaServicio(practica1, NivelCobertura.PARCIAL);
        await coberturaRepository.create(coberturaServicio1);
        await coberturaRepository.create(coberturaServicio2);

        let plan1 = new Plan(null, "Plan 100", [coberturaServicio1, coberturaServicio2]);
        let plan2 = new Plan(null, "Plan 200", [coberturaServicio2]);
        plan1 = await planRepository.create(plan1);
        plan2 = await planRepository.create(plan2);

        let obraSocial1 = new ObraSocial(null, "OSDE", [plan2]);
        let obraSocial2 = new ObraSocial(null, "IPS", [plan1, plan2]);
        await obraSocialRepository.create(obraSocial1);
        await obraSocialRepository.create(obraSocial2);

        let paciente1 = new Paciente(null, usuario1, "Juan", "Pérez", "12345678", "1990-01-01", obraSocial1, plan1, "M");
        let paciente2 = new Paciente(null, usuario2, "María", "Gómez", "87654321", "1985-05-15", obraSocial2, plan2, "F");
        paciente1 = await pacienteRepository.create(paciente1);
        paciente2 = await pacienteRepository.create(paciente2);

        let disponibilidad1 = new DisponibilidadHoraria(null, 2, new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 12, 0));
        let disponibilidad2 = new DisponibilidadHoraria(null, 4, new Date(0, 0, 0, 14, 0), new Date(0, 0, 0, 18, 0));
        let disponibilidad3 = new DisponibilidadHoraria(null, 4, new Date(2026,6,8,9,0), new Date(2026,6,8,16,0));
        let disponibilidad4 = new DisponibilidadHoraria(null, 5, new Date(2026,6,9,9,0), new Date(2026,6,9,16,0));
        await disponibilidadRepository.create(disponibilidad1);
        await disponibilidadRepository.create(disponibilidad2);
        await disponibilidadRepository.create(disponibilidad3);
        await disponibilidadRepository.create(disponibilidad4);

        let medico1 = new Medico(null, usuario1, 456, "Juan", "Pérez", [especialidad1, practica1], [sede1],  [disponibilidad1]);
        let medico2 = new Medico(null, usuario2, 123, "Maria", "Gómez", [especialidad1, practica1], [sede2],  [disponibilidad1]);
        medico1 = await medicoRepository.create(medico1);
        medico2 = await medicoRepository.create(medico2);

        let notificacion1 = new Notificacion(null,medico1,paciente2, "Reservo turno","2027-04-19T20:00:00",null, true);
        let notificacion2 = new Notificacion(null,paciente2,medico1, "Cancelo turno","2026-08-19T10:00:00",null, null);
        await notificacionRepository.create(notificacion1);
        await notificacionRepository.create(notificacion2);

        let turno1 = new Turno(null, medico1, "2026-04-19T20:00:00", null, paciente1, practica1,sede1, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.DISPONIBLE, null, null, "CREACION")], null);
        let turno2 = new Turno(null, medico2, "2027-03-10T15:30:00", null , paciente2, practica1,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(null, Date.now(), EstadoTurno.RESERVADO, null, null, "ALTA")], null);
        await turnoRepository.create(turno1);
        await turnoRepository.create(turno2);

        let cambioEstadoTurno1 = new CambioEstadoTurno(null, new Date(), EstadoTurno.DISPONIBLE, turno1, paciente1, "ALTA");
        let cambioEstadoTurno2 = new CambioEstadoTurno(null, new Date(), EstadoTurno.CANCELADO, turno2, paciente2, "No puedo al final");
        await cambioEstadoTurnoRepository.create(cambioEstadoTurno1);
        await cambioEstadoTurnoRepository.create(cambioEstadoTurno2);


        let practicaCara = new Practica(null, "9999", "Cirugía Compleja", 120, 50000);
        practicaCara = await practicaRepository.create(practicaCara);

        let coberturaCara = new CoberturaServicio(practicaCara, NivelCobertura.PARCIAL);
        await coberturaRepository.create(coberturaCara);
        plan1.coberturasServicio.push(coberturaCara);
        
        await planRepository.update(plan1, plan1.id);

        let especialidad2 = new Especialidad(null, "Cardiología", 60, 5000);
        especialidad2 = await especialidadRepository.create(especialidad2);

        let coberturaEsp = new CoberturaServicio(especialidad2, NivelCobertura.TOTAL);
        await coberturaRepository.create(coberturaEsp);
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