import { describe, expect, test, beforeEach, jest } from "@jest/globals"
import { MedicoService } from "../../../services/medicoService.js";
import { ConflictError, NotFoundError } from "../../../errors/AppError.js";

describe("medicoService", () => {
    let medicoService;
    let mockMedicoRepository;
    let mockTurnoRepository;
    let mockServicioRepository;

    beforeEach(() => {
        mockMedicoRepository = {
            findAll: jest.fn(),
            findById: jest.fn(),
            findByMatricula: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        };
        mockTurnoRepository = {
            turnosDe: jest.fn(),
            findById: jest.fn(),
            update: jest.fn()
        };
        mockServicioRepository = {
            findById: jest.fn()
        };

        medicoService = new MedicoService(mockMedicoRepository);
        medicoService.turnoRepository = mockTurnoRepository;
        medicoService.servicioRepository = mockServicioRepository;
    });

    describe("crearMedico", () => {
        test("no debe permitir crear un medico repetido", async () => {
            mockMedicoRepository.findByMatricula.mockResolvedValue({ id: 1, matricula: "123" });
            
            await expect(medicoService.crearMedico({}, "123", "Juan", "Pérez", [], [], [])).rejects.toThrow(ConflictError);
        });

        test("debe crear un nuevo medico exitosamente", async () => {
            const nuevoMedico = { id: 2, matricula: "456", nombre: "Carlos", apellido: "García" };
            mockMedicoRepository.findByMatricula.mockResolvedValue(null);
            mockMedicoRepository.create.mockResolvedValue(nuevoMedico);

            const resultado = await medicoService.crearMedico({}, "456", "Carlos", "García", [], [], []);
            
            expect(resultado).toEqual(nuevoMedico);
            expect(mockMedicoRepository.create).toHaveBeenCalled();
        });
    });

    describe("obtenerMedico", () => {
        test("debe obtener un medico por id", async () => {
            const medico = { id: 1, nombre: "Juan" };
            mockMedicoRepository.findById.mockResolvedValue(medico);

            const resultado = await medicoService.obtenerMedico(1);
            
            expect(resultado).toEqual(medico);
            expect(mockMedicoRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    describe("obtenerTodos", () => {
        test("debe obtener todos los medicos", async () => {
            const medicos = [{ id: 1 }, { id: 2 }];
            mockMedicoRepository.findAll.mockResolvedValue(medicos);

            const resultado = await medicoService.obtenerTodos();
            
            expect(resultado).toEqual(medicos);
        });
    });

    describe("eliminarMedico", () => {
        test("debe eliminar un medico", async () => {
            mockMedicoRepository.delete.mockResolvedValue(true);

            const resultado = await medicoService.eliminarMedico(1);
            
            expect(resultado).toBe(true);
            expect(mockMedicoRepository.delete).toHaveBeenCalledWith(1);
        });
    });

    describe("agregarDisponibilidad", () => {
        test("debe agregar una disponibilidad a un medico", async () => {
            const medico = { id: 1, disponibilidades: [], agregarDisponibilidad: jest.fn() };
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoRepository.update.mockResolvedValue(medico);

            await medicoService.agregarDisponibilidad(1, "Lunes", "08:00", "12:00");
            
            expect(medico.agregarDisponibilidad).toHaveBeenCalled();
            expect(mockMedicoRepository.update).toHaveBeenCalled();
        });
    });

    describe("eliminarDisponibilidad", () => {
        test("debe eliminar una disponibilidad", async () => {
            const disponibilidad = { id: 1 };
            const medico = { 
                id: 1, 
                disponibilidades: [disponibilidad], 
                eliminarDisponibilidad: jest.fn() 
            };
            mockMedicoRepository.findById.mockResolvedValue(medico);
            mockMedicoRepository.update.mockResolvedValue(medico);

            await medicoService.eliminarDisponibilidad(1, 1);
            
            expect(medico.eliminarDisponibilidad).toHaveBeenCalledWith(disponibilidad);
        });

        test("debe lanzar NotFoundError si la disponibilidad no existe", async () => {
            const medico = { id: 1, disponibilidades: [] };
            mockMedicoRepository.findById.mockResolvedValue(medico);

            await expect(medicoService.eliminarDisponibilidad(1, 999)).rejects.toThrow(NotFoundError);
        });
    });

    describe("perteneceASede", () => {
        test("debe retornar true si el medico pertenece a la sede", async () => {
            const medico = { id: 1, sedes: [{ id: 10 }] };
            mockMedicoRepository.findById.mockResolvedValue(medico);

            const resultado = await medicoService.perteneceASede(1, 10);
            
            expect(resultado).toBe(true);
        });

        test("debe retornar false si el medico no pertenece a la sede", async () => {
            const medico = { id: 1, sedes: [{ id: 10 }] };
            mockMedicoRepository.findById.mockResolvedValue(medico);

            const resultado = await medicoService.perteneceASede(1, 20);
            
            expect(resultado).toBe(false);
        });
    });

    describe("marcarTurnoComo", () => {
        test("debe lanzar NotFoundError si el turno no pertenece al medico", async () => {
            mockTurnoRepository.turnosDe.mockResolvedValue([]);

            await expect(medicoService.marcarTurnoComo(1, "COMPLETADO")).rejects.toThrow(NotFoundError);
        });

        test("debe marcar un turno como cancelado", async () => {
            const turno = { id: 1, darDeBaja: jest.fn(), actualizarEstado: jest.fn() };
            mockTurnoRepository.findById.mockResolvedValue(turno);
            mockTurnoRepository.update.mockResolvedValue(turno);

            await medicoService.marcarTurnoComo(1,"CANCELADO");
            
            expect(turno.darDeBaja).toHaveBeenCalled();
            expect(mockTurnoRepository.update).toHaveBeenCalled();
        });
    });
});
