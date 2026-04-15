import express from "express";
import healthcheckRoutes from "./routes/healthcheckRoutes.js";

const app = express();

app.use(express.json());

app.use("/healthcheck", healthcheckRoutes);

const puerto = 3000;
app.listen(puerto, ()=>{
    console.log("El servidor arrancó correctamente en el puerto " + puerto);
});

app.get("/turno", (req, res) => {
    res.json(turnos);
});

app.post("/turno", (req, res) => {
    const { medico, fechaHora, practica, sede } = req.body;

    if (!medico || !fechaHora || !practica || !sede) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios: medico, fecha, practica o sede" 
        });
    }

    res.status(201).json({
        mensaje: "Turno creado con éxito"
    });
})

