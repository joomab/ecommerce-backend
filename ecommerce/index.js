const express = require("express");
const path = require("path");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");

const {
  logErrors,
  clientErrorHandler,
  errorHandler,
} = require("./utils/middlewares/errorsHandlers");

//App
const app = express();

//Middlewares (Que pasen antes que todo (si así se requiere.))
app.use(express.json());

// Static files
//Video 2.6 Manejo de archivos estáticos:   (poniendo un prefijo)
app.use("/static", express.static(path.join(__dirname, "public")));

// View engine setup
//usando pug como template engine como middleware
//Establecer el directorio de las vistas
app.set("views", path.join(__dirname, "views"));
//Asociar al motor de plantillas los archivos con extensión .pug
app.set("view engine", "pug");

// Routes
//Para usar routes, se utiliza app.use
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

//redirect

app.get("/", (req, res) => {
  res.redirect("/products");
});

// Error Handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
