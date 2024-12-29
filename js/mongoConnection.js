const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express(); // Inicializa Express
const port = 3001; // Define el puerto donde correrá el servidor

// Middleware para habilitar CORS
app.use(cors());

// Configuración de MongoDB
const mongoUrl = "mongodb://localhost:27017";
const dbName = "CINEPOLIS";

// Función para cargar datos de una colección
async function loadMovies(collectionName) {
    const client = new MongoClient(mongoUrl);
    try {
        await client.connect();
        console.log(`Conectado a MongoDB, cargando colección: ${collectionName}`);
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const data = await collection.findOne({});
        console.log(`Datos cargados de la colección ${collectionName}:`, data);
        return data ? data.peliculas || [] : [];
    } catch (error) {
        console.error("Error al cargar los datos de MongoDB:", error);
        throw error;
    } finally {
        await client.close();
    }
}


// Endpoint para obtener películas en cartelera
app.get("/peliculas", async (req, res) => {
    try {
        const peliculas = await loadMovies("peliculas");
        res.json(peliculas);
    } catch (error) {
        res.status(500).send("Error al cargar las películas.");
    }
});

// Endpoint para obtener estrenos
app.get("/estrenos", async (req, res) => {
    try {
        console.log("Intentando cargar datos de estrenos...");
        const estrenos = await loadMovies("estrenos");
        console.log("Datos obtenidos de MongoDB:", estrenos);
        res.json(estrenos);
    } catch (error) {
        console.error("Error al cargar los estrenos:", error);
        res.status(500).send("Error al cargar los estrenos.");
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
