import { z } from 'zod';

export const modificarTurnoMedicoSchema = z.object({
    horaInicio: z.string().or(z.date()).optional(),
    estado: z.string().optional()
});

