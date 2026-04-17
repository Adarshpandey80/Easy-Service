const shopOwnerModel = require("../models/shopOwner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("../../cloudinary");

const shopOwnerRegister = async (req, res) => {
  
  try {
    let { ownerName, email, phone, shopName, address, username, password, services } = req.body;
    const files = req.files;
    
    // Parse services from JSON string if it's a string
    let parsedServices = [];
    if (services) {
      try {
        parsedServices = typeof services === 'string' ? JSON.parse(services) : services;
      } catch (e) {
        return res.status(400).json({ message: "Invalid services format" });
      }
    }
    
    // Upload images to Cloudinary and get URLs
    const imageUrls = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    // Validation
    if (!ownerName || !email || !phone || !shopName || !address || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(parsedServices) || parsedServices.length === 0) {
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
    const cleanedServices = parsedServices.map(({ category, subcategory, price }) => ({
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
      shopImage: imageUrls, 
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



const shopOwnerDashboard = async (req, res) => {
  try {
    const shopOwnerId = req.params.id;
    const shopOwner = await shopOwnerModel.findById(shopOwnerId);
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    // Get orders data
    const Order = require("../models/order.model");
    const Worker = require("../models/worker.model");
    const Payment = require("../models/payment.model");

    const orders = await Order.find({ shopOwner: shopOwnerId }).populate("customer", "name").populate("assignedWorker", "name");
    const workers = await Worker.find({ shopOwner: shopOwnerId });
    const payments = await Payment.find({ shopOwner: shopOwnerId });

    // Calculate KPIs
    const totalWorkers = workers.length;
    const activeOrders = orders.filter(o => o.status === "Pending" || o.status === "Assigned").length;
    const completedOrders = orders.filter(o => o.status === "Completed").length;
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const pendingPayments = payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0);

    // Get worker status breakdown
    const workerStatus = {
      available: workers.filter(w => w.status === "Active").length,
      busy: orders.filter(o => o.status === "Assigned").length,
      offline: workers.filter(w => w.status === "Inactive").length,
    };

    // Get recent orders (last 5)
    const recentOrders = orders.slice(-5).reverse();

    // Get last 6 months of revenue data
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyRevenue = {};
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString('default', { month: 'short' });
      monthlyRevenue[month] = 0;
    }

    payments.forEach(payment => {
      if (payment.date >= sixMonthsAgo) {
        const month = new Date(payment.date).toLocaleString('default', { month: 'short' });
        monthlyRevenue[month] += payment.amount;
      }
    });

    const revenueData = Object.entries(monthlyRevenue).reverse().map(([month, revenue]) => ({ month, revenue }));

    res.status(200).json({
      shopOwner,
      kpis: {
        totalWorkers,
        activeOrders,
        completedOrders,
        totalRevenue,
        pendingPayments,
      },
      workerStatus,
      recentOrders,
      revenueData,
      orders: orders.map(o => ({
        id: o._id,
        customerName: o.customerName,
        service: o.service,
        status: o.status,
        date: o.date,
        workerName: o.assignedWorker?.name || "Not Assigned",
      })),
    });
  } catch (error) {
    console.error("Error fetching shop owner:", error);
    res.status(500).json({ message: "Server error fetching shop owner", error: error.message });
  }
};

const getShopOwnerServices = async (req, res) => {
  try {
    const shopOwnerId = req.params.id;
    const shopOwner = await shopOwnerModel.findById(shopOwnerId);
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }
    const services = shopOwner.services.map((service, index) => ({
      id: index,
      category: service.category,
      subcategory: service.subcategory,
      price: service.price,
      status: service.status || "Active",
     
    }));

    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error fetching services", error: error.message });
  }
};

const createShopOwnerService = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subcategory, price, status} = req.body;

    if (!category || !subcategory || price === undefined) {
      return res.status(400).json({ message: "Category, subcategory, and price are required" });
    }

    const shopOwner = await shopOwnerModel.findById(id);
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    shopOwner.services.push({
      category,
      subcategory,
      price: Number(price),
      status: status || "Active",
   
    });

    await shopOwner.save();

    const createdService = shopOwner.services[shopOwner.services.length - 1];

    return res.status(201).json({
      message: "Service created successfully",
      service: {
        id: shopOwner.services.length - 1,
        category: createdService.category,
        subcategory: createdService.subcategory,
        price: createdService.price,
        status: createdService.status || "Active",
        icon: createdService.icon || "",
      },
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error creating service", error: error.message });
  }
};

const updateShopOwnerService = async (req, res) => {
  try {
    const { id, serviceIndex } = req.params;
    const { category, subcategory, price, status, icon } = req.body;

    const shopOwner = await shopOwnerModel.findById(id);
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    const index = Number(serviceIndex);
    if (Number.isNaN(index) || index < 0 || index >= shopOwner.services.length) {
      return res.status(404).json({ message: "Service not found" });
    }

    const service = shopOwner.services[index];

    if (category !== undefined) service.category = category;
    if (subcategory !== undefined) service.subcategory = subcategory;
    if (price !== undefined) service.price = Number(price);
    if (status !== undefined) service.status = status;
    if (icon !== undefined) service.icon = icon;

    await shopOwner.save();

    return res.status(200).json({
      message: "Service updated successfully",
      service: {
        id: index,
        category: service.category,
        subcategory: service.subcategory,
        price: service.price,
        status: service.status || "Active",
        icon: service.icon || "",
      },
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error updating service", error: error.message });
  }
};

const deleteShopOwnerService = async (req, res) => {
  try {
    const { id, serviceIndex } = req.params;

    const shopOwner = await shopOwnerModel.findById(id);
    if (!shopOwner) {
      return res.status(404).json({ message: "Shop owner not found" });
    }

    const index = Number(serviceIndex);
    if (Number.isNaN(index) || index < 0 || index >= shopOwner.services.length) {
      return res.status(404).json({ message: "Service not found" });
    }

    shopOwner.services.splice(index, 1);
    await shopOwner.save();

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error deleting service", error: error.message });
  }
};


const addWorker = async (req, res) => {
  try {
    const { name, phone, skill, experience, availability } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token missing" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (tokenError) {
      return res.status(401).json({ message: "Unauthorized: invalid token" });
    }

    const shopOwnerId = decoded.id;
    const idProofFile = req.files?.idProof ? req.files.idProof[0] : null;
    const photoFile = req.files?.photo ? req.files.photo[0] : null;

    if (!name || !phone || !skill || !experience || !availability) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!idProofFile || !photoFile) {
      return res.status(400).json({ message: "ID Proof and Photo are required" });
    }

    // Files are already uploaded by multer-cloudinary storage.
    const idProofUrl = idProofFile.path || "";
    const photoUrl = photoFile.path || "";

    const Worker = require("../models/worker.model");
    const newWorker = new Worker({
      name: name.trim(),
      phone: phone.trim(),
      skill: skill.trim(),
      experience: Number(experience),
      availability,
      idProof: idProofUrl,
      photo: photoUrl,
      shopOwner: shopOwnerId,
    });

    await newWorker.save();
    res.status(201).json({ message: "Worker added successfully", workerId: newWorker._id });
  } catch (error) {
    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Server error adding worker", error: error.message });
  }
};


const fetchWorkers = async (req, res) => {
  try {
     const worker = require("../models/worker.model");
     const allWorkers = await worker.find();
     res.status(200).json(allWorkers);
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ message: "Server error fetching workers", error: error.message });
  }
}

module.exports = {
  shopOwnerRegister,
  shopOwnerLogin,
  shopOwnerDashboard,
  getShopOwnerServices,
  createShopOwnerService,
  updateShopOwnerService,
  deleteShopOwnerService,
  addWorker,
  fetchWorkers

};