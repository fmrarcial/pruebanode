import { object, string, number } from "zod";

// ==========================================
// SCHEMA DE PELÍCULA
// ==========================================

const peliculaSchema = object({
  nombre: string().min(1, {
    message: "El nombre es obligatorio",
  }),

  director: string().min(1, {
    message: "El director es obligatorio",
  }),

  clasificacion: string().min(1, {
    message: "La clasificación es obligatoria",
  }),

  anio: number()
    .int()
    .positive()
    .min(1900, {
      message: "El año debe ser mayor o igual a 1900",
    })
    .max(new Date().getFullYear(), {
      message: "El año no puede ser mayor al año actual",
    }),

  duracion: number().int().positive().min(1, {
    message: "La duración debe ser mayor a 0",
  }),

  imagen: string().min(1, {
    message: "La imagen es obligatoria",
  }),
});

// ==========================================
// VALIDAR PELÍCULA COMPLETA
// ==========================================

function validatePelicula(object) {
  return peliculaSchema.safeParse(object);
}

// ==========================================
// VALIDAR ACTUALIZACIÓN PARCIAL
// ==========================================

function validatePartialPelicula(object) {
  return peliculaSchema.partial().safeParse(object);
}

export { validatePelicula, validatePartialPelicula };
