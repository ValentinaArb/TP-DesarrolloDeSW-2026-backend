import app from "./app.js"
import mongoose from "mongoose";

const port = process.env.PORT;
await mongoose.connect(process.env.MONGODB_URI);
app.listen(port, ()=>{
    console.info("El servidor arrancó correctamente en el puerto " + port);
});