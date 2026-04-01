
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


module.exports = {
    fetchShops
}