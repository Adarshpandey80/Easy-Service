const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const userRoutes = require("./src/routes/userRoutes");


require("dotenv").config();
// Middleware
const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB Error ❌", error);
    process.exit(1);
  }
}; 

connectDB().then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Routes
app.use("/user", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// Server Start
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});