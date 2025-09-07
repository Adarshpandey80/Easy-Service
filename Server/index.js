if(process.env.NODE_ENV !="production"){
  require('dotenv').config();
}
const mongoose = require("mongoose");
const  connectDB = require("./src/db/db");
const app = require("./src/app");
const PORT = process.env.PORT || 3004;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});
