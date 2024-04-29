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
app.get('/personajes', (req, res)=>{
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

//post peliculas

app.post('/peliculas', (req,res) => {
    try{
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

    }catch(err){
        console.log(err)
    }
})

//get planetas

app.get('/planetas', (req, res) => {
    planetas
    .find()
    .then(planetas => res.send(planetas))
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

app.get('/vehiculos', (req,res) => {
    vehiculos
    .find()
    .then(vehiculos => res.send(vehiculos))
})