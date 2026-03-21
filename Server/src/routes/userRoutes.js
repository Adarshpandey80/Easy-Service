const express = require("express");
const router = express.Router();

const userController = require("../controllars/userController");

// Login Route
router.post("/signup" , userController.userSignup); 
router.post("/login", userController.userLogin);

module.exports = router;