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
    nombre:String,
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
        ref: 'planetas'
    },
    fec_creacion: Date,
    fec_modificacion: Date
});

const Datos = mongoose.model('especies', datosSchema);

axios.get('https://swapi.dev/api/species')
    .then((response) => {
        const datosAPI2 = response.data.results;
        datosAPI2.forEach(async (dato) => {
            try {
                const nuevoDato = new Datos({
                    nombre: dato.name,
                    clasificacion: dato.classification,
                    designacion: dato.designation,
                    estatura: dato.average_height,
                    promedioDeVida: dato.average_lifespan,
                    colorDeOjos: dato.eye_colors,
                    colorDeCabello: dato.hair_colors,
                    colorDePiel: dato.skin_colors,
                    lenguaje: dato.language,
                    planetaNatal: daro.homeworld,
                    fec_creacion: dato.created,
                    fec_modificacion: dato.edited
                });

                await nuevoDato.save();
                console.log('Dato guardado en la base de datos:', nuevoDato);
            } catch (error) {
                console.error('Error al guardar el dato:', error);
            }
        });
    })
    .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
    });

    //insertar peliculas en la bd 
    /*
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
    });*/

        //insertar peliculas en la bd 
    /*/**/
/*
const datosSchema = new mongoose.Schema({
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
});

const Datos = mongoose.model('planetas', datosSchema);

axios.get('https://swapi.dev/api/planets/?page=6')
    .then((response) => {
        const datosAPI2 = response.data.results;
        console.log("Datos get api:", response.data.results)
        datosAPI2.forEach((dato) => {
            const nuevoDato = new Datos({
                nombrePlaneta: dato.name,
                diametro: dato.diameter,
                periododeRotacion: dato.rotation_period,
                gravedad: dato.gravity,
                poblacion: dato.population,
                clima: dato.climate,
                terreno: dato.terrain,
                superficieAgua: dato.surface_water,
                fec_creacion: dato.created,
                fec_modificacion: dato.edited
            }); 
            nuevoDato.save()
                .then(() => {
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

    */