const express = require("express");
const app = express();
const path = require("path");
const productsRouter = require("./routes/products");
const productsApiRouter = require("./routes/api/products");

//Video 2.6 Manejo de archivos estáticos:   (poniendo un prefijo)
app.use("/static", express.static(path.join(__dirname, "public")));

//usando pug como template engine como middleware

//Establecer el directorio de las vistas
app.set("views", path.join(__dirname, "views"));
//Asociar al motor de plantillas los archivos con extensión .pug
app.set("view engine", "pug");

//Para usar routes, se utiliza app.use
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

app.use(express.json());

const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
