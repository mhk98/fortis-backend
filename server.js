// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const http = require("http");
// require("./models"); // Your database models (e.g., Sequelize models)
// require("dotenv").config();
// const routes = require('./app/routes'); // Import your routes
// const ApiError = require("./error/ApiError");


// const app = express()

// app.use(cors({ origin: true, credentials: true }));

// // Express built-in middleware for parsing request bodies
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Static image folder
// app.use("/media", express.static("media"));

// // Main route
// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // API routes
// app.use("/api/v1", routes);

// // Catch-all route for handling API not found
// app.use((req, res) => {
//   res.status(404).json({ error: "API not found" });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//       // Optionally include stack trace if it's an internal error
//       ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
//     });
//   }

//   // For unexpected errors, return a generic message
//   console.error(err);
//   return res.status(500).json({
//     status: 'error',
//     message: 'Internal server error',
//   });
// });

// // Server setup
// const port = process.env.PORT || 5000; // Use environment variable if available
// const server = http.createServer(app);

// // Start listening
// server.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });



const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
require("dotenv").config();
require("./models"); // Load Sequelize models
const routes = require('./app/routes'); // Import all route handlers
const ApiError = require("./error/ApiError");

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options('*', cors(corsOptions));


// Express built-in middleware for parsing request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static folder to serve images/media
app.use("/media", express.static("media"));

// Health check or base route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Main API routes
app.use("/api/v1", routes);

// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ error: "API not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  console.error(err); // Log unexpected errors
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// Start HTTP server
const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`✅ Server is listening at http://localhost:${port}`);
});
