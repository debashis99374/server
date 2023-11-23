const express=require("express")
const blogRouter=express.Router()
const {addBlog,allBlogs,updateBlog,deleteBlog}=require("../controllers/blog.controller")
const { authVerify } = require("../middlewheres/authVarify.middlewhere")


blogRouter.post('/blogs/add-blog',authVerify,addBlog)
//this route creates a new blog also only admins can create a blog ,general users cant create a blog
blogRouter.get('/blogs/all-blogs',allBlogs)
//this route gets acces to all blogs 
blogRouter.post('/blogs/update-blog/:blogId',authVerify,updateBlog)
//this route updates/edits a specific blog content by taking blogid as params and userId from req.user._id ,also non admins cant update a blog
blogRouter.delete('blogs//delete-blog/:blogId',authVerify,deleteBlog)
//this route deletes a specific blog content by taking blogid as params and userId from req.user._id ,also non admins cant delete a blog

module.exports=blogRouter 