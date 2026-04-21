class ErrorApp extends Error{
    constructor(status, mensaje) {
        super(mensaje);
        this.status = status;
    }
}

const ERRORES = {
    NOT_FOUND: {status: 404, mensaje: "Recurso no encontrado"},
    NOT_FOUND_MEDICO: { status: 404, mensaje: "Medico no encontrado" },
    NOT_FOUND_TURNO: {status: 404, mensaje: "Turno no encontrado"},
    BAD_REQUEST: {status: 400, mensaje: "Los errores ingresados no son validos"},
    SERVER_ERROR: {status: 500, mensaje: "Error en el server"}
}

export { ErrorApp, ERRORES };