const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const router = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const authenticate = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const { NotFoundError } = require("./utils/customErrors");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(logger);
app.use(express.json());
app.use(bodyParser.json());

// Root route
app.use("/api", authenticate, router);
app.get("/", (req, res) => {
  res.send("Hello World.");
});

// handle 404 for unknown routes
app.use((req, res, next) => {
  next(new NotFoundError("Route not found."));
});

// global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
