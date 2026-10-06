import { PeliculaModel } from "../modelos/pelicula.js";
import {
  validatePelicula,
  validatePartialPelicula,
} from "../shemas/peliculas.js";

export class PeliculaController {
  // GET /peliculas
  static async getAll(req, res) {
    try {
      const { clasificacion } = req.query;

      const peliculas = await PeliculaModel.getAll({
        clasificacion,
      });

      return res.json(peliculas);
    } catch (error) {
      console.error("Error al obtener las películas:", error);

      return res.status(500).json({
        error: "Error al obtener las películas",
        detalle: error.message,
      });
    }
  }

  // GET /peliculas/:id
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const pelicula = await PeliculaModel.getById({
        id,
      });

      if (pelicula) {
        return res.json(pelicula);
      }

      return res.status(404).json({
        message: "Pelicula not found",
      });
    } catch (error) {
      console.error("Error al obtener la película:", error);

      return res.status(500).json({
        error: "Error al obtener la película",
        detalle: error.message,
      });
    }
  }

  // POST /peliculas
  static async create(req, res) {
    try {
      const result = validatePelicula(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: result.error.issues,
        });
      }

      const newPelicula = await PeliculaModel.create({
        input: result.data,
      });

      return res.status(201).json(newPelicula);
    } catch (error) {
      console.error("Error al crear la película:", error);

      return res.status(500).json({
        error: "Error al crear la película",
        detalle: error.message,
      });
    }
  }

  // DELETE /peliculas/:id
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const result = await PeliculaModel.delete({
        id,
      });

      if (result === false) {
        return res.status(404).json({
          message: "Pelicula no encontrada",
        });
      }

      return res.json({
        message: "Pelicula eliminada",
      });
    } catch (error) {
      console.error("Error al eliminar la película:", error);

      return res.status(500).json({
        error: "Error al eliminar la película",
        detalle: error.message,
      });
    }
  }

  // PUT / PATCH /peliculas/:id
  static async update(req, res) {
    try {
      const { id } = req.params;

      const result = validatePartialPelicula(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: result.error.issues,
        });
      }

      const updatedPelicula = await PeliculaModel.update({
        id,
        input: result.data,
      });

      if (!updatedPelicula) {
        return res.status(404).json({
          message: "Pelicula no encontrada",
        });
      }

      return res.json(updatedPelicula);
    } catch (error) {
      console.error("Error al actualizar la película:", error);

      return res.status(500).json({
        error: "Error al actualizar la película",
        detalle: error.message,
      });
    }
  }
}
