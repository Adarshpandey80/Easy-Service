const express = require("express");
const Routes = express.Router();
const fetchShopsController = require("../controllars/fetchShopsController");

Routes.get("/fetchShops", fetchShopsController.fetchShops);
Routes.get("/shopowner/:id", fetchShopsController.fetchShopById);






module.exports = Routes;