import { randomUUID } from "node:crypto";
import { readJSON } from "../utils.js";

const { peliculas } = readJSON("./peliculas.json");

export class PeliculaModel {
  // GET - Obtener todas las películas
  static async getAll({ clasificacion }) {
    if (clasificacion) {
      return peliculas.filter(
        (pelicula) =>
          pelicula.clasificacion.toLowerCase() === clasificacion.toLowerCase(),
      );
    }

    return peliculas;
  }

  // GET - Obtener película por ID
  static async getById({ id }) {
    const pelicula = peliculas.find(
      (pelicula) => String(pelicula.id) === String(id),
    );

    return pelicula;
  }

  // POST - Crear película
  static async create({ input }) {
    const newPelicula = {
      id: randomUUID(),
      ...input,
    };

    peliculas.push(newPelicula);

    return newPelicula;
  }

  // DELETE - Eliminar película
  static async delete({ id }) {
    const peliculaIndex = peliculas.findIndex(
      (pelicula) => String(pelicula.id) === String(id),
    );

    if (peliculaIndex === -1) {
      return false;
    }

    peliculas.splice(peliculaIndex, 1);

    return true;
  }

  // PUT / PATCH - Actualizar película
  static async update({ id, input }) {
    const peliculaIndex = peliculas.findIndex(
      (pelicula) => String(pelicula.id) === String(id),
    );

    if (peliculaIndex === -1) {
      return false;
    }

    peliculas[peliculaIndex] = {
      ...peliculas[peliculaIndex],
      ...input,
    };

    return peliculas[peliculaIndex];
  }
}
