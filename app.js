require("dotenv").config();
const express = require("express");
const app = express()
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message:{
        message: "Too Many requests,try again later"
    }
});
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const Cart = require("./models/cart");
const cartRoutes = require("./routes/cartRoute");
const orderRoutes = require("./routes/orderRoute");
const productRoutes = require("./routes/productRoute");
const userRoutes = require("./routes/userRoute");
app.use(cors());
app.use(helmet());
app.use("/users",userRoutes);
app.use("/users/login",authLimiter);
app.use("/users/register",authLimiter);
app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use ((err,req,res,next) => {
    console.error(err);
    res.status(500).json({
        "Message":"Internal Server Error"
    })
});
async function connectDB() {
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB")
    }catch(err){
        console.log(err);
        console.log("Failed to Connect to DB")
    }
}

module.exports = {
    app,connectDB
}