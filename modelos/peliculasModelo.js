const mongoose = require('mongoose')

const peliculasSchema = mongoose.Schema({

    //todo es obligatorio
    tituloPelicula: String,
    director: String,
    productor: String,
    fec_creacion: Date,
    fec_modificacion: Date

})

const Peliculas = mongoose.model('Peliculas', peliculasSchema)
module.exports = Peliculas   