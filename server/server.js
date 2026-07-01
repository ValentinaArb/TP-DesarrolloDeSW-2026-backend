import app from "./app.js"
import mongoose from "mongoose";
import { recordatorioTurnoCron } from "./cron/recordatorioTurno.js";
import { agendaCron } from "./cron/agendaCron.js";

const port = process.env.PORT || 3001;
await mongoose.connect(process.env.MONGODB_URI);
recordatorioTurnoCron();
agendaCron();
app.listen(port, ()=>{
    console.info("El servidor arrancó correctamente en el puerto " + port);
});