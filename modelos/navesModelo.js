const mongoose = require('mongoose')

const navesSchema = new mongoose.navesSchema({
    nombre:String, //obligatorio
    modelo: String, //obligatorio
    clase: String,
    tamaño: String,
    numPasajeros: String,
    maxVelocidadAtmosferica: String,
    hiperimpulsor: String, 
    MGLT: String,
    capacidadCarga: String,
    tiempoMaxConsumible: String,
    fec_creacion: Date,
    fec_modificacion: Date
})

const Naves = moongose.model('Naves',navesSchema)