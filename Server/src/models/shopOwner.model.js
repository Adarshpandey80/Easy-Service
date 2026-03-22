const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["Electronics Services", "Carpentry", "Cleaning Services", "Painting"]
  },
  subcategory: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const shopOwnerSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    services: {
      type: [serviceSchema],
      required: true,
      validate: {
        validator: (v) => v.length >= 1,
        message: "At least one service is required",
      },
    },
    address: {
      type: String,
      required: true,
    },
    businessId: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "shopOwner",
      enum: ["shopOwner"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    completedOrders: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    shopImage: {
      type: String,
      default: "",
    },
    lastLogin: {
      type: Date,
    },
    settings: {
      emailAlerts: { type: Boolean, default: true },
      smsAlerts: { type: Boolean, default: false },
      theme: { type: String, enum: ["Light", "Dark"], default: "Light" },
      twoFactorAuth: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShopOwner", shopOwnerSchema);
