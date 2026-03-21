
const userModel = require("../models/user.model" );
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSignup = async (req, res) => {
    try {
        const { username, email, phone, password, role } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            phone,
            password: hashedPassword,
            role
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


const userLogin = async (req, res) => {
    
    try {
        const { email, password, role } = req.body;
        const user = await userModel.findOne({ email, role });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role } ,
           process.env.JWT_SECRET, 
          { expiresIn: "3d" });
        res.json({ message: "Login successful", token }); 
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
  userSignup,
  userLogin,
};