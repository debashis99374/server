const UserForElearning = require("../models/user.model");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
//password is ${userName}123 for just own remembring
//registration
const registration=async(req,res)=>{
    try{
        
        const {userName,email,phoneNumber,password,firstName,lastName}=req.body;
       
        const foundUser=await UserForElearning.findOne({email})
        if(foundUser){
            return res.status(400).json({ message: "sorry this user already exists, please choose a unique email" });
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const savedUser=await UserForElearning.create({userName,email,phoneNumber,password:hashedPassword,firstName,lastName})
        const token= jwt.sign({userId:savedUser._id},process.env.JWT_KEY,{expiresIn:"100d"})
       return res.status(200).json({message:"user created",token,data:savedUser})


    }catch(err){
        console.log(err)
        res.status(500).json({message:"server side error",err})
    }
}
//signin-----
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
//update user details

const updateUserDetails=async (req,res)=>{
    const userId=req.user._id
    const dataToBeUpdated=req.body
    try{
        const foundUser=await UserForElearning.findById(userId)
        if(!foundUser){
            res.status(400).json({message:"user not found"})
        }
        const updatedUser=await UserForElearning.findByIdAndUpdate(userId,dataToBeUpdated,{new:true})
        res.status(200).json({message:`User profile updated`,data:updatedUser})

    }catch(err){
        res.status(500).json({message:"server side error",err}) 
    }
}
//delete a profile
const deleteProfile=async(req,res)=>{
    const userId=req.user._id
    try{
        const foundUser=await UserForElearning.findById(userId)
        if(!foundUser.isAdmin || foundUser){
            res.status(400).json({message:"Unauthorised:only logged in user or a admine can delete this account"})
        }
        const deletedUser=await UserForElearning.findByIdAndDelete(userId)
        res.status(200).json({message:"account deleted",data:deletedUser})

    }catch(err){
        res.status(500).json({message:"server side error",err}) 
    }
}
//this function can make anyone admin or remove him from admin post . of course only admins can do this tasks
const toggleAdmin=async(req,res)=>{
    const userId=req.user._id
    const userId2=req.params.userId
    const adminValue=req.body
    try{
        if(userId===userId2){
            res.status(400).json({message:"Unauthorised:you cannot remove yourself from admin"}) 
        }
        const foundUser=await UserForElearning.findById(userId)
        const foundUser2=await UserForElearning.findById(userId2)
        
        if(!foundUser.isAdmin){
            res.status(401).json({message:"Unauthorised:Only admins can make anyone admin or remove him from admin"}) 
        }
        if(!foundUser2){
            res.status(402).json({message:"user not found"}) 
        }

        const updatedUser=await UserForElearning.findByIdAndUpdate(userId2,adminValue,{new:true})
        res.status(200).json({message:updatedUser.isAdmin?`${updatedUser.userName} is a admin now`:`${updatedUser.userName} is removed from admin post`,data:updatedUser})


    }catch(err){
        res.status(500).json({message:"server side error",err}) 
    }
}


module.exports={registration,signIn,updateUserDetails,deleteProfile,toggleAdmin}