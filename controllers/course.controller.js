

const CourseForLearning=require('../models/course.model')
const UserForElearning=require('../models/user.model')
//creating a course
const createCourse=async(req,res)=>{
    const userId=req.user._id
    const {title,videos,description}=req.body
    try{
        
        const foundUser=await UserForElearning.findById(userId)
        
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }
        let courseDetails={}
        if(foundUser.isAdmin){
           courseDetails={
            title,videos,description,creater:userId
          }
        }else{
            res.status(400).json({message:"Unauthorised access:Only admins can create course"})
        }
        const createdCourse=await CourseForLearning.create(courseDetails)
        res.status(200).json({message:"course created",data:createdCourse})

    }catch(err){
        res.status(500).json({message:"server side error in creating cource",err})
    }
}
//add videos to a course

const addVideoToCourse=async(req,res)=>{
    const userId=req.user._id
    const {name,duration,url}=req.body
    const courseId=req.params.courseId
   try{
    if(!courseId){
        res.status(400).json({message:"Provide valid course id "})
    }
    const selectedCourse=await CourseForLearning.findById(courseId)
    const foundUser=await UserForElearning.findById(userId)
    if(!foundUser){
        res.status(400).json({message:"User not found"}) 
    }
   
   
     if(!foundUser.isAdmin){
        res.status(400).json({message:`Unauthorised access:Only admins can  add videos to ${selectedCourse.title} course`}) 
     }
     const videoDetails = { name, duration, url };
     selectedCourse.videos.push(videoDetails)
     const savedCourse=await selectedCourse.save()

    res.status(200).json({message:`video added to ${selectedCourse.title}`,data:savedCourse})


   }catch(err){
    res.status(500).json({message:"server side error in adding a video to a cource",err})
   }
}

module.exports={
    createCourse,
    addVideoToCourse
}