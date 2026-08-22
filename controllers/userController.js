const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function register(req,res,next){
try{
 if (!req.body.username){
    res.status(400).send("username is required");
 }
 if (!req.body.password){
    res.status(400).send("password is required");
 }
 if (!req.body.email){
    res.status(400).send("email is required");
 }
 const existingUser = await User.findOne({
    email:req.body.email
 })
 if(existingUser){
    return res.status(400).send("Email already exists")
 }
 const hashedPassword = await bcrypt.hash(req.body.password,10);
 const user = new User({
    username:req.body.username,
    password:hashedPassword,
    email:req.body.email
 })
 await user.save();
 res.status(201).send("Created Successfully");
 console.log("Successfully registered");
}catch(err){
    next(err);}
}

async function login(req,res,next){
    try{

    if (!req.body.email){
        res.status(400).send("Email is required")
    }
    if (!req.body.password){
        res.status(400).send("password is required")
    }
    const user = await User.findOne({
        email:req.body.email
    })
    if (!user){
        return res.status(404).send("Email Not Found");
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if (!isMatch){
        return res.status(401).send("invalid email or password");
    }
    const token = jwt.sign({
        id:user._id,
        email: user.email,
        role: user.role
    },process.env.JWT_SECRET);
    res.json({
        "message":"Logged in Successfully",
        "token":token
    })
 }catch(err){
    next(err);
 } 
}
module.exports = {
    register,login
}
