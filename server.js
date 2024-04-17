const express = require('express')
const app = express()

//conexion a la bd

const mooongose = require('mongoose')
mooongose
    .connect('mongodb://localhost:27017/BACK-SWAPI')
    .then(() => console.log('Conectado a la base de datos'))
    
app.listen(5005, () => console.log("Servidor levantado en el puerto 5005"))