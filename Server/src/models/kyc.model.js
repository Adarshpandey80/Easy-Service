const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  fileType: {
    type: String,
    enum: ["pdf", "jpg", "jpeg", "png"],
    required: true,
  }
}, { _id: false });

const kycSchema = new mongoose.Schema(
  {
    shopOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShopOwner",
      required: true,
      unique: true,
    },
    // Document Fields
    businessRegistration: {
      type: documentSchema,
      default: null,
    },
    gstCertificate: {
      type: documentSchema,
      default: null,
    },
    panCard: {
      type: documentSchema,
      default: null,
    },
    aadharCard: {
      type: documentSchema,
      default: null,
    },
    bankStatement: {
      type: documentSchema,
      default: null,
    },
    shopPhoto: {
      type: documentSchema,
      default: null,
    },
    addressProof: {
      type: documentSchema,
      default: null,
    },
    
    // Verification Status
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    
    // Additional Information
    rejectionReason: {
      type: String,
      default: null,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    verificationComments: {
      type: String,
      default: null,
    },
    submissionDate: {
      type: Date,
      default: null,
    },
    verificationDate: {
      type: Date,
      default: null,
    },
    resubmissionCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Index for faster queries
kycSchema.index({ status: 1 });
kycSchema.index({ isVerified: 1 });

// Middleware to set submission date when all documents are uploaded
kycSchema.pre("save", function (next) {
  const allDocumentsUploaded = [
    this.businessRegistration,
    this.gstCertificate,
    this.panCard,
    this.aadharCard,
    this.bankStatement,
    this.shopPhoto,
    this.addressProof,
  ].every(doc => doc !== null);

  if (allDocumentsUploaded && !this.submissionDate) {
    this.submissionDate = new Date();
  }

  next();
});

module.exports = mongoose.model("KYC", kycSchema);
