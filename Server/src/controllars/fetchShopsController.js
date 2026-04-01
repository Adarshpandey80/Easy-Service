
const shopownerModel = require("../models/shopOwner.model");




const fetchShops = async (req, res) => {
    try {
        // search all shops from database and return it to client
        const shops = await shopownerModel.find();
        res.status(200).json(shops);
    } catch (error) {
        console.error("Error fetching shops:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const fetchShopById = async (req, res) => {
    try {
        const { id } = req.params;
        const shop = await shopownerModel.findById(id);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching shop by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    fetchShops,
    fetchShopById
}