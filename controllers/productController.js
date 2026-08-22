const Product = require("../models/product");
const mongoose = require("mongoose")
async function createProduct(req,res,next){
    try{
        if (!req.body.name){
            return res.status(400).send("name is Required");
        }
        if (!req.body.description){
            return res.status(400).send("description is Required");
        }
        if (!req.body.price){
            return res.status(400).send("price is Required");
        }
        if (!req.body.image){
            return res.status(400).send("image is Required");
        }
        if (!req.body.stock){
            return res.status(400).send("stock is Required");
        }
        if (!req.body.category){
            return res.status(400).send("category is Required");

        }
        const product = new Product({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image,
            stock:req.body.stock,
            category:req.body.category
        })
        await product.save();
        res.status(201).json({"message":"Created Product Successfully"});
    }catch(err){
        next(err);
    }

}

async function getAllProducts(req,res,next){
    try{const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const filter = {};
        if (search) {filter.name = {$regex: search, $options: "i"}};
        if (category){filter.category = category}
        if(minPrice ||maxPrice){filter.price = {};
        if(minPrice) {filter.price.$gte = Number(minPrice);}
        if(maxPrice) {filter.price.$lte = Number(maxPrice);}
}
        const skip = (page -1) * limit;
        const products = await Product.find(filter).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = (totalProducts / limit);
        res.status(200).json({page,limit,totalProducts,totalPages,products});
    }catch(err){
        next(err);
    }
}

async function getProductById(req,res,next){
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({
                "message":"Invalid Product id"
            })
        }
        const product = await Product.findById(req.params.id);
        if (!product){
            return res.status(404).json({
                "message":"Product Not Found"
            })
        }
        return res.status(200).json(product);
    }catch(err){
        next(err);
    }
}

async function updateProduct(req,res,next){
    try{
        const product = await  Product.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});
        if (!product){
            return res.status(404).json({
                "message":"Product Not Found"
            })
        }
        return res.status(200).json({
            "message":"Updated Product Successfully",product
        })
    }catch(err){
        next(err);
    }
}

async function deleteProduct(req,res,next){
    try{
        const product = await  Product.findById(req.params.id);
        if (!product){
            return res.status(404).json({
                "message":"Product Not Found"
            })
        }
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            "message":"Successfully Deleted Product"
        })
    }catch(err){
        next(err);
    }
}
module.exports = {
    createProduct,getAllProducts,getProductById,updateProduct,deleteProduct
}