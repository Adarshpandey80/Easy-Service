const express = require("express");
const router = express.Router();
const kycController = require("../controllars/kycController");

// Shopkeeper Routes (require authentication)
router.get("/status", kycController.getKYCStatus);
router.post("/submit", kycController.submitKYC);
router.post("/upload", kycController.uploadDocument);
router.post("/remove-document", kycController.removeDocument);

// Admin Routes (require admin authentication)
router.get("/admin/all", kycController.getAllKYCRecords);
router.get("/admin/:shopOwnerId", kycController.getSingleKYCRecord);
router.post("/admin/approve/:shopOwnerId", kycController.approveKYC);
router.post("/admin/reject/:shopOwnerId", kycController.rejectKYC);

module.exports = router;
