const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const occasionRoutes = require( "./routes/occasionRoutes");
const groupRoutes = require( "./routes/groupRoutes");
const taskRoutes = require( "./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(  "/api/auth",  authRoutes);
app.use( "/api/occasions", occasionRoutes);
app.use( "/api/groups", groupRoutes);
app.use( "/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Occassio API running");
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
  }
};

startServer();