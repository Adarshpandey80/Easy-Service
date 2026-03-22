
const express = require("express");
const router = express.Router();

const shopOwnerController = require("../controllars/shopOwnerController");

// Shop Owner Registration
router.post("/register", shopOwnerController.shopOwnerRegister);

// Shop Owner Login
router.post("/login", shopOwnerController.shopOwnerLogin);

module.exports = router;