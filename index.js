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
