const Blogs=require('../models/blog.model')
const UserForElearning=require('../models/user.model')

//add a blog
const addBlog=async(req,res)=>{
    const userIdd=req.user._id
    const {title,description}=req.body
    try{
        const foundUser=await UserForElearning.findById(userIdd)
        if(!foundUser.isAdmin){
            res.status(400).json({message:"Unauthorised:Only admins can add a blog"})
        }
        const newBlog=await Blogs.create({title,description,userId:userIdd})
        res.status(200).json({message:`new blog added by ${foundUser.userName}`,data:newBlog})

    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
//fetch all blogs
const allBlogs=async(req,res)=>{
    try{
        const allBlogs=await Blogs.find({})
        if(!allBlogs){
            res.status(400).json({message:"cant acces blogs"})
        }
        res.status(200).json({message:"All blogs",data:allBlogs})

    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
//update a specific blog
const updateBlog=async(req,res)=>{
    const userId=req.user._id
    const blogId=req.params.blogId
    const dataToBeUpdated=req.body
    try{
if(!blogId){
    res.status(400).json({message:"use approprate reviewid"})
}
const foundUser=await UserForElearning.findById(userId)
if(!foundUser.isAdmin){
    res.status(401).json({message:"Unauthorised:Only admins can edit a blog"})
}
const updatedBlog=await Blogs.findByIdAndUpdate(blogId,dataToBeUpdated,{new:true})
res.status(200).json({message:`blog updated for ${foundUser.userName} `,data:updatedBlog})


    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}
//delete a blog
const deleteBlog=async(req,res)=>{
    const userId=req.user._id
    const blogId=req.params.blogId
    try{
        if(!blogId){
            res.status(400).json({message:"add valid blog id"})
        }
        const foundUser=await UserForElearning.findById(userId)
        if(!foundUser.isAdmin){
            res.status(401).json({message:"Unauthorised acces: only admin  can delete this blog"})
        }
        const deletedBlog=await Blogs.findByIdAndDelete(blogId)
        res.status(200).json({message:`review from ${foundUser.userName} deleted`,data:deletedBlog})


    }catch(err){
        res.status(500).json({message:"server side error check postman"})
    }
}


module.exports={
    addBlog,
    allBlogs,
    updateBlog,
    deleteBlog
}