import { describe, expect, test, beforeEach, jest } from "@jest/globals";
import pacienteController from "../../../controllers/pacienteController.js";
import { ConflictError } from "../../../errors/AppError.js";

describe("pacienteController", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: { pacienteId: "1", turnoId: "1" },
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe("reservarTurno", () => {
        test("debe reservar un turno exitosamente", async () => {
            pacienteController.turnoService.darDeAlta = jest.fn().mockResolvedValue(true);

            await pacienteController.reservarTurno(req, res, next);

            expect(pacienteController.turnoService.darDeAlta).toHaveBeenCalledWith("1", "1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ mensaje: "Turno reservado exitosamente" });
        });

        test("debe llamar a next con el error si la reserva falla", async () => {
            const error = new ConflictError("Turno no disponible");
            pacienteController.turnoService.darDeAlta = jest.fn().mockRejectedValue(error);

            await pacienteController.reservarTurno(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});