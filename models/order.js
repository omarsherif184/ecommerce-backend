const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }
],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","shipped","delivered","cancelled"],
        default:"pending"
    }
});

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;