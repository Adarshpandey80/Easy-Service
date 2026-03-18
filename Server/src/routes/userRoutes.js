const express = require("express");
const router = express.Router();

const { userLogin } = require("../controllars/userController");

// Login Route
router.post("/login", userLogin);

module.exports = router;