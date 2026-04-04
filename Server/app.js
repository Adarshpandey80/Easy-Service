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
const chatRoutes = require("./src/routes/chatRoutes");
const { saveMessage } = require("./src/controllars/chatController");


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
    let { userId, shopId, shopOwnerId, userType } = data;
    let roomId;
    
    // Handle shopowner joining the shop-level room (Messages dashboard)
    if (userType === "shopowner" && !userId) {
      roomId = `shop_${shopId}`;
      socket.join(roomId);
      socket.shopOwnerId = shopOwnerId;
      socket.shopId = shopId;
      socket.userType = userType;
      console.log(`Shop owner joined shop room: ${roomId}`);
    } else {
      // Regular user-shop conversation room
      roomId = `user_${userId}_shop_${shopId}`;
      socket.join(roomId);
      socket.userId = userId;
      socket.shopId = shopId;
      socket.shopOwnerId = shopOwnerId;
      socket.userType = userType;
      console.log(`${userType} joined room: ${roomId} (shopOwnerId: ${shopOwnerId})`);
    }
    
    io.to(roomId).emit("room_joined", { roomId, userType, shopOwnerId });
  });

  // Handle message sending
  socket.on("send_message", async (data) => {
    try {
      const { userId, shopId, message, sender, shopOwnerId } = data;
      const userRoomId = `user_${userId}_shop_${shopId}`;
      const shopRoomId = `shop_${shopId}`;

      // Prepare message data
      const messageData = {
        message,
        sender,
        userId,
        shopId,
        time: new Date().toLocaleTimeString(),
        timestamp: new Date(),
      };

      // Save to database
      if (sender === "user") {
        // User sending message to shopowner
        await saveMessage(userId, "User", shopOwnerId, message, shopId);
        messageData.senderModel = "User";
        messageData.sender = "user";
      } else {
        // ShopOwner sending message to user
        await saveMessage(shopOwnerId, "ShopOwner", userId, message, shopId);
        messageData.senderModel = "ShopOwner";
        messageData.sender = "owner";
      }

      // Emit to user-specific room
      io.to(userRoomId).emit("receive_message", messageData);
      
      // Also emit to shop-level room (for Messages dashboard)
      io.to(shopRoomId).emit("receive_message", messageData);
      
      console.log("Message sent and saved:", userRoomId, "and", shopRoomId);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
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
app.use("/chat", chatRoutes);

// Server Start
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});