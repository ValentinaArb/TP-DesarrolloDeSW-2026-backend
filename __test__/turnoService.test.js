import { jest } from '@jest/globals';
import { TurnoService } from '../server/service/turnoService.js';

describe('TurnoService', () => {
  test('debería lanzar error al dar de baja un turno con menos de una hora de anticipación', () => {
    const service = new TurnoService();

    const usuarioMock = { id: 1, nombre: 'Olaf' };
    const turnoMock = {
      id: 10,
      fechaHora: Date.now() + 30 * 60 * 1000, // 30 minutos desde ahora
    };

    service.usuarioRepository = {
      findById: jest.fn().mockReturnValue(usuarioMock),
    };

    service.turnoRepository = {
      findById: jest.fn().mockReturnValue(turnoMock),
      updateTurno: jest.fn(),
    };

    expect(() => {
      service.darDeBaja(10, 1, 'Cancelación de prueba');
    }).toThrow('Whoops! Los turnos se deben cancelar con al menos una hora de antelación.');
  });
});