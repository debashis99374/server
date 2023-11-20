const express=require("express")
const authRouter=express.Router()
const {registration,signIn}=require('../controllers/auth-controller')

authRouter.post('/auth/register',registration)
authRouter.post('/auth/signin',signIn)

module.exports=authRouter