import { describe, expect, test, beforeEach, jest } from "@jest/globals"
import { TurnoService } from "../../../services/turnoService.js";
import { ConflictError, UnprocessableEntityError, BadRequestError } from "../../../errors/AppError.js";
import { EstadoTurno } from "../../../domain/estadoTurno.js";

describe("turnoService", () => {
    let turnoService;
    let mockTurnoRepository;
    let mockPacienteRepository;
    let mockMedicoRepository;
    let mockMedicoService;
    let mockPlanRepository;

    beforeEach(() => {
        mockTurnoRepository = {
            findById: jest.fn(),
            update: jest.fn(),
            turnosPara: jest.fn(),
            create: jest.fn(),
            delete: jest.fn(),
            turnosDe: jest.fn(),
            findPaginated: jest.fn(),
            findDisponiblesByFilters: jest.fn()
        };
        mockPacienteRepository = {
            findById: jest.fn()
        };
        mockMedicoRepository = {
            findById: jest.fn()
        };
        mockMedicoService = {
            estaDisponible: jest.fn(),
            perteneceASede: jest.fn(),
            yaTieneTurno: jest.fn()
        };
        mockPlanRepository = {
            findByNombre: jest.fn()
        };

        turnoService = new TurnoService();
        turnoService.turnoRepository = mockTurnoRepository;
        turnoService.pacienteRepository = mockPacienteRepository;
        turnoService.medicoRepository = mockMedicoRepository;
        turnoService.medicoService = mockMedicoService;
        turnoService.planRepository = mockPlanRepository;
    });

    describe("darDeBaja", () => {
        test("debe dar de baja un turno reservado", async () => {
            const turno = { 
                id: 1, 
                estado: EstadoTurno.RESERVADO, 
                darDeBaja: jest.fn(),
                estaReservado: jest.fn().mockReturnValue(true)
            };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await turnoService.darDeBaja(1, "Motivo de cancelación");

            expect(turno.darDeBaja).toHaveBeenCalledWith("Motivo de cancelación");
            expect(mockTurnoRepository.update).toHaveBeenCalled();
        });

        test("debe lanzar ConflictError si el turno no está reservado", async () => {
            const turno = { id: 1, estado: EstadoTurno.DISPONIBLE, estaReservado: jest.fn().mockReturnValue(false)  };
            mockTurnoRepository.findById.mockResolvedValue(turno);

            await expect(turnoService.darDeBaja(1, "Motivo")).rejects.toThrow(ConflictError);
        });
    });

    describe("darDeAlta", () => {
        test("debe dar de alta un turno sin superposición", async () => {
            const paciente = { id: 1, nombre: "Juan" };
            const turno = { 
                id: 1, 
                darDeAlta: jest.fn(),
                fechaInicio: new Date(Date.now() + 86400000),
                fechaFinal: new Date(Date.now() + 87400000)
            };
            mockPacienteRepository.findById.mockResolvedValue(paciente);
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.turnosPara.mockResolvedValue([]);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await turnoService.darDeAlta(1, 1);

            expect(turno.darDeAlta).toHaveBeenCalledWith(paciente);
            expect(mockTurnoRepository.update).toHaveBeenCalled();
        });

        test("debe lanzar ConflictError si hay superposición", async () => {
            const paciente = { id: 1 };
            const turno = { 
                _id: 1,
                fechaInicio: new Date(Date.now() + 86400000),
                fechaFinal: new Date(Date.now() + 87400000)
            };
            const turnoExistente = { 
                _id: 2,
                fechaInicio: new Date(Date.now() + 86400000),
                fechaFinal: new Date(Date.now() + 87400000)
            };
            mockPacienteRepository.findById.mockResolvedValue(paciente);
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.turnosPara.mockResolvedValue([turnoExistente]);

            await expect(turnoService.darDeAlta(1, 1)).rejects.toThrow(ConflictError);
        });
    });

    describe("crearTurno", () => {
        test("debe crear un turno exitosamente", async () => {
            const medico = { _id: "1", servicios: [{ _id: "1" }] }; 
            const servicio = { _id: "1", duracionTurno: 30, costo: 100, nombre: "Consulta" };
            const sede = { _id: 1 };
            const fechaInicio = new Date(Date.now() + 86400000);
            
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoService.estaDisponible.mockResolvedValue(true);
            mockMedicoService.yaTieneTurno.mockResolvedValue(false);
            mockMedicoService.perteneceASede.mockResolvedValue(true);
            mockTurnoRepository.create.mockResolvedValue({ _id: "1", estado: EstadoTurno.DISPONIBLE });

            const resultado = await turnoService.crearTurno(
                { medicoId: "1", fechaInicio, servicio, sede },
                mockMedicoService
            );

            expect(resultado).toBeDefined();
            expect(mockTurnoRepository.create).toHaveBeenCalled();
        });

        test("debe lanzar error si la fecha es inválida", async () => {
            const medico = { id: 1 };
            mockMedicoRepository.findById.mockResolvedValue(medico);

            await expect(turnoService.crearTurno(
                { medicoId: 1, fechaInicio: "fecha-invalida", servicio: {}, sede: {} }
            )).rejects.toThrow(BadRequestError);
        });

        test("debe lanzar error si la fecha es en el pasado", async () => {
            const medico = { id: 1 };
            const fechaPasada = new Date(Date.now() - 86400000);
            mockMedicoRepository.findById.mockResolvedValue(medico);

            await expect(turnoService.crearTurno(
                { medicoId: 1, fechaInicio: fechaPasada, servicio: {}, sede: {} }
            )).rejects.toThrow(UnprocessableEntityError);
        });

        test("debe lanzar error si el médico no está disponible", async () => {
            const medico = { id: 1, servicios: [{ id: 1 }] };
            const servicio = { id: 1, duracionTurno: 30, costo: 100 };
            const sede = { id: 1 };
            const fechaInicio = new Date(Date.now() + 86400000);

            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoService.estaDisponible.mockResolvedValue(false);

            await expect(turnoService.crearTurno(
                { medicoId: 1, fechaInicio, servicio, sede },
                mockMedicoService
            )).rejects.toThrow(UnprocessableEntityError);
        });

        test("debe lanzar error si el médico no realiza ese servicio", async () => {
            const medico = { id: 1, servicios: [] };
            const servicio = { id: 999, duracionTurno: 30, costo: 100 };
            const sede = { id: 1 };
            const fechaInicio = new Date(Date.now() + 86400000);

            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoService.estaDisponible.mockResolvedValue(true);

            await expect(turnoService.crearTurno(
                { medicoId: 1, fechaInicio, servicio, sede },
                mockMedicoService
            )).rejects.toThrow(UnprocessableEntityError);
        });

        test("debe lanzar error si el médico no pertenece a la sede", async () => {
            const medico = { _id: "1", servicios: [{ _id: "1" }] };
            const servicio = { _id: "1", duracionTurno: 30, costo: 100 };
            const sede = { _id: "1" };
            const fechaInicio = new Date(Date.now() + 86400000);

            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoService.estaDisponible.mockResolvedValue(true);
            mockMedicoService.perteneceASede.mockResolvedValue(false);

            await expect(turnoService.crearTurno(
                { medicoId: "1", fechaInicio, servicio, sede },
                mockMedicoService
            )).rejects.toThrow(UnprocessableEntityError);
        });
    });

    describe("eliminarTurno", () => {
        test("debe eliminar un turno", async () => {
            mockTurnoRepository.delete.mockResolvedValue(true);

            await turnoService.eliminarTurno(1);

            expect(mockTurnoRepository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe("obtenerTurno", () => {
        test("debe obtener un turno por id", async () => {
            const turno = { id: 1, estado: EstadoTurno.DISPONIBLE };
            mockTurnoRepository.findById.mockResolvedValue(turno);

            const resultado = await turnoService.obtenerTurno(1);

            expect(resultado).toEqual(turno);
            expect(mockTurnoRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    describe("obtenerTodos", () => {
        test("debe obtener todos los turnos con paginación", async () => {
            const turnos = [{ id: 1 }, { id: 2 }];
            mockTurnoRepository.findPaginated.mockResolvedValue({
                objetos: turnos,
                totalObjetos: 2
            });

            const resultado = await turnoService.obtenerTodos({ pagina: 1, limitePorPagina: 10 });

            expect(resultado.turno).toEqual(turnos);
            expect(resultado.pagina).toBe(1);
            expect(resultado.totalPaginas).toBe(1);
            expect(resultado.totalTurno).toBe(2);
        });

        test("debe lanzar error si la paginación es inválida", async () => {
            await expect(turnoService.obtenerTodos({ pagina: -1, limitePorPagina: 10 }))
                .rejects.toThrow(BadRequestError);
        });

        test("debe retornar 0 páginas si no hay turnos", async () => {
            mockTurnoRepository.findPaginated.mockResolvedValue({
                objetos: [],
                totalObjetos: 0
            });

            const resultado = await turnoService.obtenerTodos({ pagina: 1, limitePorPagina: 10 });

            expect(resultado.totalPaginas).toBe(0);
        });
    });

    describe("filtrarPor", () => {
        test("debe obtener turnos de un médico específico", async () => {
            const turnos = [{ id: 1, medicoId: 1 }, { id: 2, medicoId: 1 }];
            mockTurnoRepository.turnosDe.mockResolvedValue(turnos);

            const resultado = await turnoService.filtrarPor(1);

            expect(resultado).toEqual(turnos);
            expect(mockTurnoRepository.turnosDe).toHaveBeenCalledWith(1);
        });
    });

    describe("noSeSuperponen", () => {
        test("debe retornar true si los turnos no se superponen", () => {
            const turno1 = {
                fechaInicio: new Date("2026-05-13T08:00:00"),
                fechaFinal: new Date("2026-05-13T09:00:00")
            };
            const turno2 = {
                fechaInicio: new Date("2026-05-13T10:00:00"),
                fechaFinal: new Date("2026-05-13T11:00:00")
            };

            const resultado = turnoService.noSeSuperponen(turno1, turno2);

            expect(resultado).toBe(true);
        });

        test("debe retornar false si los turnos se superponen", () => {
            const turno1 = {
                fechaInicio: new Date("2026-05-13T08:00:00"),
                fechaFinal: new Date("2026-05-13T09:00:00")
            };
            const turno2 = {
                fechaInicio: new Date("2026-05-13T08:30:00"),
                fechaFinal: new Date("2026-05-13T09:30:00")
            };

            const resultado = turnoService.noSeSuperponen(turno1, turno2);

            expect(resultado).toBe(false);
        });
    });

    describe("servicioPerteneceAMedico", () => {
        test("debe retornar true si el servicio pertenece al médico", async () => {
            const medico = { id: 1, servicios: [{ id: 1 }, { id: 2 }] };
            const turno = { 
                medico,
                servicioPerteneceAMedico: async function(servicioId) {
                    return this.medico.servicios.some(s => s.id === servicioId);
                }
            };

            const resultado = await turno.servicioPerteneceAMedico(1);

            expect(resultado).toBe(true);
        });

        test("debe retornar false si el servicio no pertenece al médico", async () => {
            const medico = { id: 1, servicios: [{ id: 1 }] };
            const turno = { 
                medico,
                servicioPerteneceAMedico: async function(servicioId) {
                    return this.medico.servicios.some(s => s.id === servicioId);
                }
            };

            const resultado = await turno.servicioPerteneceAMedico(999);

            expect(resultado).toBe(false);
        });
    });

    describe("buscarTurnosDisponibles", () => {
        test("debe buscar y cotizar turnos disponibles", async () => {
            const paciente = { _id: "1", plan: { nombre: "Plan A" } };
            const plan = {
                calcularCostoAbonar: jest.fn().mockReturnValue({
                    estadoPrestacion: "CUBIERTO",
                    monto: 50
                })
            };
            const turnos = [
                {
                    id: "1", 
                    _id: "1",
                    costo: 100,
                    fechaInicio: new Date(Date.now() + 86400000),
                    servicio: { id: "1", _id: "1", costo: 100, nombre: "Consulta" }, 
                    medico: { nombre: "Juan", apellido: "Pérez" },
                    sede: { nombre: "Sede 1" }
                }
            ];

            mockPacienteRepository.findById.mockResolvedValue(paciente);
            mockPlanRepository.findByNombre.mockResolvedValue(plan);
            mockTurnoRepository.findDisponiblesByFilters.mockResolvedValue(turnos);

            const resultado = await turnoService.buscarTurnosDisponibles("1", {}, { sortBy: "fecha", sortOrder: "asc" });
            expect(resultado.status).toBe("success");
            expect(resultado.data).toBeDefined(); 
            expect(resultado.data.length).toBe(1);
            expect(resultado.paginacion.numeroPagina).toBe(1);
            expect(resultado.paginacion.totalTurno).toBe(1);
        });

        test("debe lanzar error si la paginación es inválida", async () => {
            await expect(turnoService.buscarTurnosDisponibles(1, {}, {}, { pagina: 0, limitePorPagina: 10 }))
                .rejects.toThrow(BadRequestError);
        });
    });

    describe("validarPaginacion", () => {
        test("debe retornar true para paginación válida", () => {
            const resultado = turnoService.validarPaginacion(1, 10);
            expect(resultado).toBe(true);
        });

        test("debe retornar false si pagina no es entero", () => {
            const resultado = turnoService.validarPaginacion(1.5, 10);
            expect(resultado).toBe(false);
        });

        test("debe retornar false si pagina es menor o igual a 0", () => {
            const resultado = turnoService.validarPaginacion(0, 10);
            expect(resultado).toBe(false);
        });

        test("debe retornar false si limitePagina no es válido", () => {
            const resultado = turnoService.validarPaginacion(1, -5);
            expect(resultado).toBe(false);
        });
    });
});