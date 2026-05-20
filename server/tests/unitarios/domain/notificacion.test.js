import { Notificacion } from '../../../domain/notificacion.js'

describe('Notificacion (domain)', () => {
	test('constructor acepta fecha como string o Date y asigna campos', () => {
		const destinatario = {id: 'p1', nombre: 'P', apellido: 'A'}
		const remitente = {id: 'm1', nombre: 'M', apellido: 'B'}
		const n1 = new Notificacion(null, destinatario, remitente, 'msg', '2026-01-01T00:00:00Z', null, false)
		expect(n1.destinatario).toBe(destinatario)
		expect(n1.remitente).toBe(remitente)
		expect(n1.fechaHoraCreacion instanceof Date).toBe(true)

		const now = new Date()
		const n2 = new Notificacion(null, destinatario, remitente, 'msg2', now, null, false)
		expect(n2.fechaHoraCreacion).toBe(now)
	})

	test('marcarComoLeida setea fecha y estado', () => {
		const destinatario = {id: 'p1', nombre: 'P', apellido: 'A'}
		const remitente = {id: 'm1', nombre: 'M', apellido: 'B'}
		const n = new Notificacion(null, destinatario, remitente, 'msg', null, null, false)
		expect(n.estaLeida).toBe(false)
		expect(n.fechaHoraLeida).toBeNull()
		n.marcarComoLeida()
		expect(n.estaLeida).toBe(true)
		expect(n.fechaHoraLeida instanceof Date).toBe(true)
	})
})