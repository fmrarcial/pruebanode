import express, { json } from "express";

import { peliculaRouter } from "./rutas/peliculas.js";
import { corsMiddleware } from "./midlware/cors.js";

//import {
//validatePelicula,
//validatePartialPelicula,
//} from "./shemas/peliculas.js";

//import { readJSON } from "./utils.js";

//const peliculas = readJSON("./peliculas.json");

//import fs from "node:fs";

//const peliculas = JSON.parse(fs.readFileSync("./peliculas.json", "utf-8"));
//import movies from './peliculas.json' with {type:'json'}

const app = express();

// ==========================================
// CONFIGURACIÓN
// ==========================================
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

// ==========================================
// CORS
// ==========================================

//const ACEPTED_ORIGINS = [
//"http://localhost:8080",
//"http://localhost:1234",
//"http://localhost:3000",
//"http://peliculas.com",
//];

// ==========================================
// GET - TODAS LAS PELÍCULAS
// ==========================================

//app.get("/peliculas", todo);
//(req, res) => {
//const { clasificacion } = req.query;

//if (clasificacion !== undefined) {
//if (typeof clasificacion !== "string") {
//return res.status(400).json({
//error: "La clasificación debe ser un texto",
//});
//}

//const peliculasFiltradas = peliculas.filter(
//(pelicula) =>
//pelicula.clasificacion.toLowerCase() === clasificacion.toLowerCase(),
//);

//return res.json(peliculasFiltradas);
//}

//res.json(peliculas);
//});

// ==========================================
// GET - PELÍCULA POR ID
// ==========================================

//app.get("/peliculas/:id", todo);
// (req, res) => {
//const id = req.params.id;

//const pelicula = peliculas.find((pelicula) => pelicula.id === id);

//if (!pelicula) {
//return res.status(404).json({
//error: "Película no encontrada",
//});
//}

//res.json(pelicula);
//});

// ==========================================
// POST - CREAR PELÍCULA
// ==========================================

//app.post("/peliculas", todo);
// (req, res) => {
//const result = validatePelicula(req.body);

//if (!result.success) {
//return res.status(400).json({
//error: result.error.issues,
//});
//}

//const nuevaPelicula = {
//id: randomUUID(),
//...result.data,
//};

//peliculas.push(nuevaPelicula);

//res.status(201).json(nuevaPelicula);
//});

// ==========================================
// DELETE - ELIMINAR PELÍCULA
// ==========================================

//app.delete("/peliculas/:id", id);
// (req, res) => {
//const id = req.params.id;

//const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

//if (peliculaIndex === -1) {
//return res.status(404).json({
//error: "Película no encontrada",
//});
//}

//peliculas.splice(peliculaIndex, 1);

//res.json({
//message: "Película eliminada correctamente",
//});
//});

// ==========================================
// PUT - REEMPLAZAR PELÍCULA
// ==========================================

//app.put("/peliculas/:id", todo);
// (req, res) => {
//const id = req.params.id;

//const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

//if (peliculaIndex === -1) {
//return res.status(404).json({
//error: "Película no encontrada",
//});
//}

//const result = validatePelicula(req.body);

//if (!result.success) {
//return res.status(400).json({
//error: result.error.issues,
//});
//}

//const peliculaActualizada = {
//id,
//...result.data,
//};

//peliculas[peliculaIndex] = peliculaActualizada;

//res.json(peliculaActualizada);
//});

// ==========================================
// PATCH - ACTUALIZAR PARCIALMENTE
// ==========================================

//app.patch("/peliculas/:id", todo);
// (req, res) => {
//const id = req.params.id;

//const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

//if (peliculaIndex === -1) {
//return res.status(404).json({
//error: "Película no encontrada",
//});
//}

//const result = validatePartialPelicula(req.body);

//if (!result.success) {
//return res.status(400).json({
//error: result.error.issues,
//});
//}

//peliculas[peliculaIndex] = {
//...peliculas[peliculaIndex],
//...result.data,
//};

//res.json(peliculas[peliculaIndex]);
//});

// ==========================================
// RUTA PRINCIPAL
// ==========================================

//app.get("/", (_req, res) => {
//res.send("API de películas funcionando correctamente");
//});

// ==========================================
// RUTA NO ENCONTRADA
// ==========================================

//app.use((_req, res) => {
//res.status(404).json({
//error: "Ruta no encontrada",
//});
//});

// ==========================================
// SERVIDOR
// ==========================================

app.use("/peliculas", peliculaRouter);
const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
