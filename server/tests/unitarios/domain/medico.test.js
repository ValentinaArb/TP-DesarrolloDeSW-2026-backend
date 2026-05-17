import { Medico } from '../../../domain/medico.js'
import { NotFoundError } from '../../../errors/AppError.js'

describe('Medico (domain)', () => {
	test('constructor y propiedades básicas', () => {
		const servicios = []
		const sedes = []
		const disponibilidades = []
		const m = new Medico('m1', {id: 'u1', nombre: 'N', apellido: 'A'}, '123', 'N', 'A', servicios, sedes, disponibilidades)
		expect(m.id).toBe('m1')
		expect(m.usuario.id).toBe('u1')
		expect(m.matricula).toBe('123')
		expect(m.servicios).toBe(servicios)
	})

	test('agregar y eliminar disponibilidad', () => {
		const d1 = {dia: 'Lunes'}
		const m = new Medico(null, null, null, null, null, [], [], [d1])
		const d2 = {dia: 'Martes'}
		m.agregarDisponibilidad(d2)
		expect(m.disponibilidades).toContain(d2)
		m.eliminarDisponibilidad(d1)
		expect(m.disponibilidades).not.toContain(d1)
		expect(m.disponibilidadesAnteriores).toContain(d1)
	})

	test('dar de alta y baja de servicio (baja lanza NotFound si no existe)', () => {
		const s1 = {id: 1, nombre: 'Serv1'}
		const s2 = {id: 2, nombre: 'Serv2'}
		const m = new Medico(null, null, null, null, null, [s1], [], [])
		m.darDeAltaServicio(s2)
		expect(m.servicios).toContain(s2)
		const lenBefore = m.servicios.length
		// baja de servicio existente no debe lanzar
		m.darDeBajaServicio(1)
		expect(m.servicios.length).toBe(lenBefore - 1)
		// baja de servicio inexistente lanza NotFoundError
		expect(() => m.darDeBajaServicio(999)).toThrow(NotFoundError)
	})
})

