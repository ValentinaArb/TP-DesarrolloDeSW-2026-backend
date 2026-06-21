import { z } from 'zod';

export const actualizarPacienteSchema = z.object({
    obraSocial: z.string().min(1, "La obra social no puede estar vacía").optional(),
    plan: z.string().min(1, "El plan no puede estar vacío").optional(),
    mail: z.string().email("El mail no es válido").optional(),
}).refine(
    data => data.obraSocial !== undefined || data.plan !== undefined || data.mail !== undefined,
    "Se debe enviar al menos obraSocial, plan o mail"
);