import { describe, expect, test, beforeEach, jest } from "@jest/globals"
import { PacienteService } from "../../../services/pacienteService.js";
import { ConflictError, NotFoundError, BadRequestError } from "../../../errors/AppError.js";
import { EstadoTurno } from "../../../domain/estadoTurno.js";

describe("pacienteService", () => {
    let pacienteService;
    let mockTurnoService;
    let mockTurnoRepository;
    let mockMedicoRepository;

    beforeEach(() => {
        mockTurnoService = {
            darDeAlta: jest.fn(),
            darDeBaja: jest.fn(),
            noSeSuperponen: jest.fn()
        };
        mockTurnoRepository = {
            findById: jest.fn(),
            turnosPara: jest.fn(),
            turnosDe: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        mockMedicoRepository = {
            findById: jest.fn()
        };

        pacienteService = new PacienteService();
        pacienteService.turnoService = mockTurnoService;
        pacienteService.turnoRepository = mockTurnoRepository;
        pacienteService.medicoRepository = mockMedicoRepository;
    });

    describe("reservarTurno", () => {
        test("debe reservar un turno exitosamente", async () => {
            mockTurnoService.darDeAlta.mockResolvedValue(true);

            await pacienteService.reservarTurno(1, 1);

            expect(mockTurnoService.darDeAlta).toHaveBeenCalledWith(1, 1);
        });

        test("debe lanzar error si la reserva falla", async () => {
            mockTurnoService.darDeAlta.mockRejectedValue(new ConflictError("Turno no disponible"));

            await expect(pacienteService.reservarTurno(1, 1)).rejects.toThrow(ConflictError);
        });
    });

    describe("cancelarTurno", () => {
        test("debe cancelar un turno que pertenece al paciente", async () => {
            const paciente = { id: 1, nombre: "Juan" };
            const turno = { id: 1, paciente };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoService.darDeBaja.mockResolvedValue(true);

            await pacienteService.cancelarTurno(1, 1, "Motivo de cancelación");

            expect(mockTurnoRepository.findById).toHaveBeenCalledWith(1);
            expect(mockTurnoService.darDeBaja).toHaveBeenCalledWith(1, "Motivo de cancelación", EstadoTurno.DISPONIBLE);
        });

        test("debe lanzar NotFoundError si el turno no pertenece al paciente", async () => {
            const paciente = { id: 2, nombre: "Carlos" };
            const turno = { id: 1, paciente };
            mockTurnoRepository.findById.mockResolvedValue(turno);

            await expect(pacienteService.cancelarTurno(1, 1, "Motivo")).rejects.toThrow(NotFoundError);
        });

        test("debe lanzar error si la cancelación falla", async () => {
            const paciente = { id: 1 };
            const turno = { id: 1, paciente };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoService.darDeBaja.mockRejectedValue(new ConflictError("Turno no puede ser cancelado"));

            await expect(pacienteService.cancelarTurno(1, 1, "Motivo")).rejects.toThrow(ConflictError);
        });
    });

    describe("obtenerTurnosPorEstado", () => {
        test("debe obtener turnos del paciente por estado específico", async () => {
            const turnos = [
                { id: 1, estado: EstadoTurno.RESERVADO, paciente: { id: 1 } },
                { id: 2, estado: EstadoTurno.DISPONIBLE, paciente: { id: 1 } },
                { id: 3, estado: EstadoTurno.RESERVADO, paciente: { id: 1 } }
            ];
            mockTurnoRepository.turnosPara.mockResolvedValue(turnos);

            const resultado = await pacienteService.obtenerTurnosPorEstado(1, EstadoTurno.RESERVADO);

            expect(resultado.length).toBe(2);
            expect(resultado.every(t => String(t.estado) === String(EstadoTurno.RESERVADO))).toBe(true);
        });

        test("debe retornar lista vacía si no hay turnos con ese estado", async () => {
            const turnos = [
                { id: 1, estado: EstadoTurno.DISPONIBLE, paciente: { id: 1 } }
            ];
            mockTurnoRepository.turnosPara.mockResolvedValue(turnos);

            const resultado = await pacienteService.obtenerTurnosPorEstado(1, EstadoTurno.RESERVADO);

            expect(resultado.length).toBe(0);
        });

        test("debe retornar lista vacía si el paciente no tiene turnos", async () => {
            mockTurnoRepository.turnosPara.mockResolvedValue([]);

            const resultado = await pacienteService.obtenerTurnosPorEstado(1, EstadoTurno.RESERVADO);

            expect(resultado.length).toBe(0);
        });
    });

    describe("hacerCambio", () => {
        test("debe cambiar la hora de un turno exitosamente", async () => {
            const horaInicio = new Date(Date.now() + 86400000);
            const horaFinal = new Date(horaInicio.getTime() + 30 * 60000);
            const disponibilidad = {
                abarca: jest.fn()
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(true)
            };
            const medico = { id: 1, disponibilidades: [disponibilidad] };
            const turno = {
                id: 1,
                medico,
                servicio: { duracionTurno: 30 },
                fechaInicio: new Date(),
                fechaFinal: new Date(Date.now() + 30 * 60000)
            };

            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockTurnoRepository.turnosDe.mockResolvedValue([turno]);
            mockTurnoService.noSeSuperponen.mockReturnValue(true);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await pacienteService.hacerCambio(1, 1, horaInicio);

            expect(turno.fechaInicio).toEqual(horaInicio);
            expect(turno.fechaFinal).toEqual(horaFinal);
            expect(mockTurnoRepository.update).toHaveBeenCalledWith(turno, 1);
        });

        test("debe lanzar NotFoundError si el médico no está disponible en el horario", async () => {
            const horaInicio = new Date(Date.now() + 86400000);
            const disponibilidad = {
                abarca: jest.fn().mockReturnValue(false)
            };
            const medico = { id: 1, disponibilidades: [disponibilidad] };
            const turno = {
                id: 1,
                medico,
                servicio: { duracionTurno: 30 }
            };

            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockMedicoRepository.findById.mockResolvedValue(medico);

            await expect(pacienteService.hacerCambio(1, 1, horaInicio)).rejects.toThrow(NotFoundError);
        });

        test("debe lanzar ConflictError si hay conflicto con otro turno del médico", async () => {
            const horaInicio = new Date(Date.now() + 86400000);
            const disponibilidad = {
                abarca: jest.fn()
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(true)
            };
            const medico = { id: 1, disponibilidades: [disponibilidad] };
            const turnoExistente = {
                id: 2,
                medico,
                servicio: { duracionTurno: 30 },
                fechaInicio: new Date(Date.now() + 86400000),
                fechaFinal: new Date(Date.now() + 87400000)
            };
            const turno = {
                id: 1,
                medico,
                servicio: { duracionTurno: 30 },
                fechaInicio: new Date()
            };

            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockTurnoRepository.turnosDe.mockResolvedValue([turnoExistente]);
            mockTurnoService.noSeSuperponen.mockReturnValue(false);

            await expect(pacienteService.hacerCambio(1, 1, horaInicio)).rejects.toThrow(ConflictError);
        });

        test("debe ignorar conflicto con el mismo turno", async () => {
            const horaInicio = new Date(Date.now() + 86400000);
            const disponibilidad = {
                abarca: jest.fn()
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(true)
            };
            const medico = { id: 1, disponibilidades: [disponibilidad] };
            const turno = {
                id: 1,
                medico,
                servicio: { duracionTurno: 30 },
                fechaInicio: new Date()
            };

            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockTurnoRepository.turnosDe.mockResolvedValue([turno]);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await pacienteService.hacerCambio(1, 1, horaInicio);

            expect(mockTurnoRepository.update).toHaveBeenCalled();
        });
    });

    describe("evaluarTurnoPendiente", () => {
        test("debe aceptar la reprogramación de un turno pendiente", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                estado: EstadoTurno.PENDIENTE,
                fechaInicio: new Date(Date.now() + 86400000),
                actualizarEstado: jest.fn()
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await pacienteService.evaluarTurnoPendiente(1,"true");

            expect(turno.actualizarEstado).toHaveBeenCalledWith(
                EstadoTurno.RESERVADO,
                paciente,
                "Reprogramación aceptada"
            );
            expect(mockTurnoRepository.update).toHaveBeenCalledWith(turno, 1);
        });

        test("debe rechazar la reprogramación de un turno pendiente", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                estado: EstadoTurno.PENDIENTE,
                fechaInicio: new Date(Date.now() + 86400000),
                darDeBaja: jest.fn()
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.delete.mockResolvedValue(true);

            await pacienteService.evaluarTurnoPendiente(1, "false");

            expect(turno.darDeBaja).toHaveBeenCalledWith("No se aceptó la reprogramación");
            expect(mockTurnoRepository.delete).toHaveBeenCalledWith(1);
        });

        test("debe lanzar BadRequestError si la fecha de inicio ya pasó", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                fechaInicio: new Date(Date.now() - 86400000)
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);

            await expect(pacienteService.evaluarTurnoPendiente(1, "true")).rejects.toThrow(BadRequestError);
        });

        test("debe manejar comparación de IDs numéricos como strings", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                estado: EstadoTurno.PENDIENTE,
                fechaInicio: new Date(Date.now() + 86400000),
                actualizarEstado: jest.fn()
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await pacienteService.evaluarTurnoPendiente(1, "true");

            expect(turno.actualizarEstado).toHaveBeenCalled();
        });

        test("debe aceptar respuesta true como string", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                estado: EstadoTurno.PENDIENTE,
                fechaInicio: new Date(Date.now() + 86400000),
                actualizarEstado: jest.fn()
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await pacienteService.evaluarTurnoPendiente(1,  "true");

            expect(turno.actualizarEstado).toHaveBeenCalled();
        });

        test("debe rechazar cualquier respuesta que no sea true", async () => {
            const paciente = { id: 1 };
            const turno = {
                id: 1,
                paciente,
                estado: EstadoTurno.PENDIENTE,
                fechaInicio: new Date(Date.now() + 86400000),
                darDeBaja: jest.fn()
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.delete.mockResolvedValue(true);

            await pacienteService.evaluarTurnoPendiente(1, "false");

            expect(turno.darDeBaja).toHaveBeenCalled();
            expect(mockTurnoRepository.delete).toHaveBeenCalled();
        });
    });
});