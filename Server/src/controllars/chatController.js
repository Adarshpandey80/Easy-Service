const Message = require("../models/message.model");

// Save message to database
const saveMessage = async (sender, senderModel, receiver, text, shopId) => {
  try {
    const message = new Message({
      sender,
      senderModel,
      receiver,
      receiverModel: senderModel === "User" ? "ShopOwner" : "User",
      text,
      shopId,
    });
    return await message.save();
  } catch (error) {
    console.error("Error saving message:", error);
    throw error;
  }
};

// Get chat history between user and shop owner
const getChatHistory = async (req, res) => {
  try {
    const { userId, shopOwnerId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: shopOwnerId },
        { sender: shopOwnerId, receiver: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name profileImage")
      .populate("receiver", "name profileImage");

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat history",
      error: error.message,
    });
  }
};

module.exports = {
  saveMessage,
  getChatHistory,
};
