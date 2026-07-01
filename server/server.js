import app from "./app.js"
import mongoose from "mongoose";

const port = process.env.PORT || 3001;
await mongoose.connect(process.env.MONGODB_URI);
recordatorioTurnoCron();
app.listen(port, ()=>{
    console.info("El servidor arrancó correctamente en el puerto " + port);
});