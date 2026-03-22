const shopOwnerModel = require("../models/shopOwner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const shopOwnerRegister = async (req, res) => {
  try {
    const { ownerName, email, phone, shopName, address, username, password, services } = req.body;

    // Validation
    if (!ownerName || !email || !phone || !shopName || !address || !username || !password || !services) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: "At least one service must be provided" });
    }

    // Check if email already exists
    const existingEmail = await shopOwnerModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check if username already exists
    const existingUsername = await shopOwnerModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if phone already exists
    const existingPhone = await shopOwnerModel.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone number already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Filter services to remove the id field (client-side only)
    const cleanedServices = services.map(({ category, subcategory, price }) => ({
      category,
      subcategory,
      price: Number(price)
    }));

    // Create new shop owner
    const newShopOwner = new shopOwnerModel({
      ownerName,
      email,
      phone,
      shopName,
      address,
      username,
      password: hashedPassword,
      services: cleanedServices
    });

    await newShopOwner.save();
    res.status(201).json({ 
      message: "Shop registered successfully",
      shopOwnerId: newShopOwner._id 
    });
  } catch (error) {
    console.error("Shop owner registration error:", error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

const shopOwnerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const shopOwner = await shopOwnerModel.findOne({ email });
    if (!shopOwner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, shopOwner.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: shopOwner._id, email: shopOwner.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ 
      message: "Login successful", 
      token,
      shopOwner: {
        id: shopOwner._id,
        username: shopOwner.username,
        shopName: shopOwner.shopName,
        email: shopOwner.email
      }
    });
  } catch (error) {
    console.error("Shop owner login error:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

module.exports = {
  shopOwnerRegister,
  shopOwnerLogin
};