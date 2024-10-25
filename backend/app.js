require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/crosOrigin/corsOptions");
const checkDatabaseConnection = require("./config/database/databaseConfig");

const app = express();

//Import Routes
const productionRoute = require("./components/production/production.route");



//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

//Route Middleware
app.use("/production", productionRoute);



app.use((req, res, next) => {
  res.status(404).json({
    error: {
      status: 404,
      message: "Resource not found",
    },
  });
});

module.exports = app;
