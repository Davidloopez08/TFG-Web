const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const app = express(); // Inicializa Express
const port = 3001; // Define el puerto donde correrá el servidor

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para procesar datos JSON en el cuerpo de las solicitudes

// Configuración de MongoDB
const mongoUrl = "mongodb://localhost:27017";
const dbName = "CINEPOLIS";

// Función para cargar datos de una colección
async function loadMovies(collectionName) {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Busca el primer documento que contiene el campo `peliculas`
        const data = await collection.findOne({});
        if (!data || !data.peliculas) {
            throw new Error(`La colección '${collectionName}' no contiene un campo 'peliculas'.`);
        }

        return data.peliculas; // Retorna el array de películas o estrenos
    } catch (error) {
        console.error(`Error al cargar los datos de la colección '${collectionName}':`, error);
        throw error;
    } finally {
        await client.close();
    }
}

// Endpoint para obtener películas en cartelera
app.get("/peliculas", async (req, res) => {
    try {
        console.log("Cargando datos de películas...");
        const peliculas = await loadMovies("peliculas");
        res.json(peliculas);
    } catch (error) {
        console.error("Error al cargar las películas:", error.message);
        res.status(500).send("Error al cargar las películas.");
    }
});

// Endpoint para obtener estrenos
app.get("/estrenos", async (req, res) => {
    try {
        console.log("Cargando datos de estrenos...");
        const estrenos = await loadMovies("estrenos");
        res.json(estrenos);
    } catch (error) {
        console.error("Error al cargar los estrenos:", error.message);
        res.status(500).send("Error al cargar los estrenos.");
    }
});

// Endpoint para guardar aportaciones de los usuarios
app.post("/submit-feedback", async (req, res) => {
    const { name, email, category, message } = req.body;

    if (!name || !email || !category || !message) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        const db = client.db(dbName);

        // Crear la colección si no existe
        const collectionName = "aportaciones_del_usuario";
        const collection = db.collection(collectionName);

        // Insertar la aportación
        const feedback = {
            name,
            email,
            category,
            message,
            submittedAt: new Date()
        };

        await collection.insertOne(feedback);
        res.status(200).send("Aportación enviada y guardada con éxito.");
    } catch (error) {
        console.error("Error al guardar la aportación:", error);
        res.status(500).send("Error interno del servidor.");
    } finally {
        await client.close();
    }
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
