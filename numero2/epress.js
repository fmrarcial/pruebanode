const ditto = require("./pokemon/ditto.json");
const express = require("express");
const app = express();
app.disable("x-powered-by");

app.use(express.json());

//app.use((req, res, next) => {
//if (req.method !== "POST") return next();
//if (req.headers["content-type"] !== "application/json") return next();
//let body = "";
//req.on("data", (chunk) => {
//body += chunk.toString();
//});
//req.on("end", () => {
//const data = JSON.parse(body);
//data.timestamp = Date.now();
//mutar el request y meter la informacion ene el body
//req.body = data;
//next();
//});
//});

const PORT = process.env.PORT || 1234;

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res
    .status(404)
    .send("<h1>404 Not Found</h1><p>La página que buscas no existe.</p>");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
