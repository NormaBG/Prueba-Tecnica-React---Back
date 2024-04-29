const express = require('express')
const app = express()
app.use(express.json())
//conexion a la bd

const mooongose = require('mongoose')
mooongose
    .connect('mongodb://localhost:27017/BACK-SWAPI')
    .then(() => console.log('Conectado a la base de datos'))

app.listen(5005, () => console.log("Servidor levantado en el puerto 5005"))


//modelos

const personajes = require('./modelos/personajes.js')
const peliculas = require('./modelos/peliculasModelo.js')
const planetas = require('./modelos/planetasModelo.js')
const naves = require('./modelos/navesModelo.js')
const especies = require('./modelos/especiesModelo.js')
const vehiculos = require('./modelos/vehiculos.js')

//get personajes
app.get('/personajes', (req, res) => {
    personajes
        .find()
        .then(personajes => res.send(personajes))
})

//get peliculas

app.get('/peliculas', (req, res) => {
    peliculas
        .find()
        .then(peliculas => res.send(peliculas))
})

//get por id

app.get('/peliculas/:id', async (req, res) => {
    try {
        const campos = ['tituloPelicula', 'director', 'productor'];
        const pelicula = await peliculas.findById(req.params.id, campos);
        if (!pelicula) {
            return res.status(404).json({ mensaje: "Pelicula no encontrada" });
        }
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la pelicula", error: error.message });
    }
})

//post peliculas

app.post('/peliculas', (req, res) => {
    try {
        const nuevaPelicula = new peliculas({
            tituloPelicula: req.body.tituloPelicula,
            director: req.body.director,
            productor: req.body.productor,
            fec_creacion: req.body.fec_creacion,
            fec_modificacion: req.body.fec_modificacion
        });

        console.log(nuevaPelicula)
        nuevaPelicula.save()
        console.log("Agregado")
        res.status(201).json(nuevaPelicula)

    } catch (err) {
        console.log(err)
    }
})

//put peliculas
app.put('/peliculas/:id', async (req, res) => {
    try {
        const personajeActualizado = await peliculas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!personajeActualizado) {
            return res.status(404).json({ mensaje: "Pelicula no encontrado" });
        }
        res.json(personajeActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el personaje", error: error.message });
    }
})

//get planetas

app.get('/planetas', (req, res) => {
    planetas
        .find()
        .then(planetas => res.send(planetas))
})

//get planetas por id 

app.get('/planetas/:id', async (req, res) => {
    try {
        const camposFuera = ['-fec_creacion', '-fec_modificacion'];
        const planeta = await planetas.findById(req.params.id, camposFuera);
        if (!planeta) {
            return res.status(404).json({ mensaje: "Planeta no encontrado" })
        }
        res.json(planeta);
    } catch (err) {
        console.log(err)
    }
})

//post planetas

app.post('/planetas', (req,res) => {
    try{

    }catch(err){
        console.log(err);
    }
})

//get naves

app.get('/naves', (req, res) => {
    naves
        .find()
        .then(naves => res.send(naves))
})

//get especies

app.get('/especies', (req, res) => {
    especies
        .find()
        .then(especies => res.send(especies))
})

//get vehiculos

app.get('/vehiculos', (req, res) => {
    vehiculos
        .find()
        .then(vehiculos => res.send(vehiculos))
})