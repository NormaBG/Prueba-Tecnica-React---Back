const mongoose = require('mongoose')

const especiesSchema = new mongoose.Schema({

    nombre:String, //obligatorio
    clasificacion: String,
    designacion: String,
    estatura: String,
    promedioDeVida: String,
    colorDeOjos: String,
    colorDeCabello: String,
    colorDePiel: String,
    lenguaje: String,
    planetaNatal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planetas'
    },
    fec_creacion: Date,
    fec_modificacion: Date
})

const Especies = mongoose.model('Especies', especiesSchema)
module.exports = Especies