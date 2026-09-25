const express = require("express");
const fs = require("node:fs");
const path = require("node:path");
const z = require("zod");
const cors = require("cors");

const app = express();

app.use(express.json());
app.disable("x-powered-by");

// ==========================================
// CORS
// ==========================================

const ACEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:3000",
  "http://peliculas.com",
];

app.use(
  cors({
    origin: ACEPTED_ORIGINS,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);

// ==========================================
// ARCHIVO JSON
// ==========================================

const peliculasPath = path.join(__dirname, "peliculas.json");

const data = require("./peliculas.json");

const peliculas = data.peliculas;

// ==========================================
// GUARDAR PELÍCULAS
// ==========================================

function guardarPeliculas() {
  fs.writeFileSync(peliculasPath, JSON.stringify(data, null, 2));
}

// ==========================================
// SCHEMA
// ==========================================

const peliculaSchema = z.object({
  nombre: z.string(),

  director: z.string(),

  clasificacion: z.enum(["Drama", "Comedia", "Documental", "Acción"]),

  anio: z.number().int().min(1900).max(2024),

  duracion: z.number().int().positive(),

  imagen: z.string(),
});

function validatePelicula(pelicula) {
  return peliculaSchema.safeParse(pelicula);
}

// ==========================================
// GET - Todas las películas
// ==========================================

app.get("/peliculas", (req, res) => {
  const { clasificacion } = req.query;

  if (clasificacion) {
    const peliculasFiltradas = peliculas.filter(
      (pelicula) =>
        pelicula.clasificacion.toLowerCase() === clasificacion.toLowerCase(),
    );

    return res.json(peliculasFiltradas);
  }

  res.json(peliculas);
});

// ==========================================
// GET - Película por ID
// ==========================================

app.get("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const pelicula = peliculas.find((pelicula) => pelicula.id === id);

  if (!pelicula) {
    return res.status(404).json({
      error: "Película no encontrada",
    });
  }

  res.json(pelicula);
});

// ==========================================
// POST - Crear película
// ==========================================

app.post("/peliculas", (req, res) => {
  const result = validatePelicula(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const newId =
    peliculas.length > 0
      ? Math.max(...peliculas.map((pelicula) => pelicula.id)) + 1
      : 1;

  const nuevaPelicula = {
    id: newId,
    ...result.data,
  };

  peliculas.push(nuevaPelicula);

  guardarPeliculas();

  res.status(201).json(nuevaPelicula);
});

// ==========================================
// DELETE - Eliminar película
// ==========================================

app.delete("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      message: "Película no encontrada",
    });
  }

  peliculas.splice(peliculaIndex, 1);

  guardarPeliculas();

  res.json({
    message: "Película eliminada",
  });
});

// ==========================================
// PUT - Reemplazar película
// ==========================================

app.put("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Película no encontrada",
    });
  }

  const result = validatePelicula(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const peliculaActualizada = {
    id: id,
    ...result.data,
  };

  peliculas[peliculaIndex] = peliculaActualizada;

  guardarPeliculas();

  res.json(peliculaActualizada);
});

// ==========================================
// PATCH - Actualizar parcialmente
// ==========================================

app.patch("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Película no encontrada",
    });
  }

  const peliculaActualizada = {
    ...peliculas[peliculaIndex],
    ...req.body,
  };

  const result = validatePelicula(peliculaActualizada);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  peliculas[peliculaIndex] = {
    id: id,
    ...result.data,
  };

  guardarPeliculas();

  res.json(peliculas[peliculaIndex]);
});

// ==========================================
// RUTA PRINCIPAL
// ==========================================

app.get("/", (req, res) => {
  res.send("API de películas funcionando correctamente");
});

// ==========================================
// SERVIDOR
// ==========================================

const PORT = 1234;

app.listen(PORT, function () {
  console.log("Servidor escuchando en http://localhost:1234");
});
