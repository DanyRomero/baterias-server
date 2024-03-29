// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);

//registro de rutas
const brands = require("./routes/brands.routes");
app.use("/marcas", brands);

const batteries = require("./routes/batteries.routes");
app.use("/baterias", batteries);

const models = require("./routes/models.routes");
app.use("/modelos", models);

const orders = require("./routes/orders.routes");
app.use("/ordenes", orders);

const users = require("./routes/users.routes");
app.use("/usuarios", users);

const batteryImports = require("./routes/battery-imports.routes");
app.use("/importar-baterias", batteryImports);

const catalogImports = require("./routes/catalog-imports.routes");
app.use("/importar-catalogo", catalogImports)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
