const express = require("express");
const bodyParser = require("body-parser");
const recipeRoutes = require("./routes/recipeRoutes");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const cors = require("cors");
const logger = require("./utils/logger");
const env = require("./config/env");

const app = express();
// Load environment variables
require("dotenv").config();
// Middleware setup
app.use(
  cors({
    origin: "http://localhost:8080", // Only allow this origin
    credentials: true, // If you need cookies or auth headers
  })
);
app.use(bodyParser.json());
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/recipes", recipeRoutes());

// Error handling middleware
app.use(errorHandler);

module.exports = app;
