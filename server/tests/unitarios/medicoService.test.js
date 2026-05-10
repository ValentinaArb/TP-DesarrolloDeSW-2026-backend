import { Medico } from "../../src/models/Medico.js";
import { describe, expect, test } from "@jest/globals"
import { MedicoService } from "../../services/medicoService";   

const medicoService = new MedicoService();

describe("medicoService", () => {
    describe("crearMedico", () => {
        test("no debe permitir crear un medico repetido", async () => {
            let medicos = await medicoService.medicoRepository.findAll();
            await expect(medicoService.crearMedico(medicos[0])).rejects.toThrow(ConflictError);
        })
    })
})
