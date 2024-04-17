const mongoose = require('mongoose')

const peliculasSchema = new mongoose.peliculasSchema({

    //todo es obligatorio
    tituloPelicula: String,
    director: String,
    productor: String,
    fec_creacion: Date,
    fec_modificacion: Date

})

const Peliculas = mongoose.model('Peliculas', peliculasSchema)
Peliculas.exports = Peliculas   