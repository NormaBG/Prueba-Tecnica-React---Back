const moongose = require('mongoose')

const vehiculosSchema = new mongoose.vehiculosSchema({
    nombre:String, //obligatorio
    modelo: String, // obligatorio
    clase: String,
    tamaño: String,
    numPasajeros: String,
    maxVelocidadAtmosferica: String,
    capacidadMaxima: String,
    tiempoMaxConsumible: String,
    fec_creacion: Date,
    fec_modificacion: Date
})

const Vehiculos = moongose.model('Vehiculos', vehiculosSchema)