export class Plan{
    id;
    nombre;
    coberturasServicio;


    constructor(id = null, nombre, coberturasServicio) {
        this.id = id;
        this.nombre = nombre;
        this.coberturasServicio = coberturasServicio;
    }

    calcularCostoAbonar(servicioId, costo) {
        // busco cobertura comparando por el id del servicio (practica o especialidad)
        const cobertura = this.coberturasServicio.find(item => item.servicio.id === servicioId);
        const nivel = cobertura?.nivel || "NO_CUBIERTA";

        switch (nivel) {
            case "TOTAL":
                return { monto: 0, estadoPrestacion: "TOTAL" };
            case "PARCIAL":
                return { monto: costo * 0.5, estadoPrestacion: "PARCIAL" };
            case "NO_CUBIERTA":
            default:
                return { monto: costo, estadoPrestacion: "NO_CUBIERTA" };
        }
    }
}