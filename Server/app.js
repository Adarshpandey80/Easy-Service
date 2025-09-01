const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


app.use(cors());
app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.get("/about", (req,res)=>{
    res.send("About Page");
})

app.listen(3004, ( ) => {
    console.log('Server is running on port 3004');
})

