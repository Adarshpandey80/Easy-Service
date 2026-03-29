const KYC = require("../models/kyc.model");
const ShopOwner = require("../models/shopOwner.model");

// Get or Initialize KYC Record
exports.getKYCStatus = async (req, res) => {
  try {
    const shopOwnerId = req.user.id; // Assuming user ID is set from auth middleware

    let kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      // Create new KYC record if doesn't exist
      kyc = await KYC.create({ shopOwnerId });
    }

    res.status(200).json({
      success: true,
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching KYC status",
      error: error.message,
    });
  }
};

// Upload KYC Document
exports.uploadDocument = async (req, res) => {
  try {
    const shopOwnerId = req.user.id;
    const { documentType } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const validDocumentTypes = [
      "businessRegistration",
      "gstCertificate",
      "panCard",
      "aadharCard",
      "bankStatement",
      "shopPhoto",
      "addressProof",
    ];

    if (!validDocumentTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type",
      });
    }

    let kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      kyc = await KYC.create({ shopOwnerId });
    }

    // Update document
    kyc[documentType] = {
      fileName: file.filename,
      fileUrl: file.path,
      fileSize: file.size,
      fileType: file.mimetype.split("/")[1],
    };

    await kyc.save();

    res.status(200).json({
      success: true,
      message: "Document uploaded successfully",
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading document",
      error: error.message,
    });
  }
};

// Remove Document
exports.removeDocument = async (req, res) => {
  try {
    const shopOwnerId = req.user.id;
    const { documentType } = req.body;

    const validDocumentTypes = [
      "businessRegistration",
      "gstCertificate",
      "panCard",
      "aadharCard",
      "bankStatement",
      "shopPhoto",
      "addressProof",
    ];

    if (!validDocumentTypes.includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid document type",
      });
    }

    const kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    kyc[documentType] = null;
    await kyc.save();

    res.status(200).json({
      success: true,
      message: "Document removed successfully",
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing document",
      error: error.message,
    });
  }
};

// Submit KYC for Verification
exports.submitKYC = async (req, res) => {
  try {
    const shopOwnerId = req.user.id;

    const kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    // Check if all documents are uploaded
    const allDocumentsUploaded = [
      kyc.businessRegistration,
      kyc.gstCertificate,
      kyc.panCard,
      kyc.aadharCard,
      kyc.bankStatement,
      kyc.shopPhoto,
      kyc.addressProof,
    ].every(doc => doc !== null);

    if (!allDocumentsUploaded) {
      return res.status(400).json({
        success: false,
        message: "Please upload all required documents",
      });
    }

    kyc.status = "pending";
    kyc.submissionDate = new Date();
    kyc.resubmissionCount += 1;

    await kyc.save();

    res.status(200).json({
      success: true,
      message: "KYC submitted successfully for verification",
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting KYC",
      error: error.message,
    });
  }
};

// Admin: Approve KYC
exports.approveKYC = async (req, res) => {
  try {
    const { shopOwnerId } = req.params;
    const { comments } = req.body;
    const adminId = req.user.id; // Assuming admin is authenticated

    const kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    kyc.status = "approved";
    kyc.isVerified = true;
    kyc.verifiedBy = adminId;
    kyc.verificationComments = comments || "Document verified and approved";
    kyc.verificationDate = new Date();
    kyc.rejectionReason = null;

    await kyc.save();

    res.status(200).json({
      success: true,
      message: "KYC approved successfully",
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error approving KYC",
      error: error.message,
    });
  }
};

// Admin: Reject KYC
exports.rejectKYC = async (req, res) => {
  try {
    const { shopOwnerId } = req.params;
    const { rejectionReason } = req.body;
    const adminId = req.user.id;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const kyc = await KYC.findOne({ shopOwnerId });

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    kyc.status = "rejected";
    kyc.isVerified = false;
    kyc.verifiedBy = adminId;
    kyc.rejectionReason = rejectionReason;
    kyc.verificationDate = new Date();

    await kyc.save();

    res.status(200).json({
      success: true,
      message: "KYC rejected",
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error rejecting KYC",
      error: error.message,
    });
  }
};

// Admin: Get All KYC Records
exports.getAllKYCRecords = async (req, res) => {
  try {
    const { status, isVerified, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (isVerified !== undefined) filter.isVerified = isVerified === "true";

    const kycs = await KYC.find(filter)
      .populate("shopOwnerId", "ownerName email shopName phone")
      .populate("verifiedBy", "name email")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await KYC.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: kycs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching KYC records",
      error: error.message,
    });
  }
};

// Admin: Get Single KYC Record
exports.getSingleKYCRecord = async (req, res) => {
  try {
    const { shopOwnerId } = req.params;

    const kyc = await KYC.findOne({ shopOwnerId })
      .populate("shopOwnerId", "ownerName email shopName phone address")
      .populate("verifiedBy", "name email");

    if (!kyc) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: kyc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching KYC record",
      error: error.message,
    });
  }
};
