import cron from 'node-cron';
import { AgendaService } from '../services/agendaService.js';
import { MedicoRepository } from '../repositories/medicoRepository.js';

const agendaService = new AgendaService();
const medicoRepository = new MedicoRepository();

// Se ejecuta el el día 1 cada 3 mesesa las 2am
cron.schedule('0 2 1 */3 *', async () => {
    console.log('Ejecutando generación de turnos trimestral...');
    const medicos = await medicoRepository.findAll();
    for (const medico of medicos) {
        await agendaService.generarTurnosPara(medico);
    }
    console.log('Turnos generados correctamente.');
});