const moongose = require('mongoose')

const vehiculosSchema = moongose.Schema({
    nombre:String, //obligatorio
    modelo: String, // obligatorio
    clase: String,
    tamano: String,
    numPasajeros: String,
    maxVelocidadAtmosferica: String,
    capacidadMaxima: String,
    tiempoMaxConsumible: String,
    fec_creacion: Date,
    fec_modificacion: Date
})

const Vehiculos = moongose.model('Vehiculos', vehiculosSchema)
module.exports = Vehiculos