const moongose = require('mongoose')

const personajesSchema = new mongoose.personajesSchema({

    nombre:String, //obligatorio
    fechaDeNacimiento:String,
    colorDeOjos: String,
    genero: String,
    colorDeCabello: String,
    altura: String,
    masa: String,
    colorDePiel: String,
    peliculas: {
        type: mongose.peliculasSchema.Types.ObjectId,
        ref: 'Peliculas'
    },
    planetaNatal: {
        type: mongose.planetasSchema.Types.ObjectId,
        ref: 'Planetas'
    },
    especies:{
        type: mongose.especiesSchema.Types.ObjectId,
        ref: 'Especies'
    },
    naves:{
        type: mongose.navesSchema.Types.ObjectId,
        ref: 'Naves'
    },
    vehiculos:{
        type: mongose.vehiculosSchema.Types.ObjectId,
        ref: 'Vehiculos'
    },
    fec_creacion: Date,
    fec_modificacion: Date

})

const Personajes = moongose.model('Personajes', personajesSchema)