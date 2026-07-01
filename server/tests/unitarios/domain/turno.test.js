import { Turno } from '../../../domain/turno.js'
import { EstadoTurno } from '../../../domain/estadoTurno.js'
import { FactoryNotificacion } from '../../../domain/factoryNotificacion.js'
import { jest } from '@jest/globals'
import { ConflictError } from '../../../errors/AppError.js'

describe('Turno (domain)', () => {
	test('verificarBaja devuelve true cuando falta al menos una hora', () => {
		const inicio = new Date(Date.now() + 2 * 60 * 60 * 1000)
		const fin = new Date(inicio.getTime() + 30 * 60 * 1000)
		const t = new Turno(null, null, inicio, fin, null, null, null, EstadoTurno.DISPONIBLE, [])
		expect(t.verificarBaja()).toBe(true)
		const inicio2 = new Date(Date.now() + 30 * 60 * 1000)
		const t2 = new Turno(null, null, inicio2, fin, null, null, null, EstadoTurno.DISPONIBLE, [])
		expect(t2.verificarBaja()).toBe(false)
	})

	test('actualizarEstado agrega cambio al historial y retorna null (según lógica de producción)', async () => {
		const spy = jest.spyOn(FactoryNotificacion.prototype, 'crearNotificacion').mockResolvedValue({id: 'n1'})
		const inicio = new Date(Date.now() + 2 * 60 * 60 * 1000)
		const fin = new Date(inicio.getTime() + 30 * 60 * 1000)
		const t = new Turno('t1', {id: 'm1', nombre: 'M'}, inicio, fin, null, {nombre: 'S'}, null, EstadoTurno.DISPONIBLE, [])
		const paciente = {id: 'p1', nombre: 'P'}
		
		const not = await t.actualizarEstado(EstadoTurno.RESERVADO, paciente, 'mot')
		
		expect(not).toBeNull() 
		expect(spy).toHaveBeenCalled() 
		expect(t.estado).toBe(EstadoTurno.RESERVADO)
		expect(t.paciente).toBe(paciente)
		expect(t.historialDeEstados.length).toBe(1)
		expect(t.historialDeEstados[0].estado).toBe(EstadoTurno.RESERVADO)
		spy.mockRestore()
	})

	test('darDeBaja lanza ConflictError si no hay tiempo suficiente', async () => {
		const inicio = new Date(Date.now() + 30 * 60 * 1000) 
		const fin = new Date(inicio.getTime() + 30 * 60 * 1000)
		const t = new Turno('t2', null, inicio, fin, null, null, null, EstadoTurno.RESERVADO, [])
		
		await expect(t.darDeBaja('mot')).rejects.toThrow(ConflictError)
	})

	test('darDeBaja no lanza cuando hay tiempo suficiente (espera la actualización asincrónica)', async () => {
		const spy = jest.spyOn(FactoryNotificacion.prototype, 'crearNotificacion').mockResolvedValue({id: 'n2'})
		const inicio = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 horas (tiempo suficiente)
		const fin = new Date(inicio.getTime() + 30 * 60 * 1000)
		const t = new Turno('t3', {id: 'm1', nombre: 'M'}, inicio, fin, {id: 'p1', nombre: 'P'}, null, null, EstadoTurno.RESERVADO, [])
		
		await t.darDeBaja('motivo')
		
		expect(t.estado).toBe(EstadoTurno.DISPONIBLE)
		expect(t.paciente).toBeNull()
		expect(t.historialDeEstados.length).toBeGreaterThanOrEqual(1)
		spy.mockRestore()
	})
})