import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ error: "Token requerido" });

    try {
        const payload = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
        req.user = payload; // { id, mail, rol, nombre }
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
};