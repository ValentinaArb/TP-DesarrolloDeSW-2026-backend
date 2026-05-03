import {describe, expect, test, beforeEach} from "@jest/globals"
import {TurnoService} from "../../services/turnoService"
import { Turno } from "../../domain/turno"
import { Medico } from "../../domain/medico";
import { Practica } from "../../domain/practica";
import { Sede } from "../../domain/sede";
import { MedicoService } from "../../services/medicoService";
import { MedicoRepository } from "../../repositories/medicoRepository";
import { ConflictError } from "../../errors/AppError";

const practica = new Practica(1, '123', 'practicaloca', 60, 100);
const sede = new Sede(1, 'Puente Saavedra', 'Abajo del puente');
const turnoPrueba = {
    medicoId: 1,
    fechaInicio: "2026-05-05T10:10:10",
    practica: practica,
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
    })
})