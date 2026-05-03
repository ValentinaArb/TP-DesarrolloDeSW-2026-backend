class Plan{
    id;
    nombre;
    coberturasEspecialidad
    coberturasPractica;


    constructor(id = null, nombre, coberturasEspecialidad, coberturasPractica) {
        this.id = id;
        this.nombre = nombre;
        this.coberturasEspecialidad = coberturasEspecialidad;
        this.coberturasPractica = coberturasPractica;
    }

    obtenerNivelDeLista(lista, propiedad, valorBuscado) {
        const cobertura = lista.find((item) => item[propiedad] === valorBuscado);
        return cobertura?.nivel || null;
    }

    obtenerCoberturaPorEspecialidad(especialidad) {
        return this.obtenerNivelDeLista(this.coberturasEspecialidad, 'especialidad', especialidad);
    }

    obtenerCoberturaPorPractica(practica) {
        return this.obtenerNivelDeLista(this.coberturasPractica, 'practica', practica);
    }
}