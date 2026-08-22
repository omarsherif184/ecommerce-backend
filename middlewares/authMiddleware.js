const jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message:"Access Denied. No Token Provided"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"invalid Token"
        });
    }
};

module.exports = authMiddleware;