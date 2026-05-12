import {describe, expect, test, beforeEach} from "@jest/globals"
import {TurnoService} from "../../services/turnoService"
import { Turno } from "../../domain/turno"
import { Sede } from "../../domain/sede";
import { MedicoService } from "../../services/medicoService";
import { MedicoRepository } from "../../repositories/medicoRepository";
import { ConflictError, UnprocessableEntityError } from "../../errors/AppError";
import {Servicio} from "../../domain/servicio.js";

const servicio = new Servicio(1, 'ServicioLoco', 60, 100);
const sede = new Sede(1, 'Puente Saavedra', 'Abajo del puente');
const turnoPrueba = {
    medicoId: 1,
    fechaInicio: "2026-05-05T10:10:10",
    servicio: servicio,
    sede: sede
};

const medicoRepository = new MedicoRepository();
const medicoService = new MedicoService(medicoRepository);
const turnoService = new TurnoService();

describe("turnoService", () => {
    describe("crearTurno", () => {
        test("no debe permitir crear un turno repetido", async () => {
            await turnoService.crearTurno(turnoPrueba, medicoService);

            await expect(turnoService.crearTurno(turnoPrueba, medicoService)).rejects.toThrow(ConflictError);
        })
        test("no puedo dar de baja un turno que no esta reservado", async () => {
            const turno = new Turno(1, new Date("2026-05-05T10:10:10"), null, null, null);
            await turnoRepository.create(turno);
            await expect(turnoService.darDeBaja(turno.id)).rejects.toThrow(Error);
        })
        test("No puedo crear un turno con fecha pasada", async () => {
            const turnoPasado = {
                medicoId: 1,
                fechaInicio: "2020-05-05T10:10:10",
                servicio: servicio,
                sede: sede
            };
            await expect(turnoService.crearTurno(turnoPasado, medicoService)).rejects.toThrow(UnprocessableEntityError);
        })
    })
})

