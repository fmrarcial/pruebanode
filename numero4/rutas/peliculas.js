import { Router } from "express";
import { PeliculaController } from "../controladores/pelicula.js";

export const peliculaRouter = Router();

// GET /peliculas
peliculaRouter.get("/", PeliculaController.getAll);

// POST /peliculas
peliculaRouter.post("/", PeliculaController.create);

// GET /peliculas/:id
peliculaRouter.get("/:id", PeliculaController.getById);

// PUT /peliculas/:id
peliculaRouter.put("/:id", PeliculaController.update);

// PATCH /peliculas/:id
peliculaRouter.patch("/:id", PeliculaController.update);

// DELETE /peliculas/:id
peliculaRouter.delete("/:id", PeliculaController.delete);
