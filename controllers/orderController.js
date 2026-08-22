const Order = require("../models/order");
const Cart = require("../models/cart");
const mongoose = require("mongoose");

async function createOrder(req,res,next) {
    try{
        const cart = await Cart.find({
            user:req.user.id
        }).populate("product")

        if (cart.length === 0){
            return res.status(404).json({
                "message":"Cart is Empty"
            })
        }
        
        for (const item of cart){
            if(!item.product){
                return res.status(404).json({
                    "message":"Product Not Found"
                })
            }
            if(item.product.stock < item.quantity){
                return res.status(400).json({
                    "message":"Not Enough Stock"
                })
            }
        }
        const items =[];
        let totalPrice = 0;
        for (const item of cart){
            totalPrice += item.product.price * item.quantity
            items.push({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            });
        }
        const order = new Order({
            user:req.user.id,
            items:items,
            totalPrice:totalPrice,
            status:"pending"
        })

        await order.save();
        for (const item of cart){
            item.product.stock -= item.quantity;
            await item.product.save();
        }
        await Cart.deleteMany({
            user:req.user.id
        })
        return res.status(201).json({
            "message": "Order Successfully Created"
        })

    }catch(err){
        next(err);
    }
}
async function showMyOrders(req,res,next){
    try{
        const orders = await Order.find({
            user:req.user.id
        })
        if (orders.length === 0){
            return res.status(404).json({
                "message":"No Orders Found"
            })
        }
        return res.status(200).json(orders)
    }catch(err){
        next(err);
    }
}

async function showOrder(req,res,next){
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                "message":"Invalid Order ID"
            })
        }
        const order = await Order.findOne({
            user:req.user.id,
            _id:req.params.id
        })

        if(!order){
            return res.status(404).json({
                "message":"Order Not Found"
            });
        }

        return res.status(200).json(order)

    }catch(err){
        next(err);
    }
}

async function cancelOrder(req,res,next){
    try{
        const order = await Order.findOne({
            user:req.user.id,
            _id:req.params.id
        }).populate("items.product");

        if(!order){
            return res.status(404).json({
                "message":"Order Not Found"
            })
        }
        if (order.status ==="delivered"){
            return res.status(400).json({
                "message":"Cannot Cancel Delivered Order"
            });
        }
        for (const item of order.items){
            item.product.stock += item.quantity;
            await item.product.save()
        }
        order.status = "cancelled";
        await order.save();
        return res.status(200).json({
            "message":"Order Cancelled Successfully",order
        })

    }catch(err){
        next(err);
    }
}
async function getAllOrders(req,res,next){
    try{
        const orders = await Order.find();
        if (orders.length === 0){
            return res.status(404).json({
                "message":"No Orders Found"
            })
        }
        return res.status(200).json(orders)

    }catch(err){
        next(err);
    }
}
async function updateOrderStatus(req,res,next){
    try{
        const order = await Order.findById(
            req.params.id
        )
        if (!order){
            return res.status(404).json({
                "message":"Order Not Found"
            })
        }
        if (!req.body.status){
            return res.status(400).json({
                "message":"Status is Required"
            })
        }
        order.status = req.body.status;
        await order.save();
        return res.status(200).json({
          "message":"Updated Status Successfully"
        })
    }catch(err){
        next(err);
     }
}
module.exports = {
    createOrder,showMyOrders,showOrder,cancelOrder,getAllOrders,updateOrderStatus
}

//Update Order , DeleteOrder