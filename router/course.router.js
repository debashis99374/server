const express=require("express")
const courseRouter=express.Router()
const {createCourse,getAllCourses,updateCourse,deleteCourse,addVideoToCourse,updateVideo,deleteVideo}=require('../controllers/course.controller')
const {authVerify} = require("../middlewheres/authVarify.middlewhere")
//course routes


courseRouter.post('/course/create-course',authVerify,createCourse)
//this route creates a course in db,only admins can create a course
courseRouter.get('/course/all-courses',getAllCourses)
//this route fecthes all courses from db
courseRouter.post('/course/update-course/:courseId',authVerify,updateCourse)
//this route can update course details of a specific course,admins can perform this task
courseRouter.delete('/course/delete-course/:courseId',authVerify,deleteCourse)
//this route deletes a specific course,admins have this power to delete a specific course

//video array under a specific course routes


courseRouter.post('/course/addVideo/:courseId',authVerify,addVideoToCourse)
//this route adds a video object to the videos array inside a specific course,ofcourse admins have acces of this route
courseRouter.post('/course/updateVideo/:courseId/:videoId',authVerify,updateVideo)
//this route update/edit a specific video object  inside videos array which is  inside a specific course,ofcourse admins have acces of this route
courseRouter.delete('/course/updateVideo/:courseId/:videoId',authVerify,deleteVideo)
////this route deletes a specific video object inside videos array which is  inside a specific course,ofcourse admins have acces of this route
module.exports=courseRouter 