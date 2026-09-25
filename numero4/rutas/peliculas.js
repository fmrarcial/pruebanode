import { Router } from "express";
import { readJSON } from "../utils.js";

const peliculas = readJSON("./peliculas.json");

export const peliculaRouter = Router();

peliculaRouter.get("/", (req, res) => {
  const { clasificacion } = req.query;
  if (clasificacion) {
    const filteredPeliculas = peliculas.filter((pelicula) =>
      pelicula.clasificacion.some(
        (c) => c.toLowerCase() === clasificacion.toLowerCase(),
      ),
    );
    return res.json(filteredPelicula);
  }
  res.json(peliculas);
});

peliculaRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const pelicula = peliculas.find((pelicula) => pelicula.id === id);
  if (pelicula) return res.json(pelicula);
  res.status(404).json({ message: "pelicula no disponible" });
});

peliculaRouter.delete("/peliculas/:id", (req, res) => {
  const id = req.params.id;

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Película no encontrada",
    });
  }

  peliculas.splice(peliculaIndex, 1);

  res.json({
    message: "Película eliminada correctamente",
  });
});

peliculaRouter.patch("/peliculas/:id", (req, res) => {
  const id = req.params.id;

  const peliculaIndex = peliculas.findIndex((pelicula) => pelicula.id === id);

  if (peliculaIndex === -1) {
    return res.status(404).json({
      error: "Película no encontrada",
    });
  }

  const result = validatePartialPelicula(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.issues,
    });
  }

  peliculas[peliculaIndex] = {
    ...peliculas[peliculaIndex],
    ...result.data,
  };

  res.json(peliculas[peliculaIndex]);
});
