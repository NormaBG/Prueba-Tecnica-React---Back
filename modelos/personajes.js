const mongoose = require('mongoose');

const personajesSchema = mongoose.Schema({ // Usar mongoose en lugar de moongoose

    nombre:String, //obligatorio
    fechaDeNacimiento:String,
    colorDeOjos: String,
    genero: String,
    colorDeCabello: String,
    altura: String,
    masa: String,
    colorDePiel: String,
    peliculas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Peliculas'
    },
    planetaNatal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planetas'
    },
    especies:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Especies'
    },
    naves:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Naves'
    },
    vehiculos:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehiculos'
    },
    fec_creacion: Date,
    fec_modificacion: Date

})

const Personajes = mongoose.model('Personajes', personajesSchema)

module.exports = Personajes