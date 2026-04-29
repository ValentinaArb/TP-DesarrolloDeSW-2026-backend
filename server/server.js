import app from "./app.js"


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log("El servidor arrancó correctamente en el puerto " + port);
});