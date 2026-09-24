const z = require("zod");

const peliculaSchema = z.object({
  nombre: z.string({
    invalid_type_error: "El nombre debe ser una cadena de texto",
    required_error: "El nombre es obligatorio",
  }),
  anio: z
    .number()
    .int()
    .positive()
    .min(1900, {
      message: "El año debe ser mayor o igual a 1900",
    })
    .max(2024, {
      message: "El año debe ser menor o igual a 2024",
    }),
  clasificacion: z.array(z.string()).min(1, {
    message: "La clasificación es obligatoria",
  }),
});
function validatePelicula(object) {
  return peliculaSchema.safeParse(object);
}
