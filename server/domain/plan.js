export class Plan{
    id;
    nombre;
    coberturasServicio;


    constructor(id = null, nombre, coberturasServicio) {
        this.id = id;
        this.nombre = nombre;
        this.coberturasServicio = coberturasServicio;
    }

    obtenerNivelDeLista(lista, propiedad, valorBuscado) {
        const cobertura = lista.find((item) => item[propiedad] === valorBuscado);
        return cobertura?.nivel || null;
    }

    obtenerCoberturaPorServicio(servicio) {
        return this.obtenerNivelDeLista(this.coberturasServicio, 'servicio', servicio);
    }
}