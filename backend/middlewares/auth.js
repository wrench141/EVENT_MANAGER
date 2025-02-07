const User = require("../models/user.js");
const jwt = require("jsonwebtoken")
require("dotenv").config();


module.exports = async function authMiddleware(req, res, next){
    try {  
        const {token} = req.headers;
        const email = jwt.decode(token, process.env.JWT_SALT);
        if(email){
            const user = await User.findOne({email});
            if(user){
                req.body.uid = user._id;
                next()
            }else{
                res.status(403).json({"msg":"session expired, please login."})
            }
        }else{
            res.status(403).json({"msg":"session expired, please login"})
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({"msg": "session expired"})
    }
}