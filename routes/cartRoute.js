const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {addToCart,showCart,deleteFromCart,updateCart} = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/cart",authMiddleware,addToCart);
router.get("/cart",authMiddleware,showCart);
router.delete("/cart/:productId",authMiddleware,deleteFromCart);
router.patch("/cart/:productId",authMiddleware,updateCart);

module.exports = router;
