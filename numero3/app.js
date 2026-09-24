const express = require("express");
const crypto = require("node:crypto");
const { peliculas } = require("./peliculas.json");
const z = require("zod");

const app = express();

app.use(express.json());
app.disable("x-powered-by");

// Schema para validar una película
const peliculaSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }),
  director: z.string({
    required_error: "El director es obligatorio",
    invalid_type_error: "El director debe ser una cadena de texto",
  }),
  clasificacion: z.enum(["Drama", "Comedia", "Documental", "Acción"], {
    required_error: "La clasificación es obligatoria",
  }),
  anio: z
    .number()
    .int()
    .min(1900, {
      message: "El año debe ser mayor o igual a 1900",
    })
    .max(2024, {
      message: "El año debe ser menor o igual a 2024",
    }),
});

function validatePelicula(pelicula) {
  return peliculaSchema.safeParse(pelicula);
}

// GET - Todas las películas
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

// GET - Una película por ID
app.get("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const pelicula = peliculas.find((pelicula) => pelicula.id === id);

  if (pelicula) {
    return res.json(pelicula);
  }

  res.status(404).json({
    error: "Pelicula no encontrada",
  });
});

// POST - Crear película
app.post("/peliculas", (req, res) => {
  const result = validatePelicula(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const newPelicula = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  peliculas.push(newPelicula);

  res.status(201).json(newPelicula);
});

// PUT - Reemplazar película completa
app.put("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Pelicula no encontrada",
    });
  }

  const result = validatePelicula(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  const updatedPelicula = {
    id,
    ...result.data,
  };

  peliculas[peliculaIndex] = updatedPelicula;

  res.json(updatedPelicula);
});

// PATCH - Actualizar parcialmente una película
app.patch("/peliculas/:id", (req, res) => {
  const id = Number(req.params.id);

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Pelicula no encontrada",
    });
  }

  const peliculaActual = peliculas[peliculaIndex];

  const peliculaActualizada = {
    ...peliculaActual,
    ...req.body,
  };

  const result = validatePelicula(peliculaActualizada);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  peliculas[peliculaIndex] = {
    id,
    ...result.data,
  };

  res.json(peliculas[peliculaIndex]);
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
