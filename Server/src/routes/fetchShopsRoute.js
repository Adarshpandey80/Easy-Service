const express = require("express");
const fetchShopsRoutes = express.Router();
const fetchShopsController = require("../controllars/fetchShopsController");

fetchShopsRoutes.get("/fetchShops", fetchShopsController.fetchShops);







module.exports = fetchShopsRoutes;