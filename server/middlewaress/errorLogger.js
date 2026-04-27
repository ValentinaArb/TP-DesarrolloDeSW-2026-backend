export function errorLogger(err, req, res, next) {
    console.error(err)({
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        error:{
            name: err.name,
            message: err.message,
            stack: err.stack
        },
    })
    next(err);
}