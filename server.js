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
const camposFuera = ['-fec_creacion', '-fec_modificacion'];

//get personajes
app.get('/personajes', (req, res) => {
    personajes
        .find()
        .then(personajes => res.send(personajes))
})

//get personajes por id

app.get('/personajes:id', async (req, res) => {
    try {
        const personajes = await personajes.findById(req.params.id)
        if(!pelicula){
            return res.status(404).json({ mensaje: "Personaje no encontrado"})
        }
        res.json(personajes);
    }catch(error){
        res.status(500).json({ mensaje: "Error al obtener el personaje"})
    }
})

//post personajes

app.post('/personajes', (req, res) => {
    try {
        const nuevoPersonaje = new personaje({
            nombre: req.body.nombre,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            colorDeOjos: req.body.colorDeOjos,
            peliculas: req.body.peliculas,
            planetaNatal: req.body.planetaNatal,
            especies: req.body.especies,
            naves: req.body.naves,
            vehiculos: req.body.vehiculo,
        })
        console.log(nuevoPersonaje)
        nuevoPersonaje.save()
        console.log("Agregado")
        res.status(201).json(nuevoPersonaje)
    }catch (err){{
        console.log(err)
    }}
})

//put personajes

app.put('/personajes/:id', async (req, res) => {
    try {
        const personajeActualizado = await personajes.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!personajeActualizado){
            return res.status(404).json({ mensaje: "Personaje no encontrado"})
        }
        res.json(personajeActualizado)
    }catch(error){
        res.status(500).json({ mensaje: "Error al actualizar el personaje"})
    }
})

//delete personajes

app.delete('/personajes/:id', async (req, res) => {
    try {
        const personajeEliminado = await personajes.findByIdAndDelete(req.params.id)
        if(!personajeEliminado){
            return res.status(404).json({ mensaje: "Personaje no encontrado"})
        }
        res.json("Eliminado con exito")
    }catch(error){
        res.status(500).json({ mensaje: "Error al eliminar el personaje"})
    }
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
        const peliculaActualizada = await peliculas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!peliculaActualizada) {
            return res.status(404).json({ mensaje: "Pelicula no encontrado" });
        }
        res.json(peliculaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el personaje", error: error.message });
    }
})

//delete peliculas

app.delete('/peliculas/:id', async (req, res) => {
    try {
        const peliculaEliminada = await peliculas.findByIdAndDelete(req.params.id);
        if (!peliculaEliminada) {
            return res.status(404).json({ mensaje: "Pelicula no encontrada" })
        }
        res.json("Eliminado con exito")
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la pelicula", error: error.message })
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

app.post('/planetas', (req, res) => {
    try {
        const nuevoPlaneta = new planetas({
            nombrePlaneta: req.body.nombrePlaneta,
            diametro: req.body.diametro,
            periodoRotacion: req.body.periodoRotacion,
            gravedad: req.body.gravedad,
            poblacion: req.body.poblacion,
            clima: req.body.clima,
            terreno: req.body.terreno,
            superficieAgua: req.body.superficieAgua,
            fec_creacion: req.body.fec_creacion,
            fec_modificacion: req.body.fec_modificacion
        });
        console.log("Nuevo planeta", nuevoPlaneta);
        nuevoPlaneta.save();
        console.log("Agregado");
        res.status(201).json(nuevoPlaneta);
    } catch (err) {
        console.log(err);
    }
})

//put planetas

app.put('/planetas/:id', async (req, res) => {
    try {
        const planetaActualizado = await planetas.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!planetaActualizado) {
            return res.status(404).json({ mensaje: "Planeta no encontrado" });
        }
        res.json(planetaActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "erro al actualizar el planeta", error: error.message })
    }
})

//delete planetas

app.delete('/planetas/:id', async (req, res) => {
    try {
        const planetaEliminado = await planetas.findByIdAndDelete(req.params.id);
        if (!planetaEliminado) {
            return res.status(404).json({ mensaje: "Planeta no encontrado" })
        }
        res.json("Eliminado con exito")
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el planeta", error: error.message })
    }
})

//get naves

app.get('/naves', (req, res) => {
    naves
        .find()
        .then(naves => res.send(naves))
})

//get naves por id 

app.get('/naves/:id', async (req, res) => {
    try {
        const nave = await naves.findById(req.params.id, camposFuera);
        if (!nave) {
            return res.status(404).json({ mensaje: "Nave no encontrada" });
        }
        res.json(nave);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la nave", error: error.message });
    }
})

//post naves

app.post('/naves', (req, res) => {
    try {
        const nuevaNave = new naves({
            nombre: req.body.nombre,
            modelo: req.body.modelo,
            clase: req.body.clase,
            tamano: req.body.tamano,
            numPasajeros: req.body.numPasajeros,
            maxVelocidadAtmosferica: req.body.maxVelocidadAtmosferica,
            hiperimpulsor: req.body.hiperimpulsor,
            MGLT: req.body.MGLT,
            capacidadCarga: req.body.capacidadCarga,
            tiempoMaxConsumible: req.body.tiempoMaxConsumible,
        });
        console.log("Nueva nave", nuevaNave);
        nuevaNave.save();
        console.log("Agregado");
        res.status(201).json(nuevaNave);
    } catch (err) {
        console.log(err)
    }
})

//put naves

app.put('/naves/:id', async (req, res) => {
    try {
        const naveActualizada = await naves.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!naveActualizada) {
            return res.status(404).json({ mensaje: "Nave no encontrada" });
        }
        res.json(naveActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la nave", error: error.message })
    }
})

//delete naves

app.delete('/naves/:id', async (req, res) => {
    try {
        const naveEliminada = await naves.findByIdAndDelete(req.params.id);
        if (!naveEliminada) {
            return res.status(404).json({ mensaje: "Nave no encontrada" })
        }
        res.json("Eliminado con exito")
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la nave", error: error.message })
    }
})

//get especies

app.get('/especies', (req, res) => {
    especies
        .find()
        .then(especies => res.send(especies))
})

//get especies por id

app.get('/especies/:id', async (req, res) => {
    try {
        const especiess = await especies.findById(req.params.id, camposFuera);
        if (!especiess) {
            return res.status(404).json({ mensaje: "especies no encontrada" });
        }
        res.json(especiess);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la especies", error: error.message });
    }
})

//post especies

app.post('/especies', (req, res) => {
    try {
        const nuevaEspecie = new especies({
            nombre: req.body.nombreEspecie,
            clasificacion: req.body.clasificacion,
            designacion: req.body.designacion,
            estatura: req.body.estatura,
            colorDePiel: req.body.colordepiel,
            colorDeOjos: req.body.colordeojos,
            promedioDeVida: req.body.promediodevida,
            lenguaje: req.body.lenguaje,
            planetanatal: req.body.planetanatal,
            fec_creacion: req.body.fec_creacion,
            fec_modificacion: req.body.fec_modificacion
        });
        console.log("Nueva especie", nuevaEspecie);
        nuevaEspecie.save();
        console.log("Agregado");
        res.status(201).json(nuevaEspecie);
    } catch (errr) {
        res.status(500).json({ mensaje: "Error al agregar la especie", error: error.message })
    }
})

//put especies

app.put('/especies/:id', async (req, res) => {
    try {
        const especieActualizada = await especies.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!especieActualizada) {
            return res.status(404).json({ mensaje: "Especie no encontrada" });
        }
        res.json(especieActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: "error al actualizar la especie", error: error.message })
    }
})

