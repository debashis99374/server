const express=require("express")
const courseRouter=express.Router()
const {createCourse,addVideoToCourse}=require('../controllers/course.controller')
const {authVerify} = require("../middlewheres/authVarify.middlewhere")

courseRouter.post('/create-course',authVerify,createCourse)
courseRouter.post('/addVideo/:courseId',authVerify,addVideoToCourse)
module.exports=courseRouter