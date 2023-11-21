
const jwt = require("jsonwebtoken");
const UserForElearning=require('../models/user.model')

const authVerify =async (req, res, next) => {
  const token = req.headers.authorization;
  
  
  
  try {
    if(!token){
     return  res.status(401).json({message:"token missing"})
    }
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    const fUser=await UserForElearning.findById(decoded.userId)
    if(!fUser){
      res.status(400).json({message:"user not found"})
    }
    req.user=fUser;
    

    return next();
  } catch (error) {
   //console.log(error)
   //console.log("token",token)
   //console.log("jwt ket:",process.env.JWT_KEY)
    return res.status(500).json({ errorMessage: "Unauthorised access, please add the token",error })
  }
}

module.exports = { authVerify };