require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const userRoutes = require("./src/routes/userRoutes");
const shopOwnerRoutes = require("./src/routes/shopOwnerRoutes");


// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));



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
app.use("/shopowner" , shopOwnerRoutes);

// Server Start
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});