const express = require("express");
const { getChatHistory } = require("../controllars/chatController");

const router = express.Router();

// Get chat history between user and shop owner
router.get("/history/:userId/:shopOwnerId", getChatHistory);

module.exports = router;
