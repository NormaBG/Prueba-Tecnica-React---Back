const axios = require('axios');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BACK-SWAPI')
    .then(() => {
        console.log('Conexión exitosa a la base de datos');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });

const datosSchema = new mongoose.Schema({
        tituloPelicula: String,
        director: String,
        productor: String,
        fec_creacion: Date,
        fec_modificacion: Date
});

const Datos = mongoose.model('peliculas', datosSchema);

axios.get('https://swapi.dev/api/films')
    .then((response) => {
        const datosAPI2 = response.data.results;
        console.log("Datos get api:", response.data.results)
        datosAPI2.forEach((dato) => {
            const nuevoDato = new Datos({
                tituloPelicula: dato.title,
                director: dato.director,
                productos: dato.productor,
                fec_creacion: dato.created,
                fec_modificacion: dato.edited
            }); 
            nuevoDato.save()
                .then(() => {
                    console.log("Dato guardado:", nuevoDato)
                    console.log('Dato guardado en la base de datos:', nuevoDato)
                })
                .catch((error) => {
                    console.error('Error al guardar el dato:', error);
                });
        });
    })
    .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
    });