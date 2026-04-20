import { describe, test, expect, jest } from '@jest/globals';
import { TurnoService } from '../server/service/turnoService.js';

describe('TurnoService', () => {
  test('debería lanzar error al dar de baja un turno con menos de una hora de anticipación', async () => {
    const service = new TurnoService();

    const pacienteMock = { id: 1, nombre: 'Nicolas' };
    const turnoMock = {
      id: 10,
      fechaHora: new Date(Date.now() + 30 * 60 * 1000).toISOString()
    };

    service.pacienteRepository = {
      findById: jest.fn().mockResolvedValue(pacienteMock),
    };

    service.turnoRepository = {
      findById: jest.fn().mockResolvedValue(turnoMock),
      updateTurno: jest.fn(),
    };

    await expect(
      service.darDeBaja(10, 1, 'Cancelación de prueba')
    ).rejects.toThrow(
      'Whoops! Los turnos se deben cancelar con al menos una hora de antelación.'
    );

    expect(service.turnoRepository.updateTurno).not.toHaveBeenCalled();
  });
});