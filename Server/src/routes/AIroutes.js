const express = require("express");
const router = express.Router();

const aiController = require("../controllars/AIController");

// AI Text Request Route
router.post("/request/text", aiController.handleTextRequest);

module.exports = router;