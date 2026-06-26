import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { TurnoModel } from '../../schemas/turno.schema.js';
import { PacienteModel } from '../../schemas/paciente.schema.js'; 

describe('Tests de Integración - Reservación de Turnos', () => {
  
  beforeAll(async () => {
    const url = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1/sweet_medical_test';
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url);
    }
  });

  afterEach(async () => {
    await TurnoModel.deleteMany({});
    if (typeof PacienteModel !== 'undefined') {
      await PacienteModel.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('PATCH /turnos/:id', () => {
    it('Debería reservar (dar de alta) un turno disponible exitosamente', async () => {
        const medicoId = new mongoose.Types.ObjectId().toString();
        const pacienteIdMock = new mongoose.Types.ObjectId().toString();
        const usuarioIdMock = new mongoose.Types.ObjectId().toString();

        await PacienteModel.create({
            _id: pacienteIdMock,
            nombre: 'Juan',
            apellido: 'Pérez',
            dni: '12345678',                           
            sexo: 'M',                                 
            fechaNacimiento: new Date('1995-05-15'),  
            usuario: {
            _id: usuarioIdMock                       
            }
        });

        const turnoDisponible = await TurnoModel.create({
            medico: {
            _id: medicoId,
            nombre: 'Carlos',
            apellido: 'Méndez',
            usuario: { _id: medicoId }
            },
            servicio: {
            _id: new mongoose.Types.ObjectId().toString(),
            nombre: 'Odontología',
            duracionTurno: 60,
            costo: 3000
            },
            sede: {
            _id: new mongoose.Types.ObjectId().toString(),
            nombre: 'Rosario 866',
            direccion: 'Caballito'
            },
            fechaInicio: new Date('2027-03-10T18:30:00.000Z'),
            fechaFinal: new Date('2027-03-10T19:30:00.000Z'),
            estado: 'DISPONIBLE',
            historialDeEstados: [{
            fechaInicioIngreso: new Date(),
            estado: 'DISPONIBLE',
            motivo: 'CREACION'
            }],
            costo: 3000
        });

        const response = await request(app)
            .patch(`/turnos/${turnoDisponible._id}`) 
            .send({
            operacion: 'alta',
            pacienteId: pacienteIdMock
            })
            .expect(200);

        expect(response.body.mensaje).toBe('Estado del turno modificado con éxito');
        });

    it('Debería lanzar un error si no se pasa el pacienteId al querer dar de alta', async () => {
      const medicoId = new mongoose.Types.ObjectId().toString();
      
      const turnoDisponible = await TurnoModel.create({
        medico: { _id: medicoId, nombre: 'Carlos', apellido: 'Méndez', usuario: { _id: medicoId } },
        servicio: { _id: new mongoose.Types.ObjectId().toString(), nombre: 'Odontología', duracionTurno: 60, costo: 3000 },
        sede: { _id: new mongoose.Types.ObjectId().toString(), nombre: 'Rosario 866', direccion: 'Caballito' },
        fechaInicio: new Date(),
        fechaFinal: new Date(),
        estado: 'DISPONIBLE',
        costo: 3000
      });

      const response = await request(app)
        .patch(`/turnos/${turnoDisponible._id}`)
        .send({
          operacion: 'alta'
        })
        .expect(400); 

      expect(response.body).toBeDefined();
    });
  });
});