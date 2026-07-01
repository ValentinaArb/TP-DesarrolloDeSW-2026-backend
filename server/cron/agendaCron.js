import cron from 'node-cron';
import { AgendaService } from '../services/agendaService.js';
import { MedicoRepository } from '../repositories/medicoRepository.js';

const agendaService = new AgendaService();
const medicoRepository = new MedicoRepository();

// Se ejecuta el el día 1 cada 3 mesesa las 2am
export const agendaCron = () => {
    cron.schedule('0 2 1 */3 *', async () => {
        console.log('Iniciando generación de turnos trimestral');
        
        try {
            const medicos = await medicoRepository.findAll();
            console.log(`Se encontraron ${medicos.length} médicos para procesar.`);

            const TAMANIO_LOTE = 15; 
            
            for (let i = 0; i < medicos.length; i += TAMANIO_LOTE) {
                const loteActual = medicos.slice(i, i + TAMANIO_LOTE);

                await Promise.all(
                    loteActual.map(async (medico) => {
                        try {
                            await agendaService.generarTurnosPara(medico);
                        } catch (errorMedico) {
                            console.error(`Error generando agenda para Médico id [${medico._id}]:`, errorMedico.message);
                        }
                    })
                );
                
                console.log(`[Progreso] Procesados ${Math.min(i + TAMANIO_LOTE, medicos.length)} de ${medicos.length} médicos.`);
            }

            console.log('Proceso de generación trimestral finalizado');

        } catch (errorGeneral) {
            console.error('Error en agendaCron:', errorGeneral);
        }
    }, {scheduled: true,
        timezone: "America/Argentina/Buenos_Aires"});
};