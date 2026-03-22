
const express = require("express");
const router = express.Router();
const upload = require("../middleweres/upload");

const shopOwnerController = require("../controllars/shopOwnerController");


router.post("/register", upload.array("shopImage" , 5), shopOwnerController.shopOwnerRegister);

router.post("/login", shopOwnerController.shopOwnerLogin);

module.exports = router;