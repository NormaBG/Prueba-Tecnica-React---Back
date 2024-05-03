const axios = require('axios');
const mongoose = require('mongoose');
const Planeta = require('./modelos/planetasModelo');
const Personaje = require('./modelos/personajes');
const Nave = require('./modelos/navesModelo');
const Vehiculo = require('./modelos/vehiculos');
const Pelicula = require('./modelos/peliculasModelo');

mongoose.connect('mongodb://localhost:27017/SWAPI_BACK', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', async () => {
    console.log('Conexión exitosa a la base de datos');

    try {

        /*const personajesData = await fetchDataRecursive('https://swapi.dev/api/people/');
        const personajesInstancias = await mapeadoPersonajes(personajesData);
        await Personaje.insertMany(personajesInstancias);*/

        const planetasData = await fetchDataRecursive('https://swapi.dev/api/planets/');
        const planetasInstancias = await mapeadoPlanetas(planetasData);
        await Planeta.insertMany(planetasInstancias);
        
        const navesData = await fetchDataRecursive('https://swapi.dev/api/starships/');
        const navesInstancias = await mapeadoNaves(navesData);
        await Nave.insertMany(navesInstancias);

        const vehiculosData = await fetchDataRecursive('https://swapi.dev/api/vehicles/');
        const vehiculosInstancias = await mapeadoVehiculos(vehiculosData);
        await Vehiculo.insertMany(vehiculosInstancias);

        const peliculasData = await fetchDataRecursive('https://swapi.dev/api/films/');
        const peliculasInstancias = await mapeadoPeliculas(peliculasData);
        await Pelicula.insertMany(peliculasInstancias);

        console.log('Datos almacenados en la base de datos');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
});

const fetchDataRecursive = async (url, data = []) => {
    try {
        const response = await axios.get(url);
        data.push(...response.data.results);

        if (response.data.next) {
            return await fetchDataRecursive(response.data.next, data);
        } else {
            return data;
        }
    } catch (error) {
        console.log(error)
    }
};

/*
const mapeadoPersonajes = async (personajesData) => {
    const personajesInstancias = [];

    for (const personajeData of personajesData) {
        const personajeInstancia = new Personaje({
            nombre: personajeData.name,
            fechaDeNacimiento: personajeData.birth_year,
            colorDeOjos: personajeData.eye_color,
            genero: personajeData.gender,
            colorDeCabello: personajeData.hair_color,
            altura: personajeData.height,
            masa: personajeData.mass,
            colorDePiel: personajeData.skin_color,
            peliculas: personajeData.films.map((film) => film.split('/')[5]),
            planetaNatal: personajeData.homeworld.split('/')[5],
            especies: personajeData.species.map((specie) => specie.split('/')[5]),
            naves: personajeData.starships.map((starship) => starship.split('/')[5]),
            vehiculos: personajeData.vehicles.map((vehicle) => vehicle.split('/')[5]),
        });
        personajesInstancias.push(personajeInstancia);
    }

    return personajesInstancias;
};*/

// Funciones de mapeo para cada entidad
const mapeadoPlanetas = async (planetasData) => {
    const planetasInstancias = [];

    for (const planetaData of planetasData) {
        const planetaInstancia = new Planeta({
            nombre: planetaData.name,
            diametro: planetaData.diameter,
            periododeRotacion: planetaData.rotation_period,	
            gravedad: planetaData.gravity,
            poblacion: planetaData.population,
            clima: planetaData.climate,
            terrno: planetaData.terrain,
            superficieAgua: planetaData.surface_water,
        });
        planetasInstancias.push(planetaInstancia);
    }

    return planetasInstancias;
};

const mapeadoNaves = async (navesData) => {
    const navesInstancias = [];

    for (const naveData of navesData) {
        const naveInstancia = new Nave({
            nombre: naveData.name,
            modelo: naveData.model,
            clase: naveData.starship_class,
            tamano: naveData.length,
            numPasajeros: naveData.passengers,
            maxVelocidadAtmosferica: naveData.max_atmosphering_speed,
            hiperimpulsor: naveData.hyperdrive_rating,
            MGLT: naveData.MGLT,
            capacidadCarga: naveData.cargo_capacity,
            tiempoMaxConsumible: naveData.consumables,

        });
        navesInstancias.push(naveInstancia);
    }

    return navesInstancias;
};

const mapeadoVehiculos = async (vehiculosData) => {
    const vehiculosInstancias = [];

    for (const vehiculoData of vehiculosData) {
        const vehiculoInstancia = new Vehiculo({
            nombre: vehiculoData.name,
            modelo: vehiculoData.model,
            clase: vehiculoData.vehicle_class,
            tamano: vehiculoData.length,
            numPasajeros: vehiculoData.passengers,
            maxVelocidadAtmosferica: vehiculoData.max_atmosphering_speed,
            capacidadMaxima: vehiculoData.cargo_capacity,
            tiempoMaxConsumible: vehiculoData.consumables
        });
        vehiculosInstancias.push(vehiculoInstancia);
    }

    return vehiculosInstancias;
};

const mapeadoPeliculas = async (peliculasData) => {
    const peliculasInstancias = [];

    for (const peliculaData of peliculasData) {
        const peliculaInstancia = new Pelicula({
            titulo: peliculaData.title,
            director: peliculaData.director,
            productor: peliculaData.producer,
        });
        peliculasInstancias.push(peliculaInstancia);
    }

    return peliculasInstancias;
};