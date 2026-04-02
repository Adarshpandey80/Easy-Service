require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {createServer} = require("http");
const {Server} = require("socket.io");



const userRoutes = require("./src/routes/userRoutes");
const shopOwnerRoutes = require("./src/routes/shopOwnerRoutes");
const kycRoutes = require("./src/routes/kycRoutes");
const fetchShopsRoutes = require("./src/routes/fetchShopsRoute");


// Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join room for user-shopowner conversation
  socket.on("join_room", (data) => {
    const { userId, shopId, shopOwnerId, userType } = data;
    const roomId = userType === "user" 
      ? `user_${userId}_shop_${shopId}` 
      : `owner_${shopOwnerId}_shop_${shopId}`;
    
    socket.join(roomId);
    console.log(`${userType} joined room: ${roomId}`);
  });

  // Handle message sending
  socket.on("send_message", (data) => {
    const { userId, shopId, shopOwnerId } = data;
    
    if (data.sender === "user") {
      // User sending message to shopowner
      const roomId = `owner_${shopId}_shop_${shopId}`;
      io.to(roomId).emit("receive_message", data);
      console.log("Message sent from user to owner room:", roomId);
    } else if (data.sender === "owner") {
      // Shopowner sending message to user
      const roomId = `user_${data.userId}_shop_${shopId}`;
      io.to(roomId).emit("receive_message", data);
      console.log("Message sent from owner to user room:", roomId);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


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
app.use("/kyc", kycRoutes);
app.use("/shops" , fetchShopsRoutes);

// Server Start
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});