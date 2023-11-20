const UserForElearning = require("../models/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const registration=async(req,res)=>{
    try{
        
        const {userName,email,phoneNumber,password}=req.body;
       
        const foundUser=await UserForElearning.findOne({email})
        if(foundUser){
            return res.status(400).json({ message: "sorry this user already exists, please choose a unique email" });
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const savedUser=await UserForElearning.create({userName,email,phoneNumber,password:hashedPassword})
        const token= jwt.sign({userId:savedUser._id},process.env.JWT_KEY,{expiresIn:"100d"})
       return res.status(200).json({message:"user created",token,data:savedUser})


    }catch(err){
        console.log(err)
        res.status(500).json({message:"server side error",err})
    }
}
const signIn=async(req,res)=>{
    try{
      const {email,password}=req.body
      const foundUser=await UserForElearning.findOne({email})
      if(foundUser){
        const validPassword=await bcrypt.compare(password,foundUser.password)
        if(validPassword){
            const token=jwt.sign({userId:foundUser._id},process.env.JWT_KEY,{expiresIn:"100d"})
           return res.status(200).json({message:`log in succesful for ${foundUser.userName}`,token,data:foundUser})
        }else{
           return res.status(400).json({message:"password incorrect"})
        }
        
      }else{
       return res.status(401).json({message:"user not found"})
      }

    }catch(err){
        res.status(500).json({message:"server side error",err})
    }
}

module.exports={registration,signIn}