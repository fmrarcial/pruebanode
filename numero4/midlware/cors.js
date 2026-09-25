import cors from "cors";

const ACEPTED_ORIGINS = [
  "http://localhost:8080",
  "http://localhost:1234",
  "http://localhost:3000",
  "http://peliculas.com",
];

export const corsMiddleware = ({ acceptedOrigins = ACEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("no existe el cross"));
    },
  });
