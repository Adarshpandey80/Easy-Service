const express = require("express");
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const connectDB = require("./db/db");
const userRoutes = require("./routes/userRoutes");



app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "jsx");

connectDB();

app.use("/user" , userRoutes);



module.exports = app;