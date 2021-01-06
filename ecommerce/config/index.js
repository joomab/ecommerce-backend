//Recoge la info que esta en el archivo .env y ponerlas en las variables de entorno del SO.
require("dotenv").config();

const config = {
  dev:
    typeof process.env.NODE_ENV === "undefined" ||
    process.env.NODE_ENV.trim() !== "production",
  port: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
};

module.exports = { config };
