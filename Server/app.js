const express = require('express');
const app = express();
const cors = require('cors');
const parser = require('body-parser');
const mongoose = require('mongoose');


app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.set("view engine", "jsx");

app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.get("/signup", (req,res)=>{
    res.render( "UserSignupForm.jsx" );
})
app.get("/login", (req,res)=>{
    res.send("Login Page");
})
app.listen(3004, ( ) => {
    console.log('Server is running on port 3004');
})

