import { randomUUID } from "node:crypto";
import { readJSON } from "../utils.js";

const { peliculas } = readJSON("./peliculas.json");

export class PeliculaModel {
  static async getAll({ clasificacion }) {
    if (clasificacion) {
      return peliculas.filter(
        (pelicula) =>
          pelicula.clasificacion.toLowerCase() === clasificacion.toLowerCase(),
      );
    }

    return peliculas;
  }

  static async getById({ id }) {
    const pelicula = peliculas.find(
      (pelicula) => String(pelicula.id) === String(id),
    );

    return pelicula;
  }

  static async create({ input }) {
    const newPelicula = {
      id: randomUUID(),
      ...input,
    };

    peliculas.push(newPelicula);

    return newPelicula;
  }

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
