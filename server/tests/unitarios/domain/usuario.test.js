import { Usuario } from '../../../domain/usuario.js'

describe('Usuario (domain)', () => {
  test('constructor asigna propiedades con id proporcionado', () => {
    const u = new Usuario('id-1', 'Juan', 'juan@mail.com', 'secret')
    expect(u.id).toBe('id-1')
    expect(u.nombre).toBe('Juan')
    expect(u.mail).toBe('juan@mail.com')
    expect(u.password).toBe('secret')
  })

  test('constructor permite id nulo', () => {
    const u = new Usuario(null, 'Ana', 'ana@mail.com', 'pwd')
    expect(u.id).toBeNull()
    expect(u.nombre).toBe('Ana')
    expect(u.mail).toBe('ana@mail.com')
    expect(u.password).toBe('pwd')
  })

  test('sin parámetros crea usuario con campos undefined excepto id null', () => {
    const u = new Usuario()
    expect(u.id).toBeNull()
    expect(u.nombre).toBeUndefined()
    expect(u.mail).toBeUndefined()
    expect(u.password).toBeUndefined()
  })

  test('se pueden actualizar propiedades después de creado', () => {
    const u = new Usuario(null, 'P', 'p@mail', 'pw')
    u.nombre = 'Pedro'
    u.mail = 'pedro@mail'
    u.password = 'newpw'
    expect(u.nombre).toBe('Pedro')
    expect(u.mail).toBe('pedro@mail')
    expect(u.password).toBe('newpw')
  })
})
