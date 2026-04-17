
const express = require("express");
const router = express.Router();
const upload = require("../middleweres/upload");

const shopOwnerController = require("../controllars/shopOwnerController");


router.post("/register", upload.array("shopImage" , 5), shopOwnerController.shopOwnerRegister);

router.post("/login", shopOwnerController.shopOwnerLogin);
router.get("/dashboard/:id", shopOwnerController.shopOwnerDashboard);
router.get("/services/:id", shopOwnerController.getShopOwnerServices);
router.post("/services/:id", shopOwnerController.createShopOwnerService);
router.put("/services/:id/:serviceIndex", shopOwnerController.updateShopOwnerService);
router.delete("/services/:id/:serviceIndex", shopOwnerController.deleteShopOwnerService);
router.post("/addworkers", upload.fields([{ name: "idProof", maxCount: 1 }, { name: "photo", maxCount: 1 }]), shopOwnerController.addWorker);

module.exports = router;