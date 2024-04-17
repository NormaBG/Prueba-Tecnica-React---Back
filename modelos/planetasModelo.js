const mongoose = require('mongoose')

const planetasSchema = new mongoose.planetasSchema({

    nombrePlaneta: String, //obligatorio
    diametro: String,
    periododeRotacion: String,
    gravedad: String,
    poblacion: String,
    clima: String,
    terreno: String,
    superficieAgua:String,
    fec_creacion: Date,
    fec_modificacion: Date

})

const planetas = mongoose.model('planetas', planetasSchema)