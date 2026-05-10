import { describe, test, expect } from '@jest/globals';
import { Turno } from '../server/domain/turno.js';
import { EstadoTurno } from '../server/domain/estadoTurno.js';

const unaHora = 60 * 60 * 1000;

describe('Turno', () => {
  test('darDeAlta debería poder reservar el turno si está disponible', () => {
    const paciente = { id: 1, nombre: 'Walter' };

    const turno = new Turno(
      1,
      { id: 100, nombre: 'Jaime' },
      new Date(Date.now() + 2 * unaHora).toISOString(),
      null,
      'Cardiología',
      'Sede Central',
      EstadoTurno.DISPONIBLE,
      []
    );

    turno.darDeAlta(paciente);

    expect(turno.estado).toBe(EstadoTurno.RESERVADO);
    expect(turno.paciente).toEqual(paciente);
    expect(turno.historialDeEstados.length).toBe(1);
    expect(turno.historialDeEstados[0].estado).toBe(EstadoTurno.RESERVADO);
    expect(turno.historialDeEstados[0].motivo).toBe('ALTA');
  });
});

test('darDeAlta debería poder fallar si el turno no está disponiblr', () => {
  const paciente = { id: 1, nombre: 'Walter' };

  const turno = new Turno(
    2,
    { id: 100, nombre: 'Jaime' },
    new Date(Date.now() + 2 * unaHora).toISOString(),
    null,
    'Cardiología',
    'Sede Central',
    EstadoTurno.RESERVADO,
    []
  );

  expect(() => turno.darDeAlta(paciente)).toThrow(
    'Whoops! El turno no está disponible.'
  );

  expect(turno.estado).toBe(EstadoTurno.RESERVADO);
  expect(turno.paciente).toBeNull();
});

test('darDeBaja debería dejar el turno disponible si faltan más de 60 minutos', () => {
  const paciente = { id: 1, nombre: 'Walter' };

  const turno = new Turno(
    3,
    { id: 100, nombre: 'Jaime' },
    new Date(Date.now() + 2 * unaHora).toISOString(),
    paciente,
    'Cardiología',
    'Sede Central',
    EstadoTurno.RESERVADO,
    []
  );

  turno.darDeBaja('Cancelación de prueba');

  expect(turno.estado).toBe(EstadoTurno.DISPONIBLE);
  expect(turno.paciente).toBeNull();
  expect(turno.historialDeEstados.length).toBe(1);
  expect(turno.historialDeEstados[0].estado).toBe(EstadoTurno.DISPONIBLE);
  expect(turno.historialDeEstados[0].motivo).toBe('Cancelación de prueba');
});


test('darDeBaja debería fallar si faltan menos de 60 minutos', () => {
  const paciente = { id: 1, nombre: 'Walter' };

  const turno = new Turno(
    4,
    { id: 100, nombre: 'Jaime' },
    new Date(Date.now() + unaHora/2).toISOString(),
    paciente,
    'Cardiología',
    'Sede Central',
    EstadoTurno.RESERVADO,
    []
  );

  expect(() => turno.darDeBaja('Cancelación fuera de tiempo')).toThrow();

  expect(turno.estado).toBe(EstadoTurno.RESERVADO);
  expect(turno.paciente).toEqual(paciente);
  expect(turno.historialDeEstados.length).toBe(0);
});