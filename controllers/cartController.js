const Cart = require("../models/cart");
const Product = require("../models/product")
async function addToCart(req,res,next){
    try{
        if(!req.body.product){
            return res.status(400).send("Product is required")
        }
        const product = await Product.findById(req.body.product);
        if(!product){
            return res.status(404).json({
                "message":"Product Not Found"
            })
        }
        
        const cart = await Cart.findOne({
            user: req.user.id,
            product:req.body.product
        })
        if(cart){
            cart.quantity++;
            await cart.save();
            return res.status(200).json({
                "message":"Added to Cart"
            })
        }
        const newCart = new Cart({
            user:req.user.id,
            product:req.body.product,
            quantity:1
        })
        await newCart.save()
        res.status(201).json({
                "message":"Added to Cart"
            })
    }catch(err){
        next(err);
    }
}

async function showCart(req,res,next){
    try{
            const cart = await Cart.find({
                user:req.user.id
            }).populate("product");
            if(cart.length === 0){
                return res.status(200).json({
                    "message":"Cart is empty"
                })
            }
        res.status(200).json(cart);
    }catch(err){
        next(err);
    }
}
async function deleteFromCart(req,res,next){
    try{
        const cart = await Cart.findOne({
                user:req.user.id,
                product:req.params.productId
            })
            if (!cart){
                return res.status(404).json({
                    "message":"Product Not Found in Cart"
                })
            }
            await cart.deleteOne();
            return res.status(200).json({
                "message":"Removed Product From Cart"
            })
    }catch(err){
        next(err);
    }
}
async function updateCart(req,res,next){
    try{
    if (!req.body.quantity){
        return res.status(400).json({
            "message":"Quantity is Required"
        });
    }
    const cart = await Cart.findOne({
        user: req.user.id,
        product: req.params.productId
    })

    if (!cart){
        return res.status(404).json({
            "message":"Product is not Found in cart"
        });
    }
    cart.quantity = req.body.quantity;
    await cart.save()
    res.status(200).json({
        "message":"Updated Quantity"
    })
}catch(err){
    next(err);
} 
}


module.exports = {
    addToCart,showCart,deleteFromCart,updateCart
}