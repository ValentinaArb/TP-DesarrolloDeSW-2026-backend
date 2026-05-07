import mongoose from "mongoose";
import "dotenv/config";
import { Usuario } from "./domain/usuario";
import { Sede } from "./domain/sede.js";
import { Practica } from "./domain/practica.js";
import { Paciente } from "./domain/paciente";
import { Repository } from "./repositories/repository";
import { MedicoMapper } from "./mappers/MedicoMapper";
import { MedicoModel } from "./schemas/medico.schema";
import { TurnoMapper } from "./mappers/TurnoMapper";
import { TurnoModel } from "./schemas/turno.schema";
import { CambioEstadoTurno } from "./domain/cambioEstadoTurno";
import { CoberturaServicio } from "./domain/coberturaServicio";
import { Especialidad } from "./domain/especialidad";
import { ObraSocial } from "./domain/obraSocial";
import { Plan } from "./domain/plan";
import { Notificacion } from "./domain/notificacion";
import { DisponibilidadHoraria } from "./domain/disponibilidadHoraria";
import { Medico } from "./domain/medico";
import { Turno } from "./domain/turno";
import { EstadoTurno } from "./domain/estadoTurno";
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

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.info("Conexión a la base de datos establecida correctamente.");

        let cambioEstadoTurno1 = new CambioEstadoTurno(1, new Date(), "RESERVADO", 1, paciente1, "ALTA");
        let cambioEstadoTurno2 = new CambioEstadoTurno(2, new Date(), "CANCELADO", 2, paciente2, "No puedo al final");
        cambioEstadoTurnoRepository.create(cambioEstadoTurno1);
        cambioEstadoTurnoRepository.create(cambioEstadoTurno2);

        let coberturaServicio1 = new CoberturaServicio(1, especialidad1, 80);
        let coberturaServicio2 = new CoberturaServicio(2, practica1, 50);

        let obraSocial1 = new ObraSocial(1, "OSDE", [plan2]);
        let obraSocial2 = new ObraSocial(2, "IPS", [plan1, plan2]);

        let plan1 = new Plan(1, "Plan 100", [coberturaServicio1, coberturaServicio2]);
        let plan2 = new Plan(2, "Plan 200", [coberturaServicio2]);

        let usuario1 = new Usuario(1, "Pepe", "holaquetal");
        let usuario2 = new Usuario(2, "Pablo", "todoBien");

        let sede1  = new Sede(1, "Sede 1", "Villa Urquiza");
        let sede2 = new Sede(2, "Sede 2", "Caballito");

        let practica1 = new Practica(1, "1234","Operación", 60, 0);

        let especialidad1 = new Especialidad(1, "odontologia", 60, 0);

        let paciente1 = new Paciente(1, usuario1, "Juan", "Pérez", "12345678", "1990-01-01", obraSocial1, plan1, "M");
        let paciente2 = new Paciente(2, usuario2, "María", "Gómez", "87654321", "1985-05-15", obraSocial2, plan2, "F");

        let notificacion1 = new Notificacion(1,usuario1,usuario2, "Reservo turno","2027-04-19T20:00:00",null, true);
        let notificacion2 = new Notificacion(2,usuario2,usuario1, "Cancelo turno","2026-08-19T10:00:00",null, null);

        let disponibilidad1 = new DisponibilidadHoraria(1, 2, new Date(0, 0, 0, 8, 0), new Date(0, 0, 0, 12, 0));
        let disponibilidad2 = new DisponibilidadHoraria(2, 4, new Date(0, 0, 0, 14, 0), new Date(0, 0, 0, 18, 0));
        let disponibilidad3 = new DisponibilidadHoraria(3, 4, new Date(2026,6,8,9,0), new Date(2026,6,8,16,0));
        let disponibilidad4 = new DisponibilidadHoraria(4, 5, new Date(2026,6,9,9,0), new Date(2026,6,9,16,0));

        let medico1 = new Medico(1, "Pepe", 456, "Juan", "Pérez", [especialidad1], [practica1], [sede1],  [disponibilidad1]);
        let medico2 = new Medico(2, "Maria", 123, "Maria", "Gómez", [especialidad1], [practica1], [sede2],  [disponibilidad1]);
        let medico3 = new Medico(3, "Sofia", 789, "Sofia", "Baudo", [especialidad1], [practica1], [sede1],  [disponibilidad1, disponibilidad3, disponibilidad4]);

        let turno1 = new Turno(1, medico1, "2026-04-19T20:00:00", null, paciente1, practica1,sede1, EstadoTurno.DISPONIBLE, [new CambioEstadoTurno(Date.now(), EstadoTurno.DISPONIBLE, 2, null, "CREACION")], null);
        let turno2 = new Turno(2, medico3, "2027-03-10T15:30:00", null , null, practica1,sede2, EstadoTurno.RESERVADO, [new CambioEstadoTurno(Date.now(), EstadoTurno.RESERVADO, 2, null, "ALTA")], null);


    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}