//delete especies

app.delete('/especies/:id', async (req, res) => {
    try {
        const especieEliminada = await especies.findByIdAndDelete(req.params.id);
        if (!especieEliminada) {
            return res.status(404).json({ mensaje: "Especie no encontrada" })
        }
        res.json("Eliminado con exito")
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la especie", error: error.message })
    }
})


//get vehiculos

app.get('/vehiculos', (req, res) => {
    vehiculos
        .find()
        .then(vehiculos => res.send(vehiculos))
})

//get vehiculos por id

app.get('/vehiculos/:id', async (req, res) => {
    try {
        const vehiculo = await vehiculos.findById(req.params.id, camposFuera);
        if (!vehiculo) {
            return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
        }
        res.json(vehiculo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el vehiculo", error: error.message });
    }
})

//post vehiculos

app.post('/vehiculos', (req, res) => {
    try {
        const nuevoVehiculo = new vehiculos({
            nombre: req.body.nombre,
            modelo: req.body.modelo,
            clase: req.body.clase,
            tamano: req.body.tamano,
            numPasajeros: req.body.numPasajeros,
            maxVelocidadAtmosferica: req.body.maxVelocidadAtmosferica,
            capacidadMaxima: req.body.capacidadMaxima,
            tiempoMaxConsusmible: req.body.tiempoMaxConsusmible
        });
        console.log("Nuevo vehiculo", nuevoVehiculo);
        nuevoVehiculo.save();
        console.log("Agregado");
        res.status(201).json(nuevoVehiculo);
    } catch (err) {
        console.log(err)
    }
})


//put vehiculos

app.put('/vehiculos/:id', async (req, res) => {
    try {
        const vehiculoActualizado = await vehiculos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehiculoActualizado) {
            return res.status(404).json({ mensaje: "Vehiculo no encontrado" });
        }
        res.json(vehiculoActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el vehiculo", error: error.message })
    }
})

//delete vehiculos

app.delete('/vehiculos/:id', async (req, res) => {
    try {
        const vehiculoEliminado = await vehiculos.findByIdAndDelete(req.params.id);
        if (!vehiculoEliminado) {
            return res.status(404).json({ mensaje: "Vehiculo no encontrado" })
        }
        res.json("Eliminado con exito")
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el vehiculo", error: error.message })
    }
})
