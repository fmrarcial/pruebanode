import { PeliculaModel } from "../modelos/basededato/peliculas.js";
import {
  validatePelicula,
  validatePartialPelicula,
} from "../shemas/peliculas.js";

export class PeliculaController {
  static async getAll(req, res) {
    const { clasificacion } = req.query;

    const peliculas = await PeliculaModel.getAll({
      clasificacion,
    });

    res.json(peliculas);
  }

  static async getById(req, res) {
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
  }

  static async create(req, res) {
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
  }

  static async delete(req, res) {
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
  }

  static async update(req, res) {
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
  }
}
