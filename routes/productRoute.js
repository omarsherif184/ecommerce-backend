const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { createProduct,getAllProducts, getProductById, updateProduct ,deleteProduct } = require ("../controllers/productController");
router.post("/products",authMiddleware,adminMiddleware,createProduct);
router.get("/products",getAllProducts);
router.get("/products/:id",getProductById);
router.put("/products/:id",authMiddleware,adminMiddleware,updateProduct);
router.delete("/products/:id",authMiddleware,adminMiddleware,deleteProduct)

module.exports = router;