const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User = require("../models/User");

exports.register=async(req,res)=>{
    const{name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:"User Already Exists"
            });
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const newUser=new User({
            name,
            email,
            password:hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            message:"User registered Successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        });
    }
};

//Login Cotroller
exports.login=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials"
            });
        }

        const isMatch= await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({id:user._id}, process.env.jwt_SECRET, {expiresIn:"1h"});
        res.status(200).json({
            message:"Login successfull",token
        });
    }
    catch(err){
        res.status(500).json({
            message:"Server Error"
        });
    }
};