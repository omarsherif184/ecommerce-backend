const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {createOrder,showMyOrders,showOrder, cancelOrder, getAllOrders,updateOrderStatus} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
router.post("/orders",authMiddleware,createOrder);
router.get("/orders",authMiddleware,showMyOrders);
router.get("/orders/admin",authMiddleware,adminMiddleware,getAllOrders);
router.get("/orders/:id",authMiddleware,showOrder);
router.delete("/orders/:id",authMiddleware,cancelOrder);
router.patch("/orders/:id/status",authMiddleware,adminMiddleware,updateOrderStatus)
module.exports = router;
