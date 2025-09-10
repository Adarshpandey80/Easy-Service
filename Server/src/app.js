const express = require("express");
const app = express();
const cors = require("cors");
const parser = require("body-parser");


app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "jsx");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/signup", (req, res) => {
    res.render("UserSignupForm.jsx");
});
app.get("/login", (req, res) => {
    res.render("UserLoginForm.jsx");
});

app.get ("/shopkeeperForm", (req, res) => {
    res.render("ShopkeeperForm.jsx");
});



module.exports = app;