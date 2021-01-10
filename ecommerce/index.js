const express = require("express");
const boom = require("@hapi/boom");
const path = require("path");
const helmet = require("helmet");
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const authApiRouter = require("./routes/api/auth");

const {
  logErrors,
  clientErrorHandler,
  errorHandler,
  wrapErrors,
} = require("./utils/middlewares/errorsHandlers");
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");

//App
const app = express();

//Middlewares (Que pasen antes que todo (si así se requiere.))
app.use(helmet());
app.use(express.json()); //Equivalente de body.parse

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
app.use("/api/auth", authApiRouter);

//redirect

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use(function (req, res, next) {
  if (isRequestAjaxOrApi(req)) {
    //Viene un error tipo boom
    const {
      output: { statusCode, payload },
    } = boom.notFound();

    res.status(statusCode).json(payload);
  }

  res.status(404).render("404");
});

// Error Handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, function () {
  console.log(`Listening http://localhost:${server.address().port}`);
});
