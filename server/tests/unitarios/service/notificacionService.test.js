import { describe, expect, test, beforeEach, jest } from "@jest/globals"
import { NotificacionService } from "../../../services/notificacionService.js";
import { NotFoundError } from "../../../errors/AppError.js";

describe("notificacionService", () => {
    let notificacionService;
    let mockNotificacionRepository;

    beforeEach(() => {
        mockNotificacionRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            delete: jest.fn()
        };

        notificacionService = new NotificacionService();
        notificacionService.notificacionRepository = mockNotificacionRepository;
    });

    describe("obtenerTodosFiltrados", () => {
        test("debe obtener solo las notificaciones del usuario especificado", async () => {
            const notificaciones = [
                { id: 1, destinatario: { id: 1, nombre: "Juan" }, mensaje: "Turno confirmado" },
                { id: 2, destinatario: { id: 2, nombre: "Carlos" }, mensaje: "Turno cancelado" },
                { id: 3, destinatario: { id: 1, nombre: "Juan" }, mensaje: "Recordatorio" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodosFiltrados(1);

            expect(resultado.length).toBe(2);
            expect(resultado.every(n => n.destinatario.id == 1)).toBe(true);
            expect(mockNotificacionRepository.findAll).toHaveBeenCalled();
        });

        test("debe retornar lista vacía si el usuario no tiene notificaciones", async () => {
            const notificaciones = [
                { id: 1, destinatario: { id: 2, nombre: "Carlos" }, mensaje: "Turno cancelado" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodosFiltrados(1);

            expect(resultado.length).toBe(0);
            expect(Array.isArray(resultado)).toBe(true);
        });

        test("debe retornar lista vacía si no hay notificaciones en el sistema", async () => {
            mockNotificacionRepository.findAll.mockResolvedValue([]);

            const resultado = await notificacionService.obtenerTodosFiltrados(1);

            expect(resultado.length).toBe(0);
        });

        test("debe manejar IDs numéricos y strings de forma equivalente", async () => {
            const notificaciones = [
                { id: 1, destinatario: { id: "1", nombre: "Juan" }, mensaje: "Turno confirmado" },
                { id: 2, destinatario: { id: 2, nombre: "Carlos" }, mensaje: "Turno cancelado" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodosFiltrados("1");

            expect(resultado.length).toBe(1);
            expect(resultado[0].destinatario.id).toBe("1");
        });

        test("debe retornar todas las notificaciones del usuario si tiene múltiples", async () => {
            const notificaciones = [
                { id: 1, destinatario: { id: 1 }, mensaje: "Notificación 1" },
                { id: 2, destinatario: { id: 1 }, mensaje: "Notificación 2" },
                { id: 3, destinatario: { id: 1 }, mensaje: "Notificación 3" },
                { id: 4, destinatario: { id: 2 }, mensaje: "Notificación 4" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodosFiltrados(1);

            expect(resultado.length).toBe(3);
            expect(resultado.map(n => n.id)).toEqual([1, 2, 3]);
        });
    });

    describe("obtenerTodos", () => {
        test("debe obtener todas las notificaciones del sistema", async () => {
            const notificaciones = [
                { id: 1, destinatario: { id: 1 }, mensaje: "Turno confirmado" },
                { id: 2, destinatario: { id: 2 }, mensaje: "Turno cancelado" },
                { id: 3, destinatario: { id: 3 }, mensaje: "Recordatorio" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodos();

            expect(resultado.length).toBe(3);
            expect(resultado).toEqual(notificaciones);
            expect(mockNotificacionRepository.findAll).toHaveBeenCalled();
        });

        test("debe retornar lista vacía si no hay notificaciones", async () => {
            mockNotificacionRepository.findAll.mockResolvedValue([]);

            const resultado = await notificacionService.obtenerTodos();

            expect(resultado.length).toBe(0);
            expect(Array.isArray(resultado)).toBe(true);
        });

        test("debe retornar notificaciones con diferentes estados", async () => {
            const notificaciones = [
                { id: 1, leida: true, mensaje: "Notificación leída" },
                { id: 2, leida: false, mensaje: "Notificación no leída" },
                { id: 3, leida: true, mensaje: "Otra notificación leída" }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodos();

            expect(resultado.length).toBe(3);
            expect(resultado.filter(n => n.leida).length).toBe(2);
            expect(resultado.filter(n => !n.leida).length).toBe(1);
        });

        test("debe retornar notificaciones preservando toda su estructura", async () => {
            const notificaciones = [
                {
                    id: 1,
                    destinatario: { id: 1, nombre: "Juan" },
                    asunto: "Confirmación",
                    mensaje: "Tu turno ha sido confirmado",
                    leida: false,
                    fechaCreacion: new Date(),
                    tipo: "CONFIRMACION"
                }
            ];
            mockNotificacionRepository.findAll.mockResolvedValue(notificaciones);

            const resultado = await notificacionService.obtenerTodos();

            expect(resultado[0]).toHaveProperty("id");
            expect(resultado[0]).toHaveProperty("destinatario");
            expect(resultado[0]).toHaveProperty("asunto");
            expect(resultado[0]).toHaveProperty("mensaje");
            expect(resultado[0]).toHaveProperty("leida");
            expect(resultado[0]).toHaveProperty("fechaCreacion");
            expect(resultado[0]).toHaveProperty("tipo");
        });
    });

    describe("marcarComoLeida", () => {
        test("debe marcar una notificación como leída", async () => {
            const notificacion = {
                id: 1,
                leida: false,
                mensaje: "Test",
                marcarComoLeida: jest.fn()
            };
            mockNotificacionRepository.findById.mockResolvedValue(notificacion);
            mockNotificacionRepository.update.mockResolvedValue(notificacion);

            await notificacionService.marcarComoLeida(1);

            expect(notificacion.marcarComoLeida).toHaveBeenCalled();
            expect(mockNotificacionRepository.update).toHaveBeenCalledWith(notificacion, 1);
        });

        test("debe lanzar NotFoundError si la notificación no existe", async () => {
            mockNotificacionRepository.findById.mockResolvedValue(null);

            await expect(notificacionService.marcarComoLeida(999)).rejects.toThrow(NotFoundError);
        });

        test("debe lanzar NotFoundError con mensaje descriptivo", async () => {
            mockNotificacionRepository.findById.mockResolvedValue(null);

            await expect(notificacionService.marcarComoLeida(999))
                .rejects
                .toThrow("No se encontró la notificación con ID: 999");
        });

        test("debe actualizar la notificación en el repositorio después de marcar como leída", async () => {
            const notificacion = {
                id: 5,
                leida: false,
                mensaje: "Turno reprogramado",
                marcarComoLeida: jest.fn()
            };
            mockNotificacionRepository.findById.mockResolvedValue(notificacion);
            mockNotificacionRepository.update.mockResolvedValue(notificacion);

            await notificacionService.marcarComoLeida(5);

            expect(mockNotificacionRepository.findById).toHaveBeenCalledWith(5);
            expect(notificacion.marcarComoLeida).toHaveBeenCalled();
            expect(mockNotificacionRepository.update).toHaveBeenCalledWith(notificacion, 5);
        });

        test("debe manejar errores al actualizar la notificación", async () => {
            const notificacion = {
                id: 1,
                leida: false,
                marcarComoLeida: jest.fn()
            };
            mockNotificacionRepository.findById.mockResolvedValue(notificacion);
            mockNotificacionRepository.update.mockRejectedValue(new Error("Error en la base de datos"));

            await expect(notificacionService.marcarComoLeida(1)).rejects.toThrow();
        });

        test("debe permitir marcar múltiples notificaciones como leídas", async () => {
            const notificacion1 = {
                id: 1,
                leida: false,
                marcarComoLeida: jest.fn()
            };
            const notificacion2 = {
                id: 2,
                leida: false,
                marcarComoLeida: jest.fn()
            };

            mockNotificacionRepository.findById
                .mockResolvedValueOnce(notificacion1)
                .mockResolvedValueOnce(notificacion2);
            mockNotificacionRepository.update
                .mockResolvedValueOnce(notificacion1)
                .mockResolvedValueOnce(notificacion2);

            await notificacionService.marcarComoLeida(1);
            await notificacionService.marcarComoLeida(2);

            expect(notificacion1.marcarComoLeida).toHaveBeenCalled();
            expect(notificacion2.marcarComoLeida).toHaveBeenCalled();
            expect(mockNotificacionRepository.update).toHaveBeenCalledTimes(2);
        });

        test("debe verificar que el método marcarComoLeida sea invocado del objeto notificación", async () => {
            const notificacion = {
                id: 1,
                leida: false,
                marcarComoLeida: jest.fn()
            };
            mockNotificacionRepository.findById.mockResolvedValue(notificacion);
            mockNotificacionRepository.update.mockResolvedValue(notificacion);

            await notificacionService.marcarComoLeida(1);

            expect(notificacion.marcarComoLeida).toHaveBeenCalledWith();
        });
    });
});