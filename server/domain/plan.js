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

    calcularCostoAbonar(servicioId, costoBase) {
        // busco cobertura comparando por el id del servicio (practica o especialidad)
        const cobertura = this.coberturasServicio.find(item => item.servicio.id === servicioId);
        const nivel = cobertura?.nivel || "NO_CUBIERTA";

        switch (nivel) {
            case "TOTAL":
                return { monto: 0, estadoPrestacion: "TOTAL" };
            case "PARCIAL":
                return { monto: costoBase * 0.5, estadoPrestacion: "PARCIAL" };
            case "NO_CUBIERTA":
            default:
                return { monto: costoBase, estadoPrestacion: "NO_CUBIERTA" };
        }
    }
}