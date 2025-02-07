const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
require("dotenv").config();

const signup = async(req, res) => {
    try {

        const {email, password} = req.body;
        const existing_user = await User.findOne({email});
        if(!existing_user){
            const newUser = new User({
                email, password
            });
            await newUser.save();
            const token = await jwt.sign(email, process.env.JWT_SALT);
            res.status(200).json({"msg": "user saved", token})
        }else{
            res.status(400).json({"msg": "user exists, please login"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"})
    }
};


const signin = async(req, res) => {
    try {
        const {email, password} = req.body;
        const existing_user = await User.findOne({email});
        if(existing_user){
            const passCheck = await bcrypt.compare(password, existing_user.password);
            if(passCheck){
                const token = await jwt.sign(email, process.env.JWT_SALT);
                res.status(200).json({"msg": "user logged in", token});
            }else{
                res.status(403).json({"msg": "Invalid Credintials"});
            }
        }else{
            res.status(404).json({"msg": "user not found"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({"msg": "server error"})
    }
};


module.exports = {signin, signup